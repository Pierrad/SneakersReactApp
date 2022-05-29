import React from 'react';
import { Navigate } from 'react-router-dom';

import useUser from '../hooks/useUser';

const GuardedRoute = ({ Component }) => {
    const user = useUser();

    console.log(user)

    return user !== null ? <Component /> : <Navigate to="/login" />;
}

export default GuardedRoute;