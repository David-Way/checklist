import "./form-container.module.scss";
import Form from "@rjsf/core";
import type { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
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
	title: "Todo",
	type: "object",
	required: ["title"],
	properties: {
		title: { type: "string", title: "Title", default: "A new task" },
		done: { type: "boolean", title: "Done?", default: false },
	},
};

const checklistSchema: RJSFSchema = checklistSchemaJSON;
// const checklistExample = checklistExampleJSON;

const log = (type) => console.log.bind(console, type);

const FormContainer: React.FC<FormProps> = ({ title }) => {
	const [formData, setFormData] = useState(null);
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["checklist"],
		queryFn: getChecklist(1000000),
	});

	if (isPending) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	console.log('import.meta.env.MODE', import.meta.env.MODE);
	console.log('import.meta.env.VITE_APP_API_URL', import.meta.env.VITE_APP_API_URL)
	console.log('data', data);
	return (
		<Form
			// schema={schema}
			schema={data}
			validator={validator}
			onChange={(event) => setFormData(event.formData)}
			onSubmit={log("submitted")}
			onError={log("errors")}
			widgets={customWidgets}
		/>
	);
};

export default FormContainer;
