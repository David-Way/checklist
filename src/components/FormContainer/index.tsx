import "./form-container.scss";
import Form from "@rjsf/core";
import type { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { useState } from "react";

import templates from "../../templates";
import widgets from "../../widgets";

// Define the prop types using an interface
export interface FormProps {
  schema: object;
}

const schemaFallback: RJSFSchema = {
  title: "A registration form",
  description: "A simple form example.",
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    firstName: {
      type: "string",
      title: "First name",
      default: "Chuck",
    },
    lastName: {
      type: "boolean",
      title: "Last name",
    },
    age: {
      type: "boolean",
      title: "Age",
    },
    bio: {
      type: "boolean",
      title: "Bio",
    },
  },
};

const FormContainer: React.FC<FormProps> = ({
  schema,
  uiSchema,
  onSubmit,
  children,
}) => {
  const [formData, setFormData] = useState(null);

  return (
    <Form
      schema={schema || schemaFallback}
      uiSchema={uiSchema}
      className="c-form-container"
      validator={validator}
      templates={templates} // custom templates
      formData={formData}
      onChange={(event) => setFormData(event.formData)}
      onSubmit={onSubmit}
      onError={(errors) => console.log("errors", errors)}
      widgets={widgets} //custom widgets
      liveOmit="onBlur"
      omitExtraData={true}
    >
      {children}
    </Form>
  );
};

export default FormContainer;
