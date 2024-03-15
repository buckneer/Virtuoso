import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { CookieService } from "ngx-cookie-service";



const TOKEN_KEY = 'auth-token';
const REFRESH_KEY = 'auth-refresh';
const USER_KEY = 'auth-user';


@Injectable({
    providedIn: 'root'
})
@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor(private cookieService: CookieService) { }

    signOut(): void {
        this.cookieService.delete(TOKEN_KEY);
        this.cookieService.delete(REFRESH_KEY);
        this.cookieService.delete(USER_KEY);
    }

    public setToken(token: string): void {
        // Set the cookie to last for a year (arbitrary duration)
        this.cookieService.set(TOKEN_KEY, token, 365, '/');
    }

    public getToken(): string | null {
        return this.cookieService.get(TOKEN_KEY);
    }

    public setRefresh(refresh: string): void {
        // Set the cookie to last for a year (arbitrary duration)
        this.cookieService.set(REFRESH_KEY, refresh, 365, '/');
    }

    public getRefresh(): string | null {
        return this.cookieService.get(REFRESH_KEY);
    }

    public setUser(user: User) : void {
        // Set the cookie to last for a year (arbitrary duration)
        this.cookieService.set(USER_KEY, JSON.stringify(user), 365, '/');
    }

    public getUser(): User | null {
        const user = this.cookieService.get(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

    public loggedIn(): boolean {
        return !!this.cookieService.get(USER_KEY);
    }
}