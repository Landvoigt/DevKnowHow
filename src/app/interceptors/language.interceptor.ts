import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { TranslationService } from '@services/translation.service';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
    const translation = inject(TranslationService);
    const lang = translation.currentLanguage;

    const requestWithLang = req.clone({
        setHeaders: {
            'Accept-Language': lang
        }
    });

    return next(requestWithLang);
};