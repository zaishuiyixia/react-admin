import { createBrowserRouter, Navigate } from 'react-router-dom';

import Layout from '../layout';
import NotFound from '../views/NotFound';
import Welcome from '../views/welcome';
import Login from '../views/login';
import Dashboard from '../views/dashboard';
import User from '../views/user';
import Depth from '../views/dept';
import Menu from '../views/menu';
import Role from '../views/role';

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/welcome',
                element: <Welcome />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/userList',
                element: <User />,
            },
            {
                path: '/deptList',
                element: <Depth />,
            },
            {
                path: '/menuList',
                element: <Menu />,
            },
            {
                path: '/roleList',
                element: <Role />,
            }
        ],
    },
    { path: '/', element: <Navigate to="/welcome" /> },
    { path: '/login', element: <Login /> },
    { path: '*', element: <NotFound /> }
]);
export default router;
