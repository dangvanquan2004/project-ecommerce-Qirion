import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";

function Banner() {
  // 1. CẤU HÌNH CHO BANNER LỚN (CHẠY 1 ẢNH)
  const settingsMain = {
    dots: true,           // Hiện chấm tròn bên dưới
    infinite: true,       // Chạy vòng lặp vô tận
    speed: 500,           // Tốc độ chuyển ảnh
    slidesToShow: 1,      // Hiện 1 ảnh
    slidesToScroll: 1,
    autoplay: true,       // Tự động chạy
    autoplaySpeed: 3000,  // 3 giây chuyển 1 lần
  };

  // 2. CẤU HÌNH CHO SLIDE NHỎ BÊN DƯỚI (CHẠY 3 ẢNH)
  const settingsSub = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,      // Hiện 3 ảnh nhỏ cùng lúc
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [         // Tự chỉnh khi màn hình nhỏ
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };


  const bigBanners = [
    { id: 1, img: "bannerloq.jpg", link: "/promotion/tet-sale" },
    { id: 2, img: "747x350MSI.jpg", link: "/laptop-gaming" },
  ];

  const subBanners = [
    { id: 1, title: "PC Văn Phòng", img: "pc.jpg", link: "/pc-van-phong" },
    { id: 2, title: "Lì Xì Đầu Năm", img: "MSIModern15747x350.jpg", link: "/khuyen-mai" },
    { id: 3, title: "Màn Hình Giá Rẻ", img: "aususvivobook.jpg", link: "/man-hinh" },
    { id: 4, title: "Laptop Sinh Viên", img: "PmaxAsusTuf2025747x350.jpg", link: "/laptop" },
  ];

  return (
    <section className="banner-section">
      <div className="container banner-container">

        {/* --- PHẦN 1: BANNER LỚN (MAIN) --- */}
        <div className="main-slider">
          <Slider {...settingsMain}>
            {bigBanners.map((banner) => (
              <div key={banner.id} className="slide-item">
                <Link to={banner.link}>
                  <img src={banner.img} alt="Banner QC" className="main-banner-img" />
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        {/* --- PHẦN 2: BANNER NHỎ TRƯỢT (SUB) --- */}
        <div className="sub-slider">
          <Slider {...settingsSub}>
            {subBanners.map((banner) => (
              <div key={banner.id} className="sub-slide-item">
                <Link to={banner.link}>
                  <img src={banner.img} alt={banner.title} className="sub-banner-img" />
                </Link>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </section>
  );
}

export default Banner;