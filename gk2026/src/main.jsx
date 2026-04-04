import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import App from './App';
import './index.css'

import { Admin, Programs, History, Classrooms, Faculty, NotFound } from './pages/index.js'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/admin', element: <Admin /> },
  { path: '/programs', element: <Programs /> },
  { path: '/history', element: <History /> },
  { path: '/classrooms', element: <Classrooms /> },
  { path: '/faculty', element: <Faculty /> },
  { path: '*', element: <NotFound /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
