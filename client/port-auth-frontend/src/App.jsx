import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Ships from "./pages/Ships";
import Cargo from "./pages/Cargo";
import Dock from "./pages/Dock";
import Containers from "./pages/Containers";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ships" element={<Ships />} />
          <Route path="/cargo" element={<Cargo />} />
          <Route path="/docks" element={<Dock />} />
          <Route path="/containers" element={<Containers />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;