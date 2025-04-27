import { Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import MavLoading from '../Loading/MavLoading';
function NewLaunches() {
    const [value, loading, error] = useCollection(collection(db, 'newlaunch'));
    return (
        <section style={{ margin: '25px 0' }}>
            <Container>
                <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>
                            Launches Now
                        </Typography>
                        <Link to='/newlaunches'>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                Explore All
                            </Typography>
                        </Link>
                    </Stack >
                {value &&
                    <Stack >
                        <Swiper
                            spaceBetween={10}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                            }}
                            freeMode={true}
                            loop={true}
                            modules={[FreeMode, Pagination, Autoplay]}
                            className="myLaunchSwiper"
                        >
                            {value.docs.map((item) => {
                                return (
                                    <div key={item}>
                                        {
                                            item.data().img.map((img) => {
                                                return (
                                                    <SwiperSlide key={img} style={{ height: '100%' }}>
                                                        <Link aria-label={item.data().launchName} style={{ width: '393px', height: '225px', }} to={`/newlaunches/${item.data().id}`} >
                                                            <picture >
                                                                <img style={{ borderRadius: '8px' }} src={img} sizes="(min-width: 600px) 50vw, 100vw" alt="Flowers" />
                                                            </picture>
                                                        </Link>
                                                    </SwiperSlide>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })}
                        </Swiper>
                    </Stack>
                }
                {loading &&
                    <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <MavLoading />
                    </Stack>
                }
            </Container>
        </section>
    )
}

export default NewLaunches