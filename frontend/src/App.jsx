import ListPage from './pages/list';
import ShortenProvider from './store/store';


function App() {
  return (
    <ShortenProvider>
      <ListPage />
    </ShortenProvider>
  )
}

export default App
