import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import SignUP from './Components/SignUP';
import Login from './Components/Login';
import HomePage from './Components/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Utils/ProtectedRoutes';
import { Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import Books from './Components/Books';
import BookDetails from './Components/BookDetails';
import PreviewBook from './Components/PreviewBook';
import Cart from './Components/Cart';

const App = () => {
  
const router = createBrowserRouter([
 {
    path: '/',
    element: <Layout />, 
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'home',
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
       {
        path: 'view-details',
        element: (
          <ProtectedRoute>
            <BookDetails />
          </ProtectedRoute>
        ),
      },
       {
        path: 'book-preview',
        element: (
          <ProtectedRoute>
            <PreviewBook />
          </ProtectedRoute>
        ),
      },
       {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: 'books',
        element: (
          <ProtectedRoute>
            <Books />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/signup',
    element: <SignUP />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
