import { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore user on refresh with stability check
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('accessToken');

        if (storedUser && token) {
          // Optional: You could verify token validity with an API call here if an endpoint exists
          // For now, we trust the storage but ensure state is set synchronously before loading finishes
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth restoration failed", error);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // ✅ LOGIN
  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });

      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setUser(res.data.user);
      toast.success('Login successful');
      return { success: true };
    } catch (error) {
      console.error("Login Error Details:", error.response || error);
      const message = error.response?.data?.message || `Login failed (${error.response?.status || 'network error'})`;
      toast.error(message);
      return { success: false };
    }
  };

  // ✅ REGISTER
  const register = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData);

      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setUser(res.data.user);
      toast.success('Account created');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return { success: false };
    }
  };

  // ✅ LOGOUT
  // ✅ UPDATE USER LOCALLY
  const updateUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
