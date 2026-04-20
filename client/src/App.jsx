import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import SingleJob from "./pages/SingleJob";
import PostJob from "./pages/PostJob";
import MyApplications from "./pages/MyApplications";
import CompanyApplications from "./pages/CompanyApplications";
import MyPostedJobs from "./pages/MyPostedJobs";
import EditJob from "./pages/EditJob";
import MyFavoriteJobs from "./pages/MyFavoriteJobs";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminJobs from "./pages/AdminJobs";

import WordpressWebsite from "./pages/WordpressWebsite";
import EcommerceWebsite from "./pages/EcommerceWebsite";
import CustomCMSWebsite from "./pages/CustomCMSWebsite";
import DigitalBranding from "./pages/DigitalBranding";
import EmailMarketing from "./pages/EmailMarketing";
import SocialMediaMarketing from "./pages/SocialMediaMarketing";
import SeoOptimizing from "./pages/SeoOptimizing";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<SingleJob />} />

        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-posted-jobs"
          element={
            <ProtectedRoute>
              <MyPostedJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute>
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/company-applications"
          element={
            <ProtectedRoute>
              <CompanyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-favorites"
          element={
            <ProtectedRoute>
              <MyFavoriteJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute>
              <AdminJobs />
            </ProtectedRoute>
          }
        />

        <Route path="/services/wordpress-website" element={<WordpressWebsite />} />
        <Route path="/services/ecommerce-website" element={<EcommerceWebsite />} />
        <Route path="/services/custom-cms-website" element={<CustomCMSWebsite />} />
        <Route path="/services/digital-branding" element={<DigitalBranding />} />
        <Route path="/services/email-marketing" element={<EmailMarketing />} />
        <Route path="/services/social-media-marketing" element={<SocialMediaMarketing />} />
        <Route path="/services/seo-optimizing" element={<SeoOptimizing />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;