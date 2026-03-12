import React from "react";
import { FaFacebookF, FaYoutube, FaInstagram, FaTiktok, FaPaperPlane } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        
        {/* CỘT 1: THÔNG TIN CHUNG */}
        <div className="footer-section">
          <h2 className="footer-logo">QIRION</h2>
          <p className="footer-desc">
            Hệ thống bán lẻ thiết bị công nghệ hàng đầu Việt Nam. 
            Cam kết sản phẩm chính hãng, bảo hành uy tín, dịch vụ tận tâm.
          </p>
          <div className="social-icons">
            <a href="#" className="social-link"><FaFacebookF /></a>
            <a href="#" className="social-link"><FaYoutube /></a>
            <a href="#" className="social-link"><FaInstagram /></a>
            <a href="#" className="social-link"><FaTiktok /></a>
          </div>
        </div>

        {/* CỘT 2: VỀ CHÚNG TÔI */}
        <div className="footer-section">
          <h3>Về Qirion</h3>
          <ul>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Tuyển dụng</a></li>
            <li><a href="#">Tin tức công nghệ</a></li>
            <li><a href="#">Liên hệ hợp tác</a></li>
            <li><a href="#">Hệ thống cửa hàng</a></li>
          </ul>
        </div>

        {/* CỘT 3: HỖ TRỢ KHÁCH HÀNG */}
        <div className="footer-section">
          <h3>Hỗ trợ khách hàng</h3>
          <ul>
            <li><a href="#/tra-cuu-don-hang">Tra cứu đơn hàng</a></li>
            <li><a href="#/chinh-sach-bao-hanh">Chính sách bảo hành</a></li>
            <li><a href="#/chinh-sach-doi-tra">Chính sách đổi trả</a></li>
            <li><a href="#/huong-dan-mua-hang">Hướng dẫn mua hàng</a></li>
            <li><a href="#/giai-quyet-khieu-nai">Giải quyết khiếu nại</a></li>
          </ul>
        </div>

        {/* CỘT 4: ĐĂNG KÝ NHẬN TIN */}
        <div className="footer-section">
          <h3>Đăng ký nhận tin</h3>
          <p className="newsletter-text">Nhận thông tin khuyến mãi mới nhất từ Qirion.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Email của bạn..." required />
            <button type="submit">
              <FaPaperPlane />
            </button>
          </form>
          <div className="payment-methods">
            {/* Bạn có thể thêm ảnh Visa/Mastercard vào đây nếu muốn */}
            <p>Chấp nhận thanh toán:</p>
            <div className="payment-icons">
              <span>💳 Visa</span>
              <span>💳 Momo</span>
              <span>💳 Banking</span>
            </div>
          </div>
        </div>

      </div>

     
    </footer>
  );
}

export default Footer;