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

  console.log("MUIBaseInputTemplate:", props)

  return (
    <TextField
      fullWidth
      label={props.label}
      value={props.value || ''}
      required={props.required}
      slotProps={{
        input: {
          endAdornment: uiOptions?.suffix? <InputAdornment position={"end"}>{`${uiOptions.suffix}`}</InputAdornment>: null,
        }
      }}
      helperText={uiSchema?.["ui:help"]}
      onChange={_onChange}
    />
  )
}
export default MUIBaseInputTemplate