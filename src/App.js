import React from "react";
import { Routes, Route } from "react-router";
import firebase, { firebaseContext } from "./firebase";

import Menu from "./components/Pages/Menu";
import NuevoPlatillo from "./components/Pages/NuevoPlatillo";
import Ordenes from "./components/Pages/Ordenes";
import SideBar from "./components/ui/SideBar";

function App() {
  return (
    <firebaseContext.Provider
      value={{
        firebase,
      }}
    >
      <div className="md:flex min-h-screen">
        <SideBar />
        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Routes>
            <Route path="/" element={<Ordenes />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/nuevo-platillo" element={<NuevoPlatillo />} />
          </Routes>
        </div>
      </div>
    </firebaseContext.Provider>
  );
}

export default App;
