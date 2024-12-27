import React, { useRef } from "react";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Banner({ bannerData }) {
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    initialSlide: 0,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const redirectMap = {
    "TIME TABLE": "/timetable",
    "STUDY MATERIALS": "/studymaterial",
    "LIVE CLASSES": "/live",
    "MY EXAM": "/exam",
    "DOCUMENTS": "/document",
    "ASSIGNMENTS": "/assignment",
    "MY PRODUCTS": "/product",
    "EXAM REPORTS": "/report",
  };

  const handleBannerClick = (item) => {
    if (item.is_redir) {
      if (item.red_link) {
        window.open(item.red_link, "_blank");
      } else {
        window.location = redirectMap[item.land_scr];
      }
    }
  };

  return (
    bannerData && (
      <Slider ref={sliderRef} {...settings}>
        {bannerData.map((item) => (
          <img
            src={item.web_url}
            className="bannerImgContainer"
            onClick={() => handleBannerClick(item)}
          />
        ))}
      </Slider>
    )
  );
}
