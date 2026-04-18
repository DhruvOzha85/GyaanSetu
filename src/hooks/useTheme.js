import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme as toggleThemeAction, setTheme as setThemeAction } from '../features/ui/uiSlice';
import { useEffect } from 'react';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };

  const setTheme = (newTheme) => {
    dispatch(setThemeAction(newTheme));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
};

export default useTheme;
