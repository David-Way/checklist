import "./form-container.module.scss";
import Form from "@rjsf/core";
import type { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import {
  useQuery,
} from '@tanstack/react-query'
import { useState } from "react";
import { getChecklist } from '../../api';
import checklistSchemaJSON from "../../schema/checklist-definition.schema.json";
// import checklistExampleJSON from "../../schema/checklist-example.json";
import customWidgets from "./CustomWidgets";

// Define the prop types using an interface
export interface FormProps {
	title: string;
}

const schema: RJSFSchema = {
  "title": "A registration form",
  "description": "A simple form example.",
  "type": "object",
  "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name",
      "default": "Chuck"
    },
    "lastName": {
      "type": "boolean",
      "title": "Last name"
    },
    "age": {
      "type": "boolean",
      "title": "Age"
    },
    "bio": {
      "type": "boolean",
      "title": "Bio"
    }
  }
};

const checklistSchema: RJSFSchema = checklistSchemaJSON;
// const checklistExample = checklistExampleJSON;
const log = (type) => console.log.bind(console, type);

const FormContainer: React.FC<FormProps> = ({ title }) => {
	const [formData, setFormData] = useState(null);
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["checklist"],
		queryFn: () => getChecklist(2000000),
	});

	if (isPending) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	return (
		<Form
			schema={schema}
			// schema={data}
			validator={validator}
			onChange={(event) => setFormData(event.formData)}
			onSubmit={log("submitted")}
			onError={log("errors")}
			widgets={customWidgets}
		/>
	);
};

export default FormContainer;
