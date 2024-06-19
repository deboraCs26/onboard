import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../../App';
import { HomePage } from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },

  {
    path: '/usersList',
    element: <HomePage />,
  },
]);

export { RouterProvider, router };
