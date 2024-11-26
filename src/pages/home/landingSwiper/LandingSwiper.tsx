import CardSlider from "./CardSlider";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar"; // Optional, for better vertical scrolling support

import { Autoplay, Pagination, Scrollbar } from "swiper/modules"; // Add Pagination and Scrollbar modules
import { Box } from "@chakra-ui/react";

const LandingSwiper = () => {
  const data = [
    {
      img: `https://res.cloudinary.com/dt9bjjzrd/image/upload/v1732599595/lfsfwqx7p95osdan4fem.jpg`,
      title: "Explore the City, One Ride at a Time",
      sousTitle: "Starting from 2$ per hour",
      text1: "Discover hidden gems and scenic routes ",
      text2: "As you pedal through the heart of the city.",
      id: 1,
    },
    {
      img: `https://res.cloudinary.com/dt9bjjzrd/image/upload/v1732599603/jskdiwpseutew0xjcnzk.jpg`,
      title: "Feel the Wind, Embrace the Ride",
      sousTitle: "Starting from 15$ per day",
      text1: "Experience the thrill of riding with our ",
      text2: "Premium bikes designed for speed and comfort.",
      id: 2,
    },
    {
      img: `https://res.cloudinary.com/dt9bjjzrd/image/upload/v1732599617/slzrriobr6b10rejdk5f.jpg`,
      title: "Unlock the Joy of Riding",
      sousTitle: "Starting from 50$ per month",
      text1: "Elevate your mood and boost your energy",
      text2: "With every ride on our joyful bicycles.",
      id: 3,
    },
  ];

  return (
    <Box height={"100vh"}>
      <Swiper
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        spaceBetween={30}
        modules={[Autoplay, Pagination, Scrollbar]} // Include required modules
        className="mySwiper"
        pagination={{ clickable: true }} // Optional pagination for better control
        scrollbar={{ draggable: true }} // Optional scrollbar for better interaction
      >
        {data.map(({ img, text1, text2, title, sousTitle, id }) => (
          <SwiperSlide key={id}>
            {({ isActive }) =>
              isActive && (
                <CardSlider
                  img={img}
                  text1={text1}
                  text2={text2}
                  title={title}
                  sousTitle={sousTitle}
                ></CardSlider>
              )
            }
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default LandingSwiper;
