import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { magicLocal as magic } from './magic';

//api here is an axios instance which has the baseURL set according to the env.
import axiosClient from '../axiosSetup';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromToken() {
      const token = localStorage.getItem('access_token');
      if (token) {
        axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await axiosClient.get('/users/me');
        const magicIsLoggedIn = await magic.user.isLoggedIn();
        if (magicIsLoggedIn) {
          //const metadata = await magic.user.getMetadata();
          setUser({ ...user });
        } else {
          // If no user is logged in, redirect to `/login`
          // router.push('/login');
          router.push('/');
          console.log('retrieve to login');
        }
      }
      setLoading(false);
    }
    loadUserFromToken();
  }, []);

  const logout = async (email, password) => {
    try {
      const result = await axiosClient.get('/auth/logout');
      console.log('result', result);
      if (result.status === 302) {
        localStorage.removeItem('access_token');
        setUser(null);
        delete axiosClient.defaults.headers.Authorization;
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  async function handleLoginWithSocial(provider) {
    await magic.oauth.loginWithRedirect({
      provider,
    });
  }

  const handleLoginWithEmail = async (email) => {
    try {
      setLoading(true);

      // Trigger Magic link to be sent to user
      let didToken = await magic.auth.loginWithMagicLink({ email });
      // Set token
      console.log('hallo', didToken);
      axiosClient.defaults.headers.Authorization = `Bearer ${didToken}`;

      // Validate didToken with server
      const result = await axiosClient.post('/auth/login');

      if (result.status === 200) {
        const { metadata, accessToken } = result.data;
        const { data: user } = await axiosClient.get('users/me');
        localStorage.setItem('access_token', accessToken);
        axiosClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
        console.log({ ...user, metadata });
        setUser({ ...user, metadata });
        setLoading(false);
        router.push('/dashboard');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login: handleLoginWithEmail,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
