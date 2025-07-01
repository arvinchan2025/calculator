import {WidgetProps} from "@rjsf/utils";
import {TextField} from "@mui/material";


const NumberWidget = (props: WidgetProps) => {

  return (
    <TextField
      label={props.label}
    />
  )
}
export default NumberWidget;