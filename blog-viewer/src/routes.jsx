import Home from './components/Home'
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
                children: [
                    { path: 'new-comment', element: <NewComment /> },
                ]
            }
        ]
    }
]

export default routes