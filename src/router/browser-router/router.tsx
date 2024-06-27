import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../../App';
import { HomePage } from './pages/home';
import { AddCreateUser } from '../../components/add-user';
import { UserDetailsPage } from '../../components/user-details';

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
    element: <AddCreateUser />,
  },
  {
    path: '/usersList/:userId',
    element: <UserDetailsPage />,
  },
]);

export { RouterProvider, router };
