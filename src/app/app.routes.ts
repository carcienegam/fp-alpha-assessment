import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'clients',
        loadComponent: () => import('./features/client-table/client-table.component').then(m => m.ClientTableComponent)
    },

    {
        path: 'clients/:id',
        loadComponent: () => import('./features/client-details/client-details.component').then(m => m.ClientDetailsComponent)
    },

    {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full'
    }
];
