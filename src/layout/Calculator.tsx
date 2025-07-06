import Grid from "@mui/material/Grid2";
import {Breadcrumbs, Card, CardContent, CardHeader, Link, Typography} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import {HelmetProvider, Helmet} from "react-helmet-async";
import {useLocation} from "react-router-dom";


const Calculator = (props: Record<string, any>) => {
  const {t} = useTranslation();
  const location = useLocation()
  return (
    <HelmetProvider>
      {props.pageTitle && <Helmet>
          <title>{props.pageTitle}</title>
          <meta name='description' content={props.pageDescription}></meta>
          <meta property={'og:title'} content={props.pageTitle}></meta>
          <meta property={'og:description'} content={props.pageDescription}></meta>
          <meta property={'og:url'} content={`https://calculator-now.com${location.pathname}`}></meta>
          <meta property={'og:type'} content={'website'}></meta>
      </Helmet>}
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
            <CardHeader
              title={<Typography
                variant={'h1'}
                sx={{fontSize: '22px', fontWeight: 'bold'}}
              >{props.title}</Typography>}
              subheader={props.description}
            />
            <CardContent>
              <Grid container>
                {props.children}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </HelmetProvider>
  )
}
export default Calculator