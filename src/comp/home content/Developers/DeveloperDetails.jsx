import { doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../../firebase/config';
import { Link, useParams } from 'react-router-dom';
import { Box, Card, CardContent, Container, Divider, Stack, Typography } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import ContactUsIcon from '../../Contact Us/ContactUsIcon';
import MavLoading from '../../Loading/MavLoading';

export default function DeveloperDetails() {
    const { devId } = useParams()
    const [value, loading, error] = useDocument(doc(db, 'admin', devId));
    let disfiter = [];
    let list = [];
    if (value) {
      
        if (value.data()) {
            const disdata = value.data().devDis.split('$')
            for (let i = 0; i < disdata.length; i++) {
                disfiter = [...disfiter, disdata[i]]
            }
            const ul = value.data().devDis6.split('-')
            for (let i = 1; i < ul.length; i++) {
                list = [...list, ul[i]]
            }
        }

        return (
            <Box sx={{ padding: '80px 0 0 0', minHeight: 'calc(100vh - 100px)' }}>
                {value.data() ?
                <Container  >
                        <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', gap: 3 }}>
                        <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <img style={{ width: '70px', boxShadow: '0 -1px 15px -3px rgba(0, 0, 0, 0.2)', borderRadius: '50%', height: '70px' }} src={value.data().devIcon} alt='' />
                            <Typography sx={{ fontWeight: 'bold', color: '#1e4164 ' }} variant='h5' component='h2'>
                                {value.data().devName}
                            </Typography>
                        </Stack>
                        <span className="text-2" data-test="entity-type">Developer</span>
                    </Stack>
                    <Divider />
                    <Box sx={{ padding: '50px 0 0 0' }}>
                        <Typography sx={{ fontWeight: 'bold', color: '#1e4164 ', padding: '10px 0' }} >
                            {`About ${value.data().devName}`}
                        </Typography>
                            {/* {disfiter.map((p, index) => {
                                return (
                                    <Typography key={index}>
                                        {p}
                                    </Typography>
                                )
                            })} */}
                              {
                      <Typography style={{ whiteSpace: "pre-wrap" }}>
                        {value.data().devDis}
                      </Typography>
                    }
                            <Typography sx={{ fontWeight: 'bold', color: '#1e4164 ', padding: '10px 0' }}>
                            {value.data().devDis2}
                            </Typography>
                        <ul>
                            {list.map((li) => {
                                return (
                                    <li key={li}>
                                        {li}
                                    </li>
                                )
                            })}
                        </ul>
                        <Stack>
                            <Typography sx={{ padding: '10px 0', fontWeight: 'bold', color: '#1e4164 ' }} >
                                {`Explore projects In ${value.data().devName}`}
                            </Typography>
                            <Row>
                                {value.data().dev.map((project, index) => {
                                    return (
                                        <Col key={index} className="col-md-6 col-12 col-lg-4" style={{ marginBottom: '15px', position: 'relative' }} >
                                            <Card sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <Link to={`/developers/${devId}/${project.proj}`} style={{ textDecoration: 'none' }}>
                                                    <Box sx={{ height: '216px' }}>
                                                        <img style={{ height: '100%', width: '100%', objectFit: 'cover' }} src={project.projImgs[0]} alt='' />
                                                    </Box>
                                                    <CardContent style={{ padding: '15px 15px 0 15px' }}>
                                                        <Stack sx={{}}>
                                                            <Typography sx={{ lineHeight: '1.3', fontWeight: 'bold', color: 'rgb(30, 65, 100)' }} variant="body1">
                                                                {project.proj}
                                                            </Typography>
                                                            <Typography variant="caption" sx={{ color: " rgb(100, 100, 100) ", lineHeight: '1', padding: '0 0 0 5px' }}>
                                                                {project.Location}
                                                            </Typography>
                                                        </Stack>
                                                        {/* <Typography sx={{ fontWeight: 'bold' }}>
                                                            {`${project.price} EGP`}
                                                        </Typography> */}
                                                    </CardContent>
                                                </Link >
                                                <Stack sx={{ padding: '0 10px 10px 0' }}>
                                                    <ContactUsIcon sectionName='Developer' sectionData={value.data()} />
                                                </Stack>
                                            </Card>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Stack>
                    </Box>

                </Container>
                    :
                    <Stack sx={{ height: 'calc(100vh - 100px)', justifyContent: 'center' }}>
                        <Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                            Oops, Data not Found
                        </Typography>
                    </Stack>
                }
            </Box>
        )
    }
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 100px)' }}>
                <MavLoading />
            </div>
        )
    }
}
