import "./styles/index.scss"; // global-styles
import { FormContainer, Header } from "@components";
import {
	useQuery,
} from "@tanstack/react-query";
import { getAllChecklists } from "../api";

const App: React.FC = () => {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["AllChecklists"],
		queryFn: () => getAllChecklists(),
	});

	if (isPending) {
		return <span>Loading all checklists...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	console.log('all checklists', data);
	return (
		<>
			<Header title="Checklist" />
			<main>
				<FormContainer title="test" />
			</main>
		</>
	);
};

export default App;
