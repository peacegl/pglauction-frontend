import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import defaultConfig, {
  backgroundDark,
  backgroundLight,
  defaultTheme,
  textDark,
  textLight,
} from './defaultConfig';
import PropTypes from 'prop-types';
import {LayoutDirection, ThemeMode} from '../../../shared/constants/AppEnums';

const ThemeContext = createContext();
const ThemeActionsContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const useThemeActionsContext = () => useContext(ThemeActionsContext);

const ThemeContextProvider = ({children}) => {
  const [theme, setTheme] = useState(defaultTheme.theme);
  const [themeMode, updateThemeMode] = useState(defaultConfig.themeMode);
  const [themeStyle, updateThemeStyle] = useState(defaultConfig.themeStyle);

  const updateTheme = useCallback((theme) => {
    // Table header styles
    theme.components.MUIDataTableHeadCell.styleOverrides.root = {
      ...theme.components.MUIDataTableHeadCell.styleOverrides.root,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      'div, svg, span': {
        color: theme.palette.primary.contrastText + '!important',
      },
    };
    theme.components.MUIDataTableHeadCell.styleOverrides.fixedHeader = {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    };
    // Header Checkbox style
    theme.components.MUIDataTableSelectCell.styleOverrides.headerCell = {
      backgroundColor: theme.palette.primary.main,
      '.MuiButtonBase-root': {
        color: theme.palette.primary.contrastText,
      },
    };
    setTheme(theme);
  }, []);

  useEffect(() => {
    theme.palette = {
      ...theme.palette,
      mode: themeMode === ThemeMode.DARK ? ThemeMode.DARK : ThemeMode.LIGHT,
      background:
        themeMode === ThemeMode.DARK ? backgroundDark : backgroundLight,
      text: themeMode === ThemeMode.DARK ? textDark : textLight,
    };
    updateTheme(theme);
  }, [themeMode, theme, updateTheme]);

  useEffect(() => {
    if (theme.direction === LayoutDirection.RTL) {
      document.body.setAttribute('dir', LayoutDirection.RTL);
    } else {
      document.body.setAttribute('dir', LayoutDirection.LTR);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeStyle,
        themeMode,
      }}
    >
      <ThemeActionsContext.Provider
        value={{
          updateTheme,
          updateThemeStyle,
          updateThemeMode,
        }}
      >
        {children}
      </ThemeActionsContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
