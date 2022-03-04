import React from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <BrowserRouter>
      <div className="app">
        {user ? (
          <div className="app__body">
            <Sidebar />
            <Routes>
              <Route path="/rooms" element={<Chat />} />
              <Route path="/" element={<Chat />} />
              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
