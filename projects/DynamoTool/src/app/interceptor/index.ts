import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpConfigInterceptor } from "./httpconfig.interceptor";
import { TokenInterceptor } from "./token.interceptor";
export const httpInterceptProviders = [ {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true} ];
