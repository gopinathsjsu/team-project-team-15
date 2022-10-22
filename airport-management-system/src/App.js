import Home from "./Home";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <header style={{fontFamily: 'san-serif',padding: '10px',
      color: 'white',textAlign:'center',
      fontSize: '48px', backgroundColor: '#007AFF'}}>Airport Management System</header>
      <div style={{paddingBottom: '50px'}}></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
