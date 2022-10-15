import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Single from './pages/Single';
import Write from './pages/Write';

import './style.scss';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // layout only for  these 3 children
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/post/:id',
        element: <Single />,
      },
      {
        path: '/write',
        element: <Write />,
      },
    ],
  },
  // {
  //not these
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  return (
    <div className='app blue-gradient-2'>
      <div
        className='gradient-3'
        style={{
          width: '350px',
          height: '350px',
          top: '250px',
          right: 0,
          borderRadius: '50%',
          filter: 'blur(550px)',
          zIndex: '0',
          position: 'absolute',
        }}
      />
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
