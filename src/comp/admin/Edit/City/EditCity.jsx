import { collection, deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../../../firebase/config';
import { Box, Card, CardContent, Container, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function EditCity() {
    const [value, loading, error] = useCollection(
        collection(db, 'cityscape')
    );
    return (
        <Box sx={{ minHeight: 'calc(100vh - 100px)', padding: '70px 0' }}>
            <h2>
                Deals Edit page
            </h2>
            <Container>
                {value &&
                    <Row>
                        {value.docs.map((project, index) => {
                            console.log(project.data())
                            return (
                                <Col className=" col-sm-6 col-12 col-lg-4 col-md-6" style={{ marginBottom: '15px', position: 'relative', maxHeight: '300px' }} key={index}>
                                    <Card sx={{ padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f6f7f7', position: 'relative', overflow: 'initial', gap: 2, height: '100%', }}>
                                        <Stack className='colDev' sx={{ flexDirection: 'row', alignItems: 'center', gap: 2, width: '100%' }}>
                                            <Link to={`/developers/${project.data().devname}`}>
                                                <img className=" img shadow-filter " style={{ width: '60px', height: '60px', borderRadius: '50%' }} src={project.data().icon} alt='' />
                                            </Link>
                                            <Stack>
                                                <Typography sx={{ fontWeight: 'bold' }}>
                                                    {project.data().projectName}
                                                </Typography>
                                                <Typography variant='caption'>
                                                    {project.data().devname}
                                                </Typography>
                                                <Typography variant='caption'>
                                                    {project.data().location}
                                                </Typography>
                                            </Stack>
                                        </Stack>


                                        <Stack sx={{ gap: 2, alignItems: 'center', width: '100%' }}>
                                            <Stack divider={<Divider sx={{ borderColor: 'black', opacity: '1', borderWidth: '1px' }} />} sx={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                                <Stack sx={{ padding: '5px 10px ', alignItems: 'center' }}>
                                                    <Typography sx={{ fontWeight: 'bold', color: '#ff914d', fontSize: '20px' }}>
                                                        {`${project.data().downPayment}%`}
                                                    </Typography>
                                                    <Typography>
                                                        Downpayment
                                                    </Typography>
                                                </Stack>

                                                <Stack sx={{ padding: '5px 10px ', alignItems: 'center' }}>
                                                    <Typography sx={{ fontWeight: 'bold', color: '#ff914d', fontSize: '20px' }}>
                                                        {`${project.data().years} Years`}
                                                    </Typography>
                                                    <Typography>
                                                        Installments
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            {project.data().CashDiscount ?
                                                <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                                                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                                                        Cash Discount
                                                    </Typography>
                                                    <Typography sx={{ fontWeight: 'bold', color: '#ff914d', fontSize: '20px' }}>
                                                        {`${project.data().CashDiscount}%`}
                                                    </Typography>
                                                </Stack>
                                                :
                                                <Typography>
                                                    {project.data().dis}
                                                </Typography>
                                            }
                                        </Stack>
                                        <Divider sx={{ borderColor: 'white', opacity: '1', borderWidth: '1px', width: '100%', borderStyle: 'dashed' }} />
                                        <Stack
                                            sx={{ width: '100%', flexDirection: 'row', gap: 1 }}>

                                        </Stack>
                                        <Stack sx={{ flexDirection: 'row' }}>
                                            <IconButton
                                                onClick={async (e) => {
                                                    await deleteDoc(doc(db, 'cityscape', project.data().id));
                                                    console.log(project.data().id)
                                                }}
                                                sx={{ width: '50px', height: '50px' }}>
                                                <Delete color='error' />
                                            </IconButton>
                                            {/* <Link to={`${project.data().id}`}>
                                                <IconButton sx={{ width: '50px', height: '50px' }}>
                                                    <Edit />
                                                </IconButton>
                                            </Link> */}
                                        </Stack>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                }
            </Container>
        </Box>
    )
}

export default EditCity