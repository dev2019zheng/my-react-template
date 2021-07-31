import { ThemeColorClass } from '../constant';
import * as React from 'react';

export interface ThemeColor {
  themeColor: ThemeColorClass;
}

export const ThemeContext = React.createContext<ThemeColor>({
  themeColor: ThemeColorClass.green,
});

export const ThemeProvider = ThemeContext.Provider;
