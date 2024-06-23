import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../../App';
import { HomePage } from './pages/home';
import { AddCreateUser } from '../../components/add-user';

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
    element: <AddCreateUser onSuccess={() => console.log('Usuário adicionado com sucesso!')} />,
  },
]);

export { RouterProvider, router };
