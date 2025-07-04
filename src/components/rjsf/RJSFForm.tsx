import React, {ForwardedRef} from "react";
import {FormProps} from "@rjsf/core";
import MUIBaseInputTemplate from "./templates/MUIBaseInputTemplate";
import NumberWidget from "./widgets/NumberWidget";
import {Form} from "@rjsf/mui";
import {UiSchema} from "@rjsf/utils";



type RJSFFormProps = FormProps

const RJSFForm = (props: RJSFFormProps, ref: ForwardedRef<any>) => {
  const {templates, widgets, uiSchema, ...otherFormProps} = props
  const customTemplates = {
    BaseInputTemplate: MUIBaseInputTemplate,
    ...templates
  }

  const customWidgets = {
    NumberWidget,
    ...widgets
  }

  const customUiSchema: UiSchema = {
    "ui:submitButtonOptions": {
      "norender": true,
    },
    ...props.uiSchema
  };

  return (
    <Form
      ref={ref}
      {...otherFormProps}
      templates={customTemplates}
      widgets={customWidgets}
      uiSchema={customUiSchema}
      onSubmit={props.onSubmit}
      showErrorList={false}
    />
  )
}
export default React.forwardRef(RJSFForm)