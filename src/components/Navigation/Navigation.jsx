import React,{useState} from "react";
import { Link } from "react-router-dom";
import { 
  FaBars, FaDesktop, FaLaptop, FaMicrochip, FaGamepad, 
  FaNetworkWired, FaPrint, FaHdd, FaMemory, FaTv, FaTimes, FaChevronRight 
} from "react-icons/fa"; // Import các icon cần thiết
import "./Navigation.css";

function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Danh sách danh mục bên trái (Dropdown)
  const categories = [
    { name: "PC Gaming", icon: <FaGamepad /> },
    { name: "PC Đồ Họa - Làm việc", icon: <FaDesktop /> },
    { name: "PC AI - Trí tuệ nhân tạo", icon: <FaMicrochip /> },
    { name: "Linh kiện máy tính", icon: <FaMemory /> },
    { name: "Màn hình máy tính", icon: <FaTv /> },
    { name: "Laptop", icon: <FaLaptop /> },
    { name: "Thiết bị lưu trữ", icon: <FaHdd /> },
    { name: "Thiết bị văn phòng", icon: <FaPrint /> },
    { name: "Thiết bị mạng", icon: <FaNetworkWired /> },
    { name: "Phụ kiện & Gear", icon: <FaGamepad /> },
  ];

  return (
    <>
    <nav className="bottom-nav">
      <div className="container nav-content">
        
        {/* 1. NÚT DANH MỤC SẢN PHẨM (MÀU TRẮNG) */}
        <div className="category-dropdown-wrapper">
          <div 
            className="category-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaBars className="cat-icon-bar" />
            <span>DANH MỤC SẢN PHẨM</span>
          </div>

          {/* MENU XỔ XUỐNG (DROPDOWN) */}
          <ul className="category-list hide-on-mobile">
            {categories.map((cat, index) => (
              <li key={index} className="category-item">
                <Link to={`/category/${index}`}>
                  <span className="cat-item-icon">{cat.icon}</span>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. MENU NGANG (PC, LINH KIỆN...) */}
        <ul className="horizontal-menu">
          <li><Link to="/pc"><FaDesktop /> PC</Link></li>
          <li><Link to="/pc-ai"><FaMicrochip /> PC AI</Link></li>
          <li><Link to="/linh-kien"><FaMemory /> Linh kiện PC</Link></li>
          <li><Link to="/man-hinh"><FaTv /> Màn hình</Link></li>
          <li><Link to="/laptop"><FaLaptop /> Laptop</Link></li>
          <li><Link to="/van-phong"><FaPrint /> Thiết bị văn phòng</Link></li>
            <li><Link to="/phu-kien"><FaGamepad /> Phụ kiện & Gear</Link></li>
        </ul>

      </div>
    </nav>
    {/* 3. GIAO DIỆN MENU MOBILE (Hiện ra khi bấm nút Danh mục) */}
    <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          
          <div className="mobile-menu-header">
            <h3>Danh Mục Sản Phẩm</h3>
            <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <ul className="mobile-cat-list">
            {categories.map((cat, index) => (
              <li key={index}>
                <Link to={`/category/${index}`} onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="mob-cat-info">
                    <span className="mob-cat-icon">{cat.icon}</span>
                    {cat.name}
                  </div>
                  <FaChevronRight className="arrow-icon" />
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </>
  );
}

export default Navigation;