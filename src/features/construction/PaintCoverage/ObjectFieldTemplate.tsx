import {ObjectFieldTemplateProps} from "@rjsf/utils";
import Grid from "@mui/material/Grid2";


const PaintCoverageFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const fields: Record<string, any> = {}
  props.properties?.forEach((element: any) => {
    fields[element.name] = element.content
  })

  return (
    <Grid size={12} container spacing={2}>
      <Grid size={12}>
        {fields.length}
      </Grid>
       <Grid size={12}>
        {fields.width}
      </Grid>
      <Grid size={12}>
        {fields.height}
      </Grid>
      <Grid size={{xs:12, md: 6, lg: 6}}>
        {fields.doors}
      </Grid>
      <Grid size={{xs:12, md: 6, lg: 6}}>
        {fields.doorArea}
      </Grid>
      <Grid size={{xs:12, md: 6, lg: 6}}>
        {fields.windows}
      </Grid>
      <Grid size={{xs:12, md: 6, lg: 6}}>
        {fields.windowArea}
      </Grid>
      <Grid size={12}>
        {fields.coats}
      </Grid>
      <Grid size={12}>
        {fields.coveragePerLiter}
      </Grid>
      <Grid size={12}>
        {fields.requiredPaint}
      </Grid>
    </Grid>
  )
}
export default PaintCoverageFieldTemplate;