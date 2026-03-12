import React from "react";
import "./ProductCard.css";

function ProductCard({ title, price, img }) {
  // Hàm định dạng tiền tệ (Ví dụ: 25.000.000 VNĐ)
  const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <div className="product-card">
      {/* 1. Xử lý ảnh: Nếu không có ảnh từ DB thì hiện ảnh mặc định */}
      <img 
        className="product-img" 
        src={img || "/mouse.jpg"} 
        alt={title} 
      />

      <h4>{title}</h4>
      
      {/* 2. Hiển thị giá theo định dạng VNĐ thay vì $ */}
      <p className="price">{formatPrice(price)}</p>

      <button className="add-btn">Add to cart</button>
    </div>
  );
}

export default ProductCard;