import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'User',
    url: '/user',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'UserList',
        url: '/user/list',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Add User',
        url: '/user/0',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Blogs',
    url: '/blogs',
    iconComponent: { name: 'cil-speedometer' },
  },

  
  {
    name: 'Category',
    url: '/',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Category list',
        url: '/category/list',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Add Category',
        url: '/category/0',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Product',
    url: '/products',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Product list',
        url: '/product/list',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Add Product',
        url: '/product/0',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Stock',
    url: '/stock',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Stock list',
        url: '/list',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Bulk Upload',
        url: '/bulkUpload',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Orders',
    url: '/orders',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Order list',
        url: '/orders',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Sales',
        url: '/sales',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Payments',
        url: '/orders',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Payment',
    url: '/payments',
    iconComponent: { name: 'cil-speedometer' },
  },
  // {
  //   name: 'Docs',
  //   url: 'https://coreui.io/angular/docs/5.x/',
  //   iconComponent: { name: 'cil-description' },
  //   attributes: { target: '_blank' }
  // }
];
