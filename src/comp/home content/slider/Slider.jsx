import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slider.css";

// import required modules
import { useCollection } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { collection } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { Container, Stack, Typography } from '@mui/material';

export default function Slider() {
  const [value, loading, error] = useCollection(collection(db, 'admin'));
  if (value) {

    return (

      <section className='slider-section'>
        <Container>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 'bold' }}>
              Developers
            </Typography>
            <Link to='/developers'>
              <Typography sx={{ fontWeight: 'bold' }}>
                Explore All
              </Typography>
            </Link>
          </Stack >
          <Swiper
            slidesPerView={7}
            // spaceBetween={30}
            freeMode={true}
            // pagination={{
            //   clickable: true,
            //   dynamicBullets: true
            // }}
            style={{ margin: '20px 0' }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}

            modules={[Autoplay, Pagination, Navigation, FreeMode]}
            className="mySwiper1"
            breakpoints={{
              200: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 20,
              },
              // when window width is >= 480px
              767: {
                slidesPerView: 5,
                slidesPerGroup: 1,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 6,
                slidesPerGroup: 1,
                spaceBetween: 20
              },
              1200: {
                slidesPerView: 8,
                slidesPerGroup: 1,
                spaceBetween: 20
              },
              1400: {
                slidesPerView: 8,
                spaceBetween: 20
              }
            }}
          >

            {value.docs.map((item, index) => {
              return (
                <SwiperSlide className='swiper-slide1' key={index} style={{ borderRadius: '50%' }} >
                  <Link style={{ width: '126px', height: '126px ' }} aria-label={item.data().devName} to={`/developers/${item.data().devName}`} >
                    <img className='slidImg sm-shadow w-shadow mx-auto img-fluid bg-white rounded-circle p-md-2 p-1 img-fluid  ' style={{ borderRadius: '50%' }} src={item.data().devIcon} alt=''></img>
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper> 
        </Container>
    </section>
    )
  }
}
