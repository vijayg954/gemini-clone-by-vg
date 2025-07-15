import React, { useState } from "react";
import ChatApp from "./pages/ChatApp";
import OTPLoginForm from "./Components/OtpLoginForm";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // start as false

  return (
    <div className="app min-h-screen bg-[url('./src/assets/gemini.png')]">
          <Toaster></Toaster>

      {isLoggedIn ? (
        <ChatApp />
      ) : (
        <OTPLoginForm onSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default App;

