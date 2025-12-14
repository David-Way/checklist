import './global-styles.scss'; // global-styles
import { Header } from '@components';

interface AppProps {
  
}

const App: React.FC<AppProps> = () => {
  return (
    <>
      <Header title="Checklist" />
      <main>
        <p>
          🏗️
        </p>
      </main>
    </>
  )
}

export default App;
