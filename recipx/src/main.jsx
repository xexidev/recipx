import './main.css'
import ReactDOM from 'react-dom/client'
import Root from './pages/Root.jsx'
import ErrorPage from './ErrorPage.jsx'
import Home from './pages/Home/Home.jsx'
// Private Route
import PrivateRoutes from './pages/PrivateRoutes/PrivateRoutes.jsx'
// Auth
import Register from './pages/Auth/Register/Register.jsx'
import Login from './pages/Auth/Login/Login.jsx'
import Recover from './pages/Auth/Recover/Recover.jsx'
import Reset from './pages/Auth/Reset/Reset.jsx'
// User
import UserAccount from './pages/Auth/User/User.jsx'
// Elements
import Pantry from './pages/Elements/Products/Pantry/Pantry.jsx'
import ScanContainer from './pages/Elements/Products/ScanContainer/ScanContainer.jsx'
import Scan from './pages/Elements/Products/ScanContainer/Scan/Scan.jsx'
import ScanResult from './pages/Elements/Products/ScanContainer/ScanResult/ScanResult.jsx'
import Add from './pages/Elements/Products/Add/Add.jsx'
import AddManually from './pages/Elements/Products/AddManually/AddManually.jsx'
// Recipe
import GetRecipe from './pages/GetRecipe/GetRecipe.jsx'
// Image Credits
import ImageCredits from './pages/ImageCredits/ImageCredits.jsx'
//
import paths from './paths.js'
/*
import UserAccount from '../components/pages/User Account/UserAccount'
*/
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: paths.home,
        element: <Home />
      },
      // Auth
      {
        path: paths.userRegister,
        element: <Register />
      },
      {
        path: paths.userLogin,
        element: <Login />
      },
      {
        path: paths.userRecoverPassword,
        element: <Recover />
      },
      {
        path: paths.userResetPassword,
        element: <Reset />
      },
      {
        path: paths.imageCredits,
        element: <ImageCredits />
      },
      // Private
      {
        element: <PrivateRoutes redirectRoute={paths.home} />,
        children: [
          // User
          {
            path: paths.user,
            element: <UserAccount />
          },
          // Elements
          {
            path: paths.pantry,
            element: <Pantry />
          },
          {
            path: paths.add,
            element: <Add />
          },
          {
            element: <ScanContainer />,
            children: [
              {
                path: paths.scan,
                element: <Scan />
              },
              {
                path: paths.scanResult,
                element: <ScanResult />
              }
            ]
          },
          {
            path: paths.addManually,
            element: <AddManually />
          },
          // Recipe
          {
            path: paths.getRecipe,
            element: <GetRecipe />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
