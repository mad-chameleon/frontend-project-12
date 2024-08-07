import '../index.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './Navbar';
import ErrorPage from '../pages/ErrorPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ChatPage from '../pages/ChatPage';
import routes from '../routes';
import { useAuth, useModal } from '../hooks';
import modals from './modals';

const App = () => {
  const { isLoggedIn } = useAuth();
  const { isOpen, modalType } = useModal();

  const Redirect = isLoggedIn ? <ChatPage /> : <Navigate to={routes.loginPagePath()} />;

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Routes>
          <Route path={routes.chatPagePath()} element={Redirect} />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.signupPagePath()} element={<SignUpPage />} />
          <Route path={routes.otherPagePath()} element={<ErrorPage />} />
        </Routes>
      </div>
      { isOpen && modals[modalType] }
      <ToastContainer />
    </>
  );
};

export default App;
