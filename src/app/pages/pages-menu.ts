import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'MODULOS',
    group: true,
  },
  {
    title: 'Instituciones',
    icon: 'fa fa-bank',
    children: [
      {
        title: 'Crear',
        link: '/pages/instituciones/crear',
      },
      {
        title: 'Roles',
        link: '/pages/instituciones/smart-table',
      },
      {
        title: 'Dashboard',
        link: '/pages/instituciones/dashboard',
      },
    ],

  },
  {
    title: 'Alimentos',
    icon: 'fa fa-birthday-cake',
    children: [
      {
        title: 'Productos',
        link: '/pages/alimentos/productos',
      },
      {
        title: 'Preparaciones',
        link: '/pages/alimentos/preparaciones',
      },
      {
        title: 'Menus',
        link: '/pages/alimentos/menus',
      },
      {
        title: 'Proveedores',
        link: '/pages/alimentos/proveedores',
      },
      {
        title: 'Componentes',
        link: '/pages/alimentos/componentes',
      },
      {
        title: 'Tipos Alimentos',
        link: '/pages/alimentos/tipos_alimentos',
      },
    ],

  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },

];
