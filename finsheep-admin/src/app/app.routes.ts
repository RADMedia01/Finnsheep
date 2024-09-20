import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';
import { BlogsComponent } from './blog/blogs/blogs.component';
import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import {AuthGuard} from '../app/authGuard.service'
import { BulkuploadComponent} from './stock/bulkupload/bulkupload.component';
import {PaymentListComponent} from './payment/payment-list/payment-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
      },
      {
        path: 'user',
        loadChildren: () => import('./user/routes').then((m) => m.routes)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/routes').then((m) => m.routes)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/routes').then((m) => m.routes)
      },
      {
        path: 'blogs',
        component:BlogsComponent
      },
      {
        path: 'blog/:id',
        component:BlogDetailsComponent
      },
      {
        path: 'stock/bulkUpload',
        component:BulkuploadComponent
      },
      {
        path: 'payments',
        component:PaymentListComponent
      },
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
