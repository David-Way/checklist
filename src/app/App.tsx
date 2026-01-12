import "./styles/index.scss"; // global-styles
import { FormContainer, Header } from "@components";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Header title="Checklist" />
			<main>
				<FormContainer title="test" />
			</main>
		</QueryClientProvider>
	);
};

export default App;
