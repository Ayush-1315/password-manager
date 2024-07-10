import { Routes, Route } from "react-router-dom";

import "./App.css";
import { LandingPage } from "./frontend/pages/LandingPage/landingPage";
import { Navbar } from "./frontend/components/navbar/navbar";
import { LoginPage } from "./frontend/pages/LoginPage/loginPage";
import { PrivateRoute } from "./frontend/components/privateRoute/privateRoute";
import { Profile } from "./frontend/pages/ProfilePage/profilePage";
import { ForgotPasswordPage } from "./frontend/pages/ForgotPasswordPage/forgotPasswordPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<>signup</>} />
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
    </div>
  );
}

export default App;
