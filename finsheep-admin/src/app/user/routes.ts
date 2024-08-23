import { UserlistComponent } from './userlist/userlist.component';
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
        loadComponent: () => import('../user/userlist/userlist.component').then(m => m.UserlistComponent),
        data: {
          title: 'User List'
        }
      },
      {
        path: ':id',
        loadComponent: () => import('../user/user-details/user-details.component').then(m => m.UserDetailsComponent),
        data: {
          title: 'User List'
        }
      },
    ]
  }
];


