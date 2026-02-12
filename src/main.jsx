import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import {store} from"./app/store.js"

const router = createBrowserRouter([
	{
		path: '*',
		element: <Provider store={store}>
      <App></App>
    </Provider>
	},
], {
	future: {
		v7_startTransition: true,
		v7_relativeSplatPath: true,
	},
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
