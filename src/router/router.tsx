import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';

const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));


const routes: RouteObject[] = [
    {
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'board', element: <Dashboard /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];

export default routes;
