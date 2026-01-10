import { HttpInterceptorFn } from '@angular/common/http';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
    const lang = localStorage.getItem('language') ?? 'en';

    const requestWithLang = req.clone({
        setHeaders: {
            'Accept-Language': lang
        }
    });

    return next(requestWithLang);
};
