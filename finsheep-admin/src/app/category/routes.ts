import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';

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
        loadComponent: () => import('../category/category-list/category-list.component').then(m => m.CategoryListComponent),
        data: {
          title: 'Category List'
        }
      },
      {
        path: ':id',
        loadComponent: () => import('../category/category-detail/category-detail.component').then(m => m.CategoryDetailComponent),
        data: {
          title: 'Category details'
        }
      },
    ]
  }
];


