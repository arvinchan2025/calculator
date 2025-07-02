import React from "react";
import {Translate} from "@mui/icons-material";
import {Box, ListItem, ListItemButton, Menu} from "@mui/material";
import {bindPopper, bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import i18n from "@/i18n";


const Language = () => {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "LanguageMenu",
  });
  const languages = [
    {code: 'zh-Hant', label: '简体中文'},
    {code: 'en', label: 'English'}
  ]

  return (
    <Box>
      <Translate {...bindTrigger(popupState)} />
      <Menu {...bindPopper(popupState)}>
        {languages.map((language) => {
          return (
            <ListItem key={language.code}>
              <ListItemButton onClick={async () => {
                localStorage.setItem("i18nextLng", language.code);
                await i18n.changeLanguage(language.code);
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