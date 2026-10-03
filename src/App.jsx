import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Services from './pages/Services';
import Industries from './pages/Industries';
import GlobalMarketsPage from './pages/GlobalMarketsPage';
import ForManufacturers from './pages/ForManufacturers';
import ForBuyers from './pages/ForBuyers';
import Contact from './pages/Contact';

// Admin Portal
import AdminLogin from './pages/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import InquiriesAdmin from './pages/admin/InquiriesAdmin';
import ServicesAdmin from './pages/admin/ServicesAdmin';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import PageContentAdmin from './pages/admin/PageContentAdmin';
import CompanyInfoAdmin from './pages/admin/CompanyInfoAdmin';
import IndustriesAdmin from './pages/admin/IndustriesAdmin';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Showcase Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/global-markets" element={<GlobalMarketsPage />} />
        <Route path="/for-manufacturers" element={<ForManufacturers />} />
        <Route path="/for-buyers" element={<ForBuyers />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Management Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="inquiries" element={<InquiriesAdmin />} />
          <Route path="services" element={<ServicesAdmin />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="page-content" element={<PageContentAdmin />} />
          <Route path="company-info" element={<CompanyInfoAdmin />} />
          <Route path="industries" element={<IndustriesAdmin />} />
        </Route>

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;