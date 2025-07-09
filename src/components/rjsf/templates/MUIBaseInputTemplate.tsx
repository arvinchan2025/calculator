import {BaseInputTemplateProps} from "@rjsf/utils";
import {InputAdornment, TextField} from "@mui/material";
import {ChangeEvent} from "react";


const MUIBaseInputTemplate = (props: BaseInputTemplateProps) => {
  const {uiSchema, options, schema, onChange} = props
  const uiOptions = uiSchema?.["ui:options"]

  const _onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    let emptyValue = options.emptyValue
    if (emptyValue === undefined) {
      if (schema.type?.indexOf('null') !== -1) {
        emptyValue = null
      } else if (schema.type?.indexOf('string')) {
        emptyValue = ''
      }
    }
    return onChange(value === '' ? emptyValue : value);
  }

  const suffix: any = uiOptions?.suffix

  return (
    <TextField
      fullWidth
      label={props.label}
      value={props.value || ''}
      required={props.required}
      placeholder={props.placeholder}
      slotProps={{
        input: {
          readOnly: props.readonly,
          endAdornment: suffix? <InputAdornment position={"end"}>{suffix}</InputAdornment>: null,
        }
      }}
      helperText={uiSchema?.["ui:help"]}
      onChange={_onChange}
    />
  )
}
export default MUIBaseInputTemplate