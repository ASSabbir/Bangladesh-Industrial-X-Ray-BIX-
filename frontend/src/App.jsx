import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Equipment from "./pages/Equipment";
import EquipmentDetail from "./pages/EquipmentDetail";
import Certifications from "./pages/Certifications";
import Gallery from "./pages/Gallery";
import PreviousProjects from "./pages/PreviousProjects";
import ProjectDetail from "./pages/ProjectDetail";
import Training from "./pages/Training";
import Partners from "./pages/Partners";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import ErrorPage from "./pages/ErrorPage";
import Maintenance from "./pages/Maintenance";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ManageServices from "./admin/ManageServices";
import ManageEquipment from "./admin/ManageEquipment";
import ManageGallery from "./admin/ManageGallery";
import ManageProjects from "./admin/ManageProjects";
import ManageTraining from "./admin/ManageTraining";

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/equipment/:slug" element={<EquipmentDetail />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/previous-projects" element={<PreviousProjects />} />
        <Route path="/previous-projects/:id" element={<ProjectDetail />} />
        <Route path="/training" element={<Training />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />

        {/* System pages (SRS section: custom error/status pages) */}
        <Route path="/403" element={<Forbidden />} />
        <Route path="/500" element={<ErrorPage />} />
        <Route path="/maintenance" element={<Maintenance />} />
      </Route>

      {/* Admin (hidden /admin route per SRS) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="equipment" element={<ManageEquipment />} />
        <Route path="gallery" element={<ManageGallery />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="training" element={<ManageTraining />} />
      </Route>

      {/* 404 catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}