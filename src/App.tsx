import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { Painel } from './pages/Painel';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/painel/*" element={<Painel />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
