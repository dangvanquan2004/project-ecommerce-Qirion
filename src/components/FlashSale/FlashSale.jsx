import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios"; // Import axios để gọi API
import { FaBolt, FaFire } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FlashSale.css";

function FlashSale() {
  // 1. STATE QUẢN LÝ DỮ LIỆU & ĐỒNG HỒ
  const [products, setProducts] = useState([]); // Chứa list sản phẩm từ API
  const [loading, setLoading] = useState(true);
  
  const [timeLeft, setTimeLeft] = useState({
    hours: 2, minutes: 59, seconds: 59,
  });

  // 2. GỌI API KHI MOUNT 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/products");
        
        // --- XỬ LÝ DỮ LIỆU (MAPPING) ---
        // Vì API gốc chỉ có name, price, thumbnail. 
        // Ta cần tạo thêm các trường fake cho Flash Sale (giảm giá, đã bán...)
        const mappedData = response.data.map((item) => {
           // Giả lập giảm giá ngẫu nhiên từ 10% - 30%
           const discountPercent = Math.floor(Math.random() * 20) + 10; 
           // Tính giá cũ giả định (Giá hiện tại / (1 - %giảm))
           const fakeOldPrice = item.price / (1 - discountPercent / 100);
           
           return {
             ...item,
             // Nếu backend chưa có các trường này thì dùng giá trị giả lập:
             discount: discountPercent,
             oldPrice: fakeOldPrice, 
             sold: Math.floor(Math.random() * 10), // Random số đã bán
             total: 10 + Math.floor(Math.random() * 10) // Random tổng kho
           };
        });

        setProducts(mappedData);
      } catch (error) {
        console.error("Lỗi gọi API Flash Sale:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 3. LOGIC ĐỒNG HỒ ĐẾM NGƯỢC (Giữ nguyên)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper format
  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  const formatPrice = (price) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  // 4. CẤU HÌNH SLIDER
  const settings = {
    dots: false,
    infinite: products.length > 4, // Chỉ chạy vòng lặp nếu có nhiều hơn 4 sp
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
    ],
  };

  if (loading) return <div style={{textAlign: "center", padding: "20px"}}>Đang tải Flash Sale...</div>;
  if (products.length === 0) return null; // Không có sp thì ẩn luôn section

  return (
    <section className="flash-sale-section">
      <div className="container">
        
        {/* HEADER ĐỎ */}
        <div className="flash-header">
          <div className="flash-title">
            <FaBolt className="bolt-icon" />
            <h2>GIÁ TỐT MỖI NGÀY</h2>
          </div>
          
          <div className="flash-timer">
            <span>Kết thúc sau</span>
            <div className="timer-box">{formatTime(timeLeft.hours)}</div>
            <span className="colon">:</span>
            <div className="timer-box">{formatTime(timeLeft.minutes)}</div>
            <span className="colon">:</span>
            <div className="timer-box">{formatTime(timeLeft.seconds)}</div>
          </div>
          
          <a href="/flash-sale" className="view-all">Xem thêm khuyến mãi &gt;</a>
        </div>

        {/* BODY SLIDER */}
        <div className="flash-body">
          <Slider {...settings}>
            {products.map((p) => (
              <div key={p.id} className="flash-card-wrapper">
                <div className="flash-card">
                  {/* Badge giảm giá */}
                  <div className="discount-badge">-{p.discount}%</div>
                  
                  {/* Ảnh sản phẩm (Dùng p.thumbnail từ API) */}
                  <img src={p.thumbnail} alt={p.name} />
                  
                  <h3 className="prod-name">{p.name}</h3>
                  
                  <div className="price-group">
                    <span className="old-price">{formatPrice(p.oldPrice)}</span>
                    <span className="new-price">{formatPrice(p.price)}</span>
                  </div>

                  {/* Thanh Progress Đã bán */}
                  <div className="sold-progress">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${(p.sold / p.total) * 100}%` }}
                    ></div>
                    <span className="sold-text">
                      <FaFire className="fire-icon" /> 
                      {p.sold >= p.total ? "Vừa hết hàng" : `Đã bán ${p.sold}/${p.total}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </section>
  );
}

export default FlashSale;