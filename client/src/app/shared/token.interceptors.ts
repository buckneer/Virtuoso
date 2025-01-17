import { Injectable, inject } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { TokenStorageService } from "../services/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


    private isRefreshing = false;
    private refreshTokenSubject = new BehaviorSubject<any>(null);
    private authService = inject(AuthService);
    private tokenService = inject(TokenStorageService);

   
    intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {

        console.log("Interceptor running---------------------------");

        if(this.tokenService.getToken()) {
            request = this.addToken(request, this.tokenService.getToken()!);
        }

        return next.handle(request).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                  return this.handle401Error(request, next);
                } else {
                  return throwError(error);
                }
            })
        )
    }


    private addToken(request: HttpRequest<any>, token: string) {
        return  request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            }
        })
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
       
        if(!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.access_token);
                    // console.log("This should be token -------> ", token.access_token);
                    return next.handle(this.addToken(request, token.access_token))
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter((token) => token != null),
                take(1),
                switchMap((jwt) => {
                    return next.handle(this.addToken(request, jwt));
                })
            )
        }
    }
}

export const tokenInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
};