import React, {useContext, useEffect, useMemo, useState} from "react";
import {createTheme, Theme, ThemeProvider} from "@mui/material";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import stylisRTLPlugin from "stylis-plugin-rtl";
import {CacheProvider} from "@emotion/react";

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
  const currentLanguage = localStorage.getItem("i18nextLng");
  const defaultDirection = currentLanguage === "ar" ? "rtl" : "ltr"
  const [direction, setDirection] = useState<any>(defaultDirection)

  const cacheRtl = useMemo(() => createCache({
    key: `mui-${direction}`,
    stylisPlugins: direction === "rtl" ? [prefixer, stylisRTLPlugin] : []
  }), [direction])
  const isRTL = direction === "rtl"

  useEffect(() => {
    document.dir = direction
  }, [direction])

  return (
    <MuiThemeContext.Provider value={{
      setDirection,
    }}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={{
          ...createTheme({
            direction: direction,
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
