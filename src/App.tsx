import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { ItemGrid } from './components/home/ItemGrid';
import { ReportForm } from './components/report/ReportForm';
import { ItemDetail } from './components/items/ItemDetail';
import { useItems } from './hooks/use-items';
import { Toaster } from './components/ui/sonner';

function App() {
  const { items } = useItems();

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Hero />
                  <ItemGrid items={items} />
                </>
              } 
            />
            <Route path="/report" element={<ReportForm />} />
            <Route path="/item/:id" element={<ItemDetail />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

export default App;