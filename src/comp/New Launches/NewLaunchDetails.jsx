import { Box, Container, Stack, Typography } from '@mui/material'
import { doc } from 'firebase/firestore';
import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/config';
import { Link, useParams } from 'react-router-dom';
import ContactUsBtn from '../Contact Us/ContactUsBtn';
import MavLoading from '../Loading/MavLoading';
import ReactMarkdown from "react-markdown";

function NewLaunchDetails() {
  const { launchId } = useParams()
  const [value, loading, error] = useDocument(doc(db, 'newlaunch', launchId));
  if (error) {
    return (
      <>
        <h1>
          err
        </h1>
      </>
    )
  }
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 100px)' }}>
        <MavLoading />
      </div>
    )
  }

  if (value) {
    console.log(value.data())
    return (
      <Box sx={{ minHeight: '100vh', padding: { xs: '70px 0 0', sm: '70px 0 0', md: '110px 0 0', } }}>
        <Container>
          <Stack sx={{ height: { md: '400px', sm: '300px' }, borderRadius: '10px', overflow: 'hidden' }}>
            {!value.data().video ? <img style={{ width: '100%', height: '100%' }} src={value.data().img[0]} alt='' /> :
              <video autoPlay style={{ width: '100%', height: '100%' }} controls src={value.data().video} type="video/mp4" />
            }
          </Stack>
          <Stack sx={{ flexDirection: { sm: 'column', md: 'row' }, gap: 4, marginTop: '30px', alignItems: 'center' }}>
            <Stack>
              <Link to={`/developers/${value.data().devname}`} style={{ borderRadius: '50%' }} >
                <img style={{ width: '100px', boxShadow: '0 -1px 15px -3px rgba(0, 0, 0, 0.2)', borderRadius: '50%' }} src={value.data().icon} alt='' />
              </Link>
            </Stack>
            <Stack sx={{ width: '100%' }}>
              <Stack sx={{ justifyContent: 'center', alignItems: { xs: 'center', md: 'initial' } }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  {value.data().launchName}
                </Typography>
              </Stack>
              <Stack sx={{ flexDirection: { sm: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack sx={{ justifyContent: 'center', alignItems: { xs: 'center', md: 'initial' } }}>
                  <Typography variant='caption' sx={{ fontWeight: 'bold' }}>
                    {value.data().devname}
                  </Typography>
                  <Typography variant='caption'>
                    {value.data().Location}
                  </Typography>
                  {value.data().price &&
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                      {` ${value.data().price} EGP `}
                      <span style={{ fontWeight: 'normal', fontSize: '14px' }}>
                        Start Price
                      </span>
                    </Typography>
                  }
                </Stack>
                <Stack>
                  <ContactUsBtn sectionName='New-Launch' sectionData={value.data()} />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <hr />
          <Stack sx={{ marginTop: '40px' }}>
            <Typography variant='h5' sx={{ fontWeight: 'bold', padding: '0 0 10px 0' }}>
              Launch Details
            </Typography>
            <ReactMarkdown>{value.data().Dis}</ReactMarkdown>
          </Stack>
        </Container>
      </Box>
    )

  }
}

export default NewLaunchDetails