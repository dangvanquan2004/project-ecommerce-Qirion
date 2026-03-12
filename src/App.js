import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import các component đã tách ra
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import AuthModal from "./components/AuthModal/AuthModal";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";
// import ProductDetail from "./pages/ProductDetail"; // Sẽ làm sau

function App() {
  // State quản lý việc mở Popup và trạng thái form bên trong Popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialIsRegister, setInitialIsRegister] = useState(false);

  // Hàm mở modal và set trạng thái
  const openModal = (isRegister = false) => {
    setInitialIsRegister(isRegister);
    setIsModalOpen(true);
  };

  return (
    <Router>
      <div className="App">
        <Header onOpenModal={openModal} /> {/* Thanh điều hướng luôn hiện ở trên cùng */}
        <Navigation /> {/* Thanh menu bên dưới Header */}
        {/* Render Modal: Nó luôn nằm ở đây nhưng chỉ hiện khi isModalOpen = true */}
        <AuthModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialIsRegister={initialIsRegister}
        />
        <Routes>
          {/* Trang chủ hiển thị Banner, Categories và Products */}
          <Route path="/" element={<HomePage />} />

          {/* Đường dẫn trang chi tiết sản phẩm (ví dụ: /product/1) */}
          {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;