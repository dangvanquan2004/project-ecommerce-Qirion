import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "./Auth.css";

function RegisterPage() {
  // State lưu thông tin nhập liệu
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // State để quản lý việc ẩn/hiện mật khẩu cho 2 ô riêng biệt
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Hàm xử lý khi nhập liệu
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }

    // Lấy danh sách users từ localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra email đã tồn tại chưa
    const isEmailExist = users.some(u => u.email === formData.email);
    if (isEmailExist) {
      toast.error("Email này đã được đăng ký!");
      return;
    }

    // Thêm user mới
    const newUser = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Đăng ký thành công! Đang chuyển hướng...");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    console.log("Đăng ký bằng:", provider);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Tạo tài khoản mới</h2>
        <p className="auth-desc">Trở thành thành viên của Qirion ngay hôm nay.</p>

        <form onSubmit={handleSubmit}>
          {/* HỌ TÊN */}
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              name="fullName"
              placeholder="Nguyễn Văn A"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="name@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* MẬT KHẨU */}
          <div className="form-group">
            <label>Mật khẩu</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Tối thiểu 6 ký tự"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* NHẬP LẠI MẬT KHẨU */}
          <div className="form-group">
            <label>Nhập lại mật khẩu</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="auth-btn">Đăng ký</button>
        </form>

        {/* --- PHẦN LOGIN SOCIAL (Đã đồng bộ nút tròn) --- */}
        <div className="divider">
          <span> Hoặc đăng ký bằng </span>
        </div>

        <div className="social-buttons">
          <button className="social-icon-btn google" onClick={() => handleSocialLogin('Google')}>
            <FaGoogle />
          </button>

          <button className="social-icon-btn facebook" onClick={() => handleSocialLogin('Facebook')}>
            <FaFacebookF />
          </button>
        </div>
        {/* ----------------------------------------------- */}

        <p className="auth-link">
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;