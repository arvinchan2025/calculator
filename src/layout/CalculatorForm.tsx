import RJSFForm from "@/components/rjsf/RJSFForm";
import {Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField} from "@mui/material";
import validator from "@rjsf/validator-ajv8";
import React, {useEffect, useRef} from "react";
import {Calculate, Clear, Close, Share} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {useLocation, useParams, useSearchParams} from "react-router-dom";


const CalculatorForm = (props: any) => {
  const {t} = useTranslation();
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [formData, setFormData] = React.useState<any>(props.formData)
  const [share, setShare] = React.useState<any>({
    link: null,
    open: false
  });
  const formRef = useRef<any>(null);
  const onCalculate = async () => {
    const isValid = await formRef.current?.validateForm()
    if (isValid) {
      const formData = formRef.current?.state.formData
      const result= await props.onCalculate(formData)
      setFormData({
        ...formData,
        ...result
      })
    }
  }
  const onShare = async () => {
    const isValid = await formRef.current?.validateForm()
    if (isValid) {
      const formData = formRef.current?.state.formData
      const encodeFormData = btoa(encodeURIComponent(JSON.stringify(formData)))
      setShare({open: true, link: `https://calculator-now$.com{location.pathname}?result=${encodeFormData}`})
    }
  }

  const onCopy = async () => {
    await navigator.clipboard.writeText(share.link)
  }

  useEffect(() => {
    const resultParam = searchParams.get('result')
    const result = resultParam && decodeURIComponent(atob(resultParam))
    if(result){
      const formData = JSON.parse(result)
      const ret = props.onCalculate(formData)
      setFormData({
        ...formData,
        ...ret
      })
    }
  }, [searchParams])

  return (
    <Box>
      <RJSFForm
        ref={formRef}
        schema={props.schema}
        uiSchema={props.uiSchema}
        customValidate={props.customValidate}
        validator={validator}
        formData={formData}
        onChange={(data, id) => {
          if(props.onChange){
            const result = props.onChange(data, id)
            setFormData({
              ...data.formData,
              ...result
            })
          }else{
            setFormData(data.formData)
          }
        }}
      />
      <Stack
        sx={{padding: "16px 0", width: '100%'}}
        spacing={2}
        direction={"row"}
      >
        <Button
          variant={"outlined"}
          startIcon={<Share/>}
          onClick={onShare}
          sx={{height: "96px", width: "50%"}}
          color={"info"}
        >
          {t("common.button.share")}
        </Button>
        <Stack
          spacing={2}
          sx={{flex: 1}}
        >
          <Button
            variant={"outlined"}
            startIcon={<Calculate/>}
            onClick={onCalculate}
            fullWidth
            sx={{height: "40px"}}
            color={"info"}
          >
            {t("common.button.calculate")}
          </Button>
          <Button
            variant={"outlined"}
            startIcon={<Clear/>}
            fullWidth
            sx={{height: "40px"}}
            color={"info"}
            onClick={() => formRef.current?.reset()}
          >
            {t("common.button.clear")}
          </Button>
        </Stack>
      </Stack>
      <Dialog
        open={share.open}
        onClose={() => setShare({...share, open: false})}
      >
        <DialogTitle>Share Calculator Result</DialogTitle>
        <IconButton
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          onClick={() => setShare({...share, open: false})}
        >
          <Close />
        </IconButton>
        <DialogContent sx={{paddingBottom: '16px'}}>
          <DialogContent>
            {t('calculator.share.description')}
          </DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Share"
            fullWidth
            value={share.link}
            slotProps={{
              input: {
                readOnly: true,
                endAdornment: <Button onClick={onCopy}>{t("common.button.copy")}</Button>
              }
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
export default CalculatorForm