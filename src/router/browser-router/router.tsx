import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../../App';
import { HomePage } from './pages/home';
import { AddCreatUser } from '../../components/add-user';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },

  {
    path: '/usersList',
    element: <HomePage />,
  },

  {
    path: '/AddUser',
    element: <AddCreatUser />,
  },
]);

export { RouterProvider, router };
