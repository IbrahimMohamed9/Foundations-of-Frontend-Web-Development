import "./App.css";
import Footer from "./component/global/footer/footer";
import Header from "./component/global/header/header";
import Home from "./pages/home";
import Contact from "./pages/contact.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
