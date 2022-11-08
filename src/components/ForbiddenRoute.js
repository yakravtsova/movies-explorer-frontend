import React from 'react';
import { Navigate } from 'react-router-dom';

function ForbiddenRoute({ loggedIn, children }) {
  if (loggedIn) {
    return <Navigate to="/" replace={true} />
  }

  return children;
}

export default ForbiddenRoute;