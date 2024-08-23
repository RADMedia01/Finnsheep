

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('../product/product-list/product-list.component').then(m => m.ProductListComponent),
        data: {
          title: 'User List'
        }
      },
      {
        path: ':id',
        loadComponent: () => import('../product/product-details/product-details.component').then(m => m.ProductDetailsComponent),
        data: {
          title: 'User List'
        }
      },
    ]
  }
];


