import { Box, Button, Container, IconButton, Stack } from '@mui/material'
import { collection, deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useCollection } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom'
import { db } from '../../../../firebase/config';
import { Delete, Edit } from '@mui/icons-material';

function EditDeveloper() {
    const [value, loading, error] = useCollection(collection(db, 'admin'));

    return (
        <Box sx={{ minHeight: 'calc(100vh - 140px)', padding: '70px 0' }}>
            <h2>
                Developer Edit page
            </h2>
            <Container>
                {value &&
                    <Stack style={{ gap: 2, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: '30px 0' }}>
                        {value.docs.map((product) => {
                            return (
                                <Stack key={product.id} className="col-xl-2 col-sm-3 col-6" style={{ backgroundColor: 'rgb(228 228 228)', justifyContent: 'center', alignItems: 'center' }}>
                                    <Box style={{ height: '118px !important ', width: '118px', padding: '5px 0 0 0', borderRadius: '50%' }} className="logo hoveredLogo d-flex align-items-center flex-column  inner" >
                                        <img style={{ height: '118px !important ', width: '118px' }} className="img-fluid img shadow-filter rounded-circle" src={product.data().devIcon} alt="Mountain View"></img>
                                    </Box>
                                    <Stack sx={{ flexDirection: 'row' }}>
                                        <IconButton
                                            onClick={async (e) => {
                                                await deleteDoc(doc(db, 'admin', product.data().devName));
                                            }}
                                            sx={{ width: '50px', height: '50px' }}>
                                            <Delete color='error' />
                                        </IconButton>
                                        <Link to={`${product.data().devName}`} >
                                            <IconButton sx={{ width: '50px', height: '50px' }}>
                                                <Edit />
                                            </IconButton>
                                        </Link>
                                    </Stack>
                                </Stack>
                            )
                        })}
                    </Stack>
                }
            </Container>
        </Box>
    )
}

export default EditDeveloper