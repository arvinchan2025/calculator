import React, {useContext, useEffect, useMemo, useState} from "react";
import {createTheme, Theme, ThemeProvider} from "@mui/material";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import stylisRTLPlugin from "stylis-plugin-rtl";
import {CacheProvider} from "@emotion/react";
import {useTranslation} from "react-i18next";

type ProviderProps = {
  children?: React.ReactNode
} & Record<string, any>

type MuiThemeContextProps = Record<string, any>

const MuiThemeContext = React.createContext<MuiThemeContextProps>({
  direction: "ltr",
});

export const useMuiThemeContext = () => {
  const context = useContext(MuiThemeContext)
  if (!context) {
    throw new Error('The snackbar provider not found!')
  }
  return context
}


const MuiThemeProvider: React.FC<ProviderProps> = (props) => {
  const {i18n} = useTranslation();
  const cacheRtl = useMemo(() => {
    const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
    return createCache({
      key: `mui-${direction}`,
      stylisPlugins: direction === "rtl" ? [prefixer, stylisRTLPlugin] : []
    })
  }, [i18n.language])

  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language])

  return (
    <MuiThemeContext.Provider value={{
      // setDirection,
    }}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={{
          ...createTheme({
            direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
            palette: {
              mode: 'light',
            },
            typography: {
              fontFamily: "Poppins,SemiBold"
            }
          })
        }}>
          {props.children}
        </ThemeProvider>
      </CacheProvider>
    </MuiThemeContext.Provider>
  )
}
export default MuiThemeProvider
