import React, {ForwardedRef} from "react";
import {FormProps} from "@rjsf/core";
import MUIBaseInputTemplate from "./templates/MUIBaseInputTemplate";
import NumberWidget from "./widgets/NumberWidget";
import {Form} from "@rjsf/mui";



type RJSFFormProps = FormProps

const RJSFForm = (props: RJSFFormProps, ref: ForwardedRef<any>) => {
  const {templates, widgets, ...otherFormProps} = props
  const customTemplates = {
    BaseInputTemplate: MUIBaseInputTemplate,
    ...templates
  }

  const customWidgets = {
    NumberWidget,
    ...widgets
  }

  return (
    <Form
      ref={ref}
      {...otherFormProps}
      templates={customTemplates}
      widgets={customWidgets}
      onSubmit={props.onSubmit}
    />
  )
}
export default React.forwardRef(RJSFForm)