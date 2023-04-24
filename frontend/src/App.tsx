import React, { useEffect, useState } from "react";
import NavBar from "components/Navbar";
import Home from "pages/Home";
import EmailVerification from "pages/auth/EmailVerification";
import ForgotPassword from "pages/auth/ForgotPassword";
import { Login } from "pages/auth/Login";
import { Register } from "pages/auth/Register";
import ResetPassword from "pages/auth/ResetPassword";
import UpdatePassword from "pages/auth/UpdatePassword";
import UpdateProfile from "pages/auth/UpdateProfile";
import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "pages/NotFound";
import CartPage from "pages/CartPage";
import { Container } from "react-bootstrap";
import EventsList from "pages/events/EventsList";
import SingleEvent from "pages/events/SingleEvent";
import UserProfile from "pages/auth/UserProfile";
import Footer from "components/Footer";
import MfaInput from "components/MfaInput";
import { getUser } from "api/auth/auth-api";
import * as stor from "auth/store";
import cookies from "auth/cookies";
import { useDispatch } from "react-redux";
import AdminBookingsList from "pages/dashboard/bookings/AdminBookingsList";

const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        if (response.success) {
          dispatch(stor.login(response.user));

          cookies.set(stor.COOKIE_NAME_USER, response.user);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  });

  return (
    <>

      <NavBar
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
      />

      <Container
        style={{
          // padding: "32px 0",
          maxWidth: "100%",
          position: "relative",
          minHeight: "100vh",
        }}
      >

        <Routes>

          <Route path = "/reset-password/:resetToken/:userId" element={<ResetPassword onDismiss={() => navigate("/")} />}
          />

          <Route path="/" element={<Home onSignUpClicked={() => setShowSignUpModal(true)} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password" element={<ResetPassword onDismiss={() => navigate("/")} />} />

          <Route path = "/mfa" element={<MfaInput />} />
          <Route path = "/verify-email" element={<EmailVerification />} />
          <Route path = "/update-password" element={<UpdatePassword />} />
          <Route path = "/update-profile" element={<UpdateProfile />} />
          <Route path = "/my-cart" element={<CartPage />} />
          <Route path = "/my-profile" element={<UserProfile />} />

          <Route path = "/events" element={<EventsList />} />
          <Route path = "/events/:id" element={<SingleEvent />} />

          <Route path = '/admin-dashboard/bookings-list' element = {<AdminBookingsList />} />
        

          <Route path ="*" element = { <NotFound />} />

        </Routes>

        <Footer />

      </Container>

      {showSignUpModal && ( <Register onDismiss={() => setShowSignUpModal(false)}

          onSignUpSuccessful={() => {
            setShowSignUpModal(false);
          }}
        />
      )}

      {showLoginModal && (

        <Login
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={() => {
            setShowLoginModal(false);
          }}
        />
      )}

    </>

  );
};

export default App;
