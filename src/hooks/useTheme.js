import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme as toggleThemeAction, setTheme as setThemeAction } from '../features/ui/uiSlice';
import { useEffect } from 'react';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const isDark = theme === 'system' ? getSystemTheme() === 'dark' : theme === 'dark';

  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };

  const setTheme = (newTheme) => {
    dispatch(setThemeAction(newTheme));
  };

  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Re-trigger re-render by calling isDark effectively
      // Since theme is 'system', any change to system theme will update isDark
      // and trigger the useEffect in App.jsx
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
};

export default useTheme;
