import React from 'react';
import { RouteProps } from 'react-router';

const AppRoutes : Array<RouteProps> = [
    {
        path: "/",
        component: React.lazy(() => import('./pages/birthday-selection/BirthdaySelection')),
        exact: true
    },
    {
        path: "/group/:group",
        component: React.lazy(() => import('./pages/group-countdown/GroupCountdown'))
    },
    {
        path: "/test",
        component: React.lazy(() => import('./pages/component-test/ComponentTest'))
    },
    {
        path: "404",
        component: React.lazy(() => import('./pages/no-found/NotFound'))
    },
    {
        path: "*",
        component: React.lazy(() => import('./pages/no-found/NotFound'))
    }
];
export default AppRoutes;