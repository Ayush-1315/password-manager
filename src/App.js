import { Routes, Route } from "react-router-dom";

import "./App.css";
import { LandingPage } from "./frontend/pages/LandingPage/landingPage";
import { Navbar } from "./frontend/components/navbar/navbar";
import { LoginPage } from "./frontend/pages/LoginPage/loginPage";
import { PrivateRoute } from "./frontend/components/privateRoute/privateRoute";
import { Profile } from "./frontend/pages/ProfilePage/profilePage";
import { ForgotPasswordPage } from "./frontend/pages/ForgotPasswordPage/forgotPasswordPage";
import { SignupPage } from "./frontend/pages/SignupPage/signupPage";
import { Toaster } from "./frontend/components/toaster/toaster";
import { useToaster } from "./frontend/context/toasterContext";
import { Background } from "./frontend/components/background/background";

function App() {
  const{toasterData}=useToaster();
  return (
    <div className="App">
      <Toaster {...toasterData}/>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <>Home</>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/search" element={<>Search here</>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/*" element={<>Oops</>} />
      </Routes>
      <Background/>
    </div>
  );
}

export default App;
