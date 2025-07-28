import React from "react";
import {Translate} from "@mui/icons-material";
import {Box, ListItem, ListItemButton, Menu} from "@mui/material";
import {bindPopper, bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import i18n from "@/i18n";
import {useNavigate} from "react-router-dom";


const Language = () => {
  const navigate = useNavigate();
  const popupState = usePopupState({
    variant: "popover",
    popupId: "LanguageMenu",
  });

  const languages = [
    // {code: 'zh-Hant', label: '简体中文'},
    {code: 'en', label: 'English'},
    {code: 'es', label: 'Español'},
    {code: 'ar', label: 'العربيّة'},
  ]

  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentLang = ['en', 'es', 'ar'].includes(pathParts[0]) ? pathParts[0] : 'en';
  const changeLanguage = (lng: string) => {
    popupState.close()
    if (currentLang !== 'en') pathParts.shift();
    if (lng !== 'en') pathParts.unshift(lng);
    const newPath = '/' + pathParts.join('/') + location.search;
    i18n.changeLanguage(lng).then(() => {
      navigate(newPath);
    });
  }

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
                onClick={() => changeLanguage(language.code)}
              >
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