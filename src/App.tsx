import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/dashboard" element={<></>} />
          <Route path="/inventory" element={<></>} />
          <Route path="/orders" element={<></>} />
          <Route path="/customers" element={<></>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
