import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { UserAuthService } from "../services/user-auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { BASE_URL_API } from "src/app/constants/constants";

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userAuthService: UserAuthService,
        private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.userAuthService.getToken();
        const isApiRequest = req.url.startsWith(BASE_URL_API)

        if(token && isApiRequest) {
            // req = req.clone({
            //     setHeaders: {
            //         Authorization: `Bearer ${token}`
            //     }
            // })

            let requestHeader = new HttpHeaders({'Authorization': `Bearer ${token}`})
            req.clone({headers: requestHeader})
        }

        console.log(req)

        return next.handle(req).pipe(
            catchError(
                (err: HttpErrorResponse) => {
                    // console.log(err.status);
                    // if (err.status === 401) {
                    //     this.router.navigate(['/login'])
                    // } else if (err.status === 403) {
                    //     this.router.navigate(['/forbidden'])
                    // }
                    return throwError("Something is wrong!")
                }
            )
        )

    }
}