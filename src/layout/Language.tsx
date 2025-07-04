import React from "react";
import {Translate} from "@mui/icons-material";
import {Box, ListItem, ListItemButton, Menu} from "@mui/material";
import {bindPopper, bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import i18n from "@/i18n";
import {useMuiThemeContext} from "@/providers/MuiThemeProvider";


const Language = () => {
  const {setDirection} = useMuiThemeContext()
  const popupState = usePopupState({
    variant: "popover",
    popupId: "LanguageMenu",
  });
  const languages = [
    {code: 'zh-Hant', label: '简体中文'},
    {code: 'en', label: 'English'},
    {code: 'es-MX', label: 'Español'},
    {code: 'ar', label: 'العربيّة'},
  ]

  return (
    <Box>
      <Translate {...bindTrigger(popupState)} color={"primary"}/>
      <Menu
        {...bindPopper(popupState)}
        sx={{
          maxHeight: '288px',
        }}
      >
        {languages.map((language) => {
          return (
            <ListItem key={language.code} disablePadding>
              <ListItemButton
                onClick={async () => {
                  localStorage.setItem("i18nextLng", language.code);
                  await i18n.changeLanguage(language.code);
                  setDirection(language.code === 'ar' ? 'rtl' : 'ltr');
                  popupState.close()
                }}>
                {language.label}
              </ListItemButton>
            </ListItem>
          )
        })}
      </Menu>
    </Box>
  )
}
export default Language