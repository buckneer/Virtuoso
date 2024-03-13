import { Injectable, inject } from '@angular/core';
import { env } from "../env";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Token } from "../models/token";
import { BehaviorSubject, Observable, catchError, map, throwError } from "rxjs";
import { User, UserResp } from '../models/user';
import { TokenStorageService } from './token.service';



@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = env.apiUrl;
    private storageService = inject(TokenStorageService);


    private stateItem: BehaviorSubject<any | null> = new BehaviorSubject(null);
    stateItem$: Observable<any | null> = this.stateItem.asObservable();


    private message: BehaviorSubject<any | null> = new BehaviorSubject(null);
    message$: Observable<any | null> = this.message.asObservable();


    private user: BehaviorSubject<any | null> = new BehaviorSubject(null);
    user$: Observable<User | null> = this.user.asObservable();

    constructor(private http: HttpClient) { }

    healthcheck(): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.apiUrl}/healthcheck`, {observe: 'response'});
    }

    // user(): Observable<User> {

    //     let authToken = this.storageService.getToken();

    //     let options = {
    //         headers: new HttpHeaders({'Authorization': `Bearer ${authToken}`})
    //     }

    //     return this.http.get(`${this.apiUrl}profile`, options);

    //     // return this.http.get(`${this.apiUrl}profile`, options).pipe(
    //     //     catchError((error) => {
    //     //         console.error("Api Error", error.message);
    //     //         return throwError("Username");
    //     //     })
    //     // );
    // }

    changeState(name: string) {
        const mess = `hi ${name}`;
        this.message.next(mess);
    }

    login(email: string, password: string): Observable<UserResp> {

        return this.http.post(`${this.apiUrl}login`, {
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

        // return this.http.post(`${this.apiUrl}login`, {
        //     username: email,
        //     password
        // }).pipe(
        //     catchError((error) => {
        //         console.error("API Error: ", error.message);
        //         return throwError('Username or password incorrect');
        //     })
        // )
    }
    
    logout(): Observable<HttpResponse<any>> {
        let authToken = this.storageService.getToken();

        let options = {
            headers: new HttpHeaders({'Authorization': `Bearer ${authToken}`})
        }

        return this.http.delete<any>(`${this.apiUrl}logout`, { ...options, observe: 'response'}).pipe(resp => {
            this.user.next(null);
            return resp;
        });

        // return this.http.get(`${this.apiUrl}profile`, options).pipe(
        //     catchError((error) => {
        //         console.error("Api Error", error.message);
        //         return throwError("Username");
        //     })
        // );
    }
}

