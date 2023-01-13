import React from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/Home/Home';
import GalleryPage from '../pages/Gallery/Gallery';

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />
        },
        {
            path: '/gallery/:id',
            element: <GalleryPage />
        },
        {
            path: '*',
            loader: () => redirect('/')
        }
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
