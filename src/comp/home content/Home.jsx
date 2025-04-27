import Slider from './slider/Slider';
import './home.css';
import NewLaunches from '../New Launches/NewLaunches';
import HomeForm from './Home Form/HomeForm';
import SahelMap from './sahel map/SahelMap';
import Calc from './Calc/Calc';
import HomeDeals from '../deals/HomeDeals';
import { Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import HomePup from './HomePup/HomePup';
import im from './im.png'
import im2 from './im2.jpg'
import CityscapeHome from './cityscape/CityscapeHome';
import SearchCom from './SearchCom';
function Home() {
    const [pup, setPup] = useState(0);
    const nav = useNavigate()
    useEffect(() => {
        setPup(1)
    }, []);
    return (
        <div >
            <Box component='header' sx={{ position: 'relative', backgroundColor: 'white', backgroundImage: { xs: `url(${im2})`, md: `url(${im})` } }} className='home-header'>
                <div className='header-main' style={{ textAlign: 'start', width: '40%', margin: '35px auto 0 ' }}>
                    <h1 className='hed1' style={{ color: 'white', lineHeight: '1.8', width: 'fit-content' }}>
                        <mark style={{ backgroundColor: 'rgb(255 145 77 / 87%)', borderRadius: '6px', fontWeight: 'bold', color: '#1e4164', }}>
                            Let us
                        </mark>
                    </h1>
                    <h2 className='hed2' style={{ color: 'white', fontWeight: 'bold', margin: '0', fontSize: '40px' }}>
                        Help You To Make
                    </h2>
                    <h2 className='hed3' style={{ textAlign: 'end', fontWeight: 'bold', color: 'white', margin: '5px 0  0 0', fontSize: '40px' }}>
                        The Move
                    </h2>
                    <SearchCom />
                </div>
            </Box>
            <SahelMap />
            <CityscapeHome />
            <NewLaunches />
            <Slider />
            <HomeDeals />
            <Stack sx={{ marginBottom: '15px' }}>
                <HomeForm hedText='Need Expert Advice ?' text2='Fill out the form and one of our property consultants will contact you.' Alert='Thank you. I will get back to you as soon as possible.' />
            </Stack>
            <Calc />
            {/* <HomePup pup={pup} setPup={setPup} /> */}
        </div>
    )
}
export default Home;