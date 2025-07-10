import React, { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';

const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));


const routes: RouteObject[] = [
    {
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'board', element: <Dashboard /> },
            { path: '*', element: <Navigate to='/board' /> },
        ],
    },
];

export default routes;
