import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import { Home } from './pages/Home';
import { BookCatalog, BookCatalogContent } from './pages/BookCatalog';
import { MyBooks } from './pages/MyBooks';
import { AdminPanel } from './pages/AdminPanel';
import { Dashboard } from './pages/Dashboard';
import { Patrons } from './pages/Patrons';
import { CheckInItem } from './pages/CheckInItem';
import { CheckOutItem } from './pages/CheckOutItem';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="catalog"
              element={
                <BookCatalog>
                  <BookCatalogContent />
                </BookCatalog>
              }
            />
            <Route path="my-books" element={<MyBooks />} />
            <Route path="patrons" element={<Patrons />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="checkin" element={<CheckInItem />} />
            <Route path="checkout" element={<CheckOutItem />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
