import { Injectable, inject } from '@angular/core';
import { env } from "../env";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Token } from "../models/token";
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from "rxjs";
import { User, UserRegister, UserResp } from '../models/user';
import { TokenStorageService } from './token.service';
import { ResetPassword } from '../models/reset';



@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = env.apiUrl;

    private urls = {
        register: `${this.apiUrl}/register`,
        login: `${this.apiUrl}/login`,
        logout: `${this.apiUrl}/logout`,
        healthcheck: `${this.apiUrl}/healtcheck`,
        refresh: `${this.apiUrl}/refresh`,
        forgot: `${this.apiUrl}/reset`,
        newPassword: `${this.apiUrl}/reset/password`,
        sendConfirm:  `${this.apiUrl}/verification`,
        confirmEmail:  `${this.apiUrl}/verify`,
        protected: `${this.apiUrl}/protected`

    }

    private storageService = inject(TokenStorageService);



    private user: BehaviorSubject<any | null> = new BehaviorSubject(null);
    user$: Observable<User | null> = this.user.asObservable();

    constructor(private http: HttpClient) { }

    setUser(user: User): void {
        this.user.next(user);
    }

    healthcheck(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.urls.healthcheck, {observe: 'response'});
    }
    protected(): Observable<HttpResponse<any>> {
        let authToken = this.storageService.getToken();

        let options = {
            headers: new HttpHeaders({'Authorization': `Bearer ${authToken}`})
        }

        return this.http.get<any>(this.urls.protected, {...options, observe: 'response'});
    }

    register(user: UserRegister): Observable<HttpResponse<any>> {
        return this.http.post(this.urls.register, user, {observe: 'response'});
        // error.__body.type
        // error.json()
    }

    login(email: string, password: string): Observable<UserResp> {
        return this.http.post(this.urls.login, {
            username: email,
            password
        }).pipe(map((resp: UserResp) => {

            if(resp.user) {
                this.storageService.setUser(resp.user);
            }

            if(resp.access_token) {
                this.storageService.setToken(resp.access_token);
            }

            if(resp.refresh_token) {
                this.storageService.setRefresh(resp.refresh_token);
            }

            this.user.next(resp.user);
            return resp;
        }))
    }

    refreshToken() {
        return this.http.post(this.urls.refresh, {
            refresh_token : this.storageService.getRefresh()
        }).pipe(
            tap((token: any) => { this.storageService.setToken(token.access_token)})
        )
    }
    

    sendForgot(email: string): Observable<HttpResponse<any>> {
        return this.http.post(this.urls.forgot, {email}, {observe: "response"});
    }


    newPassword(data: ResetPassword): Observable<HttpResponse<any>> {
        return this.http.post(this.urls.newPassword, data, {observe: "response"});
    }

    sendConfirm(email: string): Observable<HttpResponse<any>> {
        return this.http.post(this.urls.sendConfirm, {email},  {observe: 'response'});
    }

    confirmEmail(email: string, code: string): Observable<HttpResponse<any>> {
        return this.http.post(this.urls.confirmEmail, {email, code},  {observe: 'response'});
    }


    logout(): Observable<HttpResponse<any>> {
        let authToken = this.storageService.getToken();

        let options = {
            headers: new HttpHeaders({'Authorization': `Bearer ${authToken}`})
        }

        return this.http.delete<any>(this.urls.logout, { ...options, observe: 'response'}).pipe(
            tap(() => {
                this.storageService.signOut();
                this.user.next(null);
                
            }),
            catchError((error) => {
                return throwError(error);
            })  
        );
    }
}

