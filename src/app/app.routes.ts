import { Routes } from '@angular/router';
import { ImprintComponent } from './imprint/imprint.component';
import { PolicyComponent } from './policy/policy.component';
import { CreateComponent } from './main/create/create.component';
import { CategoryComponent } from './main/category/category.component';

export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },

    { path: 'category/:id', component: CategoryComponent },

    { path: 'create', component: CreateComponent },
    { path: 'create/admin', component: CreateComponent },

    { path: 'imprint', component: ImprintComponent },
    { path: 'policy', component: PolicyComponent },

    { path: '**', redirectTo: '/error' }
];
