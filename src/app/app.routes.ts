import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { Me } from './features/auth/pages/me/me';
import { ItemsCollection } from '@features/items/pages/items-collection/items-collection';
import { IndexComponent } from './pages/index/index';
import { AuthGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'login', component: Login },
    {path: 'register', component: Register },
    {path: 'me', component: Me, canActivate: [AuthGuard] },

    // Item routes
    {path: 'items',
        canActivate: [AuthGuard],
        children: [
            { path: 'collection', component: ItemsCollection }
        ]},

    {path: '**', redirectTo: ''},
];