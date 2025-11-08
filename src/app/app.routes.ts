import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { Me } from './features/auth/pages/me/me';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: Login },
    {path: 'register', component: Register },
    {path: 'me', component: Me },
    {path: '**', redirectTo: '/login'}
];