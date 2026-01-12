import './styles/index.scss'; // global-styles
import { FormContainer, Header } from '@components';

interface AppProps {
  
}

const App: React.FC<AppProps> = () => {
  return (
    <>
      <Header title="Checklist" />
      <main>
        <FormContainer title="test" />
      </main>
    </>
  )
}

export default App;
