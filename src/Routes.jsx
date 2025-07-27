import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Login from "pages/login";
import Dashboard from "pages/dashboard";
import BeneficiaryManagement from "pages/beneficiary-management";
import ActivityRegistration from "pages/activity-registration";
import ActivityManagement from "pages/activity-management";
import ReportsAndAnalytics from "pages/reports-and-analytics";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/beneficiary-management" element={<BeneficiaryManagement />} />
        <Route path="/activity-registration" element={<ActivityRegistration />} />
        <Route path="/activity-management" element={<ActivityManagement />} />
        <Route path="/reports-and-analytics" element={<ReportsAndAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;