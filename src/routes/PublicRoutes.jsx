import React from "react";
import { Route, Routes } from "react-router";
import { AuthenticatedRoute } from "../components/common/ProtectedRoute";
import BaseLayout from "../layouts/BaseLayout";

// Public pages
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ClassesPage from "../pages/ClassesPage";
import SingleClassPage from "../pages/SingleClassPage";
import Trainers from "../pages/Trainers";
import Pricing from "../pages/Pricing";
import Contact from "../pages/Contact";
import Reviews from "../pages/Reviews";
import Dashboard from "../pages/Dashboard";
import NotFound from "../components/common/NotFound";
import Unauthorized from "../components/common/Unauthorized";

// Auth pages
import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";
import LogOut from "../pages/LogOut";
import ResetPassword from "../pages/ResetPassword";
import RsetPasswordConfirm from "../pages/RsetPasswordConfirm";
import ActivateAccount from "../pages/ActivateAccount";
import ActivationEmailSuccessfull from "../pages/ActivationEmailSuccessfull";
import SentEmailSuccess from "../pages/SentEmailSuccess";
import EmailVerified from "../pages/EmailVerified";
import RegistrationSuccessfull from "../pages/RegistrationSuccessfull";

// Payments
import InitiatePayment from "../pages/InitiatePayment";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel";
import PaymentFail from "../pages/PaymentFail";
import DownloadRecipt from "../pages/DownloadRecipt";
import DownloadInvoice from "../pages/DownloadInvoice";
import ConfirmSubscription from "../pages/ConfirmSubscription";
import { PAYMENT_TYPES } from "./CONSTANTS";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        {/* Main */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/classes/:id" element={<SingleClassPage />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/subscriptions" element={<Pricing />} />
        <Route
          path="/subscriptions/:id"
          element={
            <AuthenticatedRoute>
              <ConfirmSubscription />
            </AuthenticatedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Auth */}
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/sent-email-success" element={<SentEmailSuccess />} />
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
        <Route
          path="/activation-email-successfull"
          element={<ActivationEmailSuccessfull />}
        />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password/confirm/:uid/:token"
          element={<RsetPasswordConfirm />}
        />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Registration */}
        <Route
          path="/registration-successfull"
          element={
            <AuthenticatedRoute>
              <RegistrationSuccessfull />
            </AuthenticatedRoute>
          }
        />

        {/* Payments */}
        <Route
          path="/payment/initiate/booking"
          element={
            <AuthenticatedRoute>
              <InitiatePayment paymentType={PAYMENT_TYPES.BOOKING} />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/payment/initiate/subscription"
          element={
            <AuthenticatedRoute>
              <InitiatePayment paymentType={PAYMENT_TYPES.SUBSCRIPTION} />
            </AuthenticatedRoute>
          }
        />
        <Route path="/payment/success/:id" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />
        <Route path="/payment/fail" element={<PaymentFail />} />
        <Route path="/download-receipt" element={<DownloadRecipt />} />
        <Route path="/download-invoice" element={<DownloadInvoice />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
