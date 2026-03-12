import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "../../pages/Auth/Auth.css"; // 
import "./AuthModal.css";   // CSS cho popup

function AuthModal({ isOpen, onClose, initialIsRegister = false }) {
  // State: false = Đang ở form Đăng nhập, true = Đang ở form Đăng ký
  const [isRegister, setIsRegister] = useState(initialIsRegister);

  // Sync state when modal open logic changes
  React.useEffect(() => {
    if (isOpen) {
      setIsRegister(initialIsRegister);
    }
  }, [isOpen, initialIsRegister]);

  // Các state form
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Mật khẩu nhập lại không khớp!");
        return;
      }
      const isEmailExist = users.some(u => u.email === formData.email);
      if (isEmailExist) {
        toast.error("Email này đã được đăng ký!");
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("Đăng ký thành công! Vui lòng Đăng nhập.");

      // Xóa form và chuyển qua login
      setFormData({ ...formData, password: "", confirmPassword: "" });
      setIsRegister(false);
    } else {
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.dispatchEvent(new Event("loginStateChange"));
        toast.success("Đăng nhập thành công!");
        onClose();
      } else {
        toast.error("Email hoặc mật khẩu không đúng!");
      }
    }
  };

  if (!isOpen) return null; // Nếu không mở thì không render gì cả

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* onClick={e => e.stopPropagation()} để bấm vào khung không bị đóng popup */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* Nút tắt X */}
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        {/* TIÊU ĐỀ THAY ĐỔI THEO TRẠNG THÁI */}
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          {isRegister ? "Đăng Ký Tài Khoản" : "Chào Mừng Trở Lại"}
        </h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "20px", fontSize: "14px" }}>
          {isRegister ? "Điền thông tin để tạo tài khoản mới" : "Vui lòng đăng nhập để tiếp tục"}
        </p>

        <form onSubmit={handleSubmit}>
          {/* NẾU LÀ ĐĂNG KÝ THÌ HIỆN THÊM Ô HỌ TÊN */}
          {isRegister && (
            <div className="form-group">
              <label>Họ và tên</label>
              <input type="text" name="fullName" placeholder="Nguyễn Văn A" value={formData.fullName} onChange={handleChange} required={isRegister} />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="name@gmail.com" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* NẾU LÀ ĐĂNG KÝ THÌ HIỆN THÊM Ô XÁC NHẬN MK */}
          {isRegister && (
            <div className="form-group">
              <label>Nhập lại mật khẩu</label>
              <input type="password" name="confirmPassword" placeholder="Xác nhận mật khẩu" value={formData.confirmPassword} onChange={handleChange} required={isRegister} />
            </div>
          )}

          <button type="submit" className="auth-btn">
            {isRegister ? "Đăng Ký" : "Đăng Nhập"}
          </button>
        </form>

        {/* SOCIAL LOGIN */}
        <div className="divider"><span>- Hoặc -</span></div>
        <div className="social-buttons" style={{ justifyContent: "center", display: "flex", gap: "20px" }}>
          <button className="social-icon-btn google"><FaGoogle /></button>
          <button className="social-icon-btn facebook"><FaFacebookF /></button>
        </div>

        {/* CHUYỂN ĐỔI GIỮA LOGIN VÀ REGISTER */}
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
          {isRegister ? "Bạn đã có tài khoản? " : "Bạn chưa có tài khoản? "}
          <span
            style={{ color: "#2563eb", fontWeight: "bold", cursor: "pointer" }}
            onClick={() => setIsRegister(!isRegister)} // Đảo ngược trạng thái
          >
            {isRegister ? "Đăng nhập ngay" : "Đăng ký ngay"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default AuthModal;