import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'clients',
        loadComponent: () => import('./features/client-table.component').then(m => m.ClientTableComponent)
    },
    {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full'
    }
];
