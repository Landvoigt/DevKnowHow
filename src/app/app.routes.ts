import { Routes } from '@angular/router';
import { MainComponent } from './base/main/main.component';
import { CategoryComponent } from './base/category/category.component';
import { CreateComponent } from './base/create/create.component';
import { ImprintComponent } from './base/imprint/imprint.component';
import { PolicyComponent } from './base/policy/policy.component';

export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },

    { path: 'main', component: MainComponent },
    { path: 'category/:id', component: CategoryComponent },
    { path: 'create', component: CreateComponent },

    { path: 'imprint', component: ImprintComponent },
    { path: 'policy', component: PolicyComponent },

    { path: '**', redirectTo: '/error' }
];
