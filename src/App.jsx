import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Root from './pages/Root';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
