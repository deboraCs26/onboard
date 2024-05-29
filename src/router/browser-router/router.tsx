import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../../App';
import { HomePage } from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },

  {
    path: '/listUser',
    element: <HomePage />,
  },
]);

export { RouterProvider, router };
