import { useAuth } from '../app/authContext';
import React, {useEffect,Fragment} from 'react'
// import useLoading from '../app/authContext';
import Backdrop from '../components/backdrop/Backdrop';
import { Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';

const publicRoutes = ["/"];

const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    console.log("Running useEEfect")
    if (!loading)
    if (!isAuthenticated) router.push('/')
    else 
      if (publicRoutes.includes(router.pathname))
        router.push('/dashboard')
  }, [isAuthenticated,loading])
  if (loading) {
    return (
      <Backdrop className='justify-content-center align-items-center'>
        <Spinner className='text-current' animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Backdrop>
    );
  }
  
  return (isAuthenticated && !publicRoutes.includes(router.pathname)) || 
  (!isAuthenticated && publicRoutes.includes(router.pathname))
   ? children: <Fragment />;
};

export default ProtectRoute;
