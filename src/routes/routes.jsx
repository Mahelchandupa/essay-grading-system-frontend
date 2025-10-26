import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EssayUpload from "../pages/EssayUpload";
import EssayFeedback from "../pages/EssayFeedback";
import StudentDashboard from "../pages/StudentDashboard";
import EssayDetail from "../pages/EssayDetail";
import { Root } from "../layout/Root";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute><StudentDashboard /></ProtectedRoute>
      },
      {
        path: '/upload',
        element: <ProtectedRoute><EssayUpload /></ProtectedRoute>
      },
      {
        path: '/essay/:id',
        element: <ProtectedRoute><EssayDetail /></ProtectedRoute>
      },
      {
        path: '/feedback/:id',
        element: <ProtectedRoute><EssayFeedback /></ProtectedRoute>
      }
    ]
  },
  {
    path: '/login',
    element: <PublicRoute><Login /></PublicRoute>
  },
  {
    path: '/register',
    element: <PublicRoute><Register /></PublicRoute>
  }
]);

export default router;