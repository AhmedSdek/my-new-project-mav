import { collection, deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../../../firebase/config';
import { Box, Card, CardContent, IconButton, Stack, Typography } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';

function Editluanches() {
    const [value, loading, error] = useCollection(collection(db, 'newlaunch'));
    if (value) {
        return (
            <Box sx={{ minHeight: 'calc(100vh - 140px)', padding: '70px 0' }}>Editluanches
                <Row>
                    {
                        value.docs.map((itm, index) => {
                            console.log(itm.data())
                            return (
                                <Col key={index} className="col-md-6 col-12 col-lg-4" style={{ marginBottom: '15px', position: 'relative' }} >
                                    <Card sx={{ position: 'relative', height: '100%' }}>
                                        <Box sx={{ height: '216px' }}>
                                            <img style={{ height: '100%', width: '100%' }} src={itm.data().img[0]} alt='' />
                                        </Box>
                                        <CardContent>
                                            <Stack sx={{ marginBottom: '10px' }}>
                                                <Typography sx={{ lineHeight: '1.3', fontWeight: 'bold', color: 'rgb(30, 65, 100)' }} variant="body1">
                                                    {itm.data().launchName}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: " rgb(100, 100, 100) ", lineHeight: '1', padding: '0 0 0 5px' }}>
                                                    {itm.data().Location}
                                                </Typography>
                                            </Stack>
                                            {itm.data().price &&
                                                <Typography sx={{ fontWeight: 'bold' }}>
                                                    {`${itm.data().price} EGP`}
                                                </Typography>
                                            }
                                        </CardContent>
                                        <Stack sx={{ flexDirection: 'row' }}>
                                            <IconButton
                                                onClick={async (e) => {
                                                    await deleteDoc(doc(db, 'newlaunch', `${itm.data().id}`));
                                                }}
                                                sx={{ width: '50px', height: '50px' }}>
                                                <Delete color='error' />
                                            </IconButton>
                                            <Link to={`${itm.data().id}`}>
                                                <IconButton sx={{ width: '50px', height: '50px' }}>
                                                    <Edit />
                                                </IconButton>
                                            </Link>
                                        </Stack>
                                    </Card>
                                </Col>

                            )
                        })
                    }
                </Row>
            </Box>

        )

    }
}

export default Editluanches