import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PolicyComponent } from './policy/policy.component';

export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },

    { path: 'main', component: MainComponent },

    { path: 'imprint', component: ImprintComponent },
    { path: 'policy', component: PolicyComponent },

    { path: '**', redirectTo: '/error' }
];
