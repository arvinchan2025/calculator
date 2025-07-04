import Grid from "@mui/material/Grid2";
import {Breadcrumbs, Card, CardContent, CardHeader, Link, Typography} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import {node} from "stylis";


const Calculator = (props: Record<string, any>) => {
  const {t} = useTranslation();
  return (
    <Grid container spacing={2}>
      <Grid size={12} sx={{padding: "0 16px"}}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/home"
          >
            {t('calculator.home')}
          </Link>
          <Typography sx={{color: 'text.primary'}}>{props.title}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid size={12}>
        <Card sx={{boxShadow: 'none', backgroundColor: 'inherit'}}>
          <CardHeader title={props.title} subheader={props.description}/>
          <CardContent>
            <Grid container>
              {props.children}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
export default Calculator