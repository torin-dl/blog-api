import App from './App'
import Home from './components/Home'
import Login from './components/Login'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/authContext'

function ProtectedRoute() {
    const { token } = useAuth();
    return token ? <Outlet /> : <Navigate to='login' />;
}

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'login', element: <Login /> },
            {
                element: <ProtectedRoute />,
            }
        ]
    }
]

export default routes