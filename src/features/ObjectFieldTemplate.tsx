import {ObjectFieldTemplateProps} from "@rjsf/utils";
import Grid from "@mui/material/Grid2";


const CustomObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const fields: Record<string, any> = {}
  props.properties.forEach((elem: any) => {
    fields[elem.name] = elem.content
  })
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        {fields.age}
      </Grid>
      <Grid size={12}>
        {fields.height}
      </Grid>
      <Grid size={12}>
        {fields.weight}
      </Grid>
    </Grid>
  )
}
export default CustomObjectFieldTemplate