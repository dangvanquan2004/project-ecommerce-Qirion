import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa"; // Nhớ cài react-icons
import { toast } from "react-toastify";
import "./Auth.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // State quản lý việc hiện/ẩn mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Đăng nhập thành công, lưu thông tin user hiện tại
      localStorage.setItem("currentUser", JSON.stringify(user));
      // Bắn event để các component khác (như Header) biết state đã đổi
      window.dispatchEvent(new Event("loginStateChange"));
      toast.success("Đăng nhập thành công!");
      navigate("/"); // Chuyển về trang chủ
    } else {
      toast.error("Email hoặc mật khẩu không đúng!");
    }
  };

  const handleSocialLogin = (provider) => {
    console.log("Đăng nhập bằng:", provider);
    // Sau này sẽ nối API login Google/Facebook ở đây
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Chào mừng trở lại!</h2>
        <p className="auth-desc">Vui lòng đăng nhập để tiếp tục.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="name@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            {/* Wrapper giúp định vị icon mắt */}
            <div className="password-input-wrapper">
              <input 
                /* Logic đổi type: text <-> password */
                type={showPassword ? "text" : "password"} 
                placeholder="Nhập mật khẩu" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              {/* Nút bấm con mắt */}
              <span 
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div style={{textAlign: "right", marginBottom: "20px", fontSize: "13px"}}>
            <Link to="/forgot-password" style={{color: "#2563eb", textDecoration: "none"}}>
              Quên mật khẩu?
            </Link>
          </div>

          <button type="submit" className="auth-btn">Đăng nhập</button>
        </form>

        {/* --- PHẦN LOGIN SOCIAL --- */}
        <div className="divider">
          <span>Hoặc đăng nhập với</span>
        </div>

        <div className="social-buttons">
          <button className="social-icon-btn google" onClick={() => handleSocialLogin('Google')}>
            <FaGoogle /> 
           
          </button>
          
          <button className="social-icon-btn facebook" onClick={() => handleSocialLogin('Facebook')}>
            <FaFacebookF />
         
          </button>
        </div>
        {/* ------------------------- */}

        <p className="auth-link">
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;