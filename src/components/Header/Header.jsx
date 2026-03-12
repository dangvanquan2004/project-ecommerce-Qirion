import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa"; // Import Icon
import "./Header.css";

function Header({ onOpenModal }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const userStr = localStorage.getItem("currentUser");
      if (userStr) {
        setCurrentUser(JSON.parse(userStr));
      } else {
        setCurrentUser(null);
      }
    };

    // Tải user khi component load
    loadUser();

    // Lắng nghe sự kiện đăng nhập/đăng xuất
    window.addEventListener("loginStateChange", loadUser);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("loginStateChange", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.dispatchEvent(new Event("loginStateChange"));
  };
  return (
    <header className="navbar">
      <div className="container navbar-content">
        {/* 1. LOGO */}
        <Link to="/" className="nav-logo">
          {/* Giả sử bạn có file logo.png trong thư mục public */}
          <img src="/logoQirion.png" alt="Qirion Logo" className="logo-img" /> 
          <span className="logo-text">QIRION</span>
        </Link>

        {/* 2. SEARCH BAR (Thanh tìm kiếm xịn hơn) */}
        <div className="search-bar">
          <input type="text" placeholder="Nhập từ khóa tìm kiếm" />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>

        {/* 3. ACTIONS (Các nút chức năng) */}
        <div className="nav-actions">
          {/* Hotline & Showroom (Ẩn trên mobile để đỡ chật) */}
          <div className="nav-info hide-on-mobile">
            <div className="info-item">
              <FaPhoneAlt className="icon-sm" />
              <span>Hotline<br/><strong>1900 1234</strong></span>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="icon-sm" />
              <span>Hệ thống<br/><strong>Showroom</strong></span>
            </div>
          </div>

          {/* Giỏ hàng & Login */}
          <div className="nav-icons">
            <Link to="/cart" className="icon-item">
              <div className = "icon-wrapper">
                <FaShoppingCart className="icon-lg" />
                <span className="cart-badge">2</span> {/* Số lượng hàng trong giỏ */}
              </div>
              
              <span className="icon-text">Giỏ hàng</span>
            </Link>
            
            {/* Nút hiển thị chính (Trigger) */}
            <div className="user-dropdown">
              <div className="icon-item login-btn">
                <FaUser className="icon-lg" />
                <span className="icon-text">{currentUser ? currentUser.fullName : "Đăng nhập"}</span>
              </div>

              {/* Menu xổ xuống (Ẩn, chỉ hiện khi hover) */}
              <div className="dropdown-menu">
                {currentUser ? (
                  <>
                    <div className="dropdown-item" style={{cursor: "pointer"}}>
                      Hồ sơ của tôi
                    </div>
                    <div className="dropdown-item" onClick={handleLogout} style={{cursor: "pointer"}}>
                      Đăng xuất
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dropdown-item" onClick={() => onOpenModal(false)} style={{cursor: "pointer"}}>
                      Đăng nhập
                    </div>
                    <div className="dropdown-item" onClick={() => onOpenModal(true)} style={{cursor: "pointer"}}>
                      Đăng ký
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;