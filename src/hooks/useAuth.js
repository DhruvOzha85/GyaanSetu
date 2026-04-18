import { useSelector, useDispatch } from 'react-redux';
import {
  setCredentials,
  logout as logoutAction,
  setLoading,
  setError,
  setOnboardingComplete,
} from '../features/auth/authSlice';
import authService from '../services/authService';
import { getErrorMessage } from '../utils/errorHandler';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const login = async (email, password) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await authService.login(email, password);
      dispatch(setCredentials(response.data));
      toast.success('Login successful!');
      return response.data;
    } catch (err) {
      const message = getErrorMessage(err);
      dispatch(setError(message));
      toast.error(message);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signup = async (userData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await authService.signup(userData);
      dispatch(setCredentials(response.data));
      toast.success('Registration successful!');
      return response.data;
    } catch (err) {
      const message = getErrorMessage(err);
      dispatch(setError(message));
      toast.error(message);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    toast.success('Logged out successfully');
  };

  const updateOnboarding = (status) => {
    dispatch(setOnboardingComplete(status));
  };

  return {
    ...authState,
    login,
    logout,
    signup,
    updateOnboarding,
  };
};

export default useAuth;
