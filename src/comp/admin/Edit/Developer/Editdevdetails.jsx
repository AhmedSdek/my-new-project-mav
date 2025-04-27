import { Box, Button, Card, CardContent, IconButton, Stack, TextField, Typography } from '@mui/material'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom'
import { db } from '../../../../firebase/config';
import { Col } from 'react-bootstrap';
import { Delete, Edit } from '@mui/icons-material';
import ReactLoading from 'react-loading';

function Editdevdetails() {
    const { editDeveloperId } = useParams()
    const [value, loading, error] = useDocument(doc(db, 'admin', editDeveloperId));
    const [btn, setBtn] = useState(false);
    const [devDis, setDevDis] = React.useState('');
    const [devDis2, setDevDis2] = React.useState('');
    const [devDis6, setDevDis6] = React.useState('');
    const handleDevDisChange = (event) => {
        setDevDis(event.target.value);
    };
    const handleDevDis2Change = (event) => {
        setDevDis2(event.target.value);
    };
    const handleDevDis6Change = (event) => {
        setDevDis6(event.target.value);
    };
    if (value) {
        function data1() {
            setDevDis(value.data().devDis);
        }
        function data2() {
            setDevDis2(value.data().devDis2);
        }
        function data3() {
            setDevDis6(value.data().devDis6);
        }
        const sendData = async () => {
            setBtn(true);
            try {
                await updateDoc(doc(db, 'admin', value.data().devName), {
                    devDis: devDis,
                    devDis2: devDis2,
                    devDis6: devDis6
                });
            } catch (er) {
                console.log(er)
            }
            setBtn(false)
        }
        return (
            <Box
                sx={{ minHeight: 'calc(100vh - 140px)', padding: '70px 0' }}>
                Editdevdetails
                <Stack component='form'
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendData();
                    }}>
                    <TextField
                        id="outlined-multiline-static"
                        label=" Description"
                        value={devDis}
                        multiline
                        onFocus={() => data1()}
                        rows={4}
                        sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                        onChange={(e) => {
                            handleDevDisChange(e)
                        }}
                    />
                    <TextField
                        id="outlined-multiline-static2"
                        label=" Description bold"
                        // defaultValue={value.data().devDis2}
                        value={devDis2}
                        onFocus={() => data2()}
                        rows={4}
                        sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                        onChange={(e) => {
                            handleDevDis2Change(e)
                        }}
                    />
                    <TextField
                        id="outlined-multiline-static3"
                        label="Dev Description list"
                        multiline
                        // defaultValue={value.data().devDis6}
                        value={devDis6}
                        onFocus={() => data3()}
                        rows={4}
                        sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                        onChange={(e) => {
                            handleDevDis6Change(e)
                        }}
                    />
                    <Button disabled={btn} variant="contained" type="submit" style={{ width: '50%' }}
                        className="btn">
                        {btn ? <ReactLoading type={'spin'} height={'20px'} width={'20px'} /> : "Update"}
                    </Button>
                </Stack>
                {value.data().dev.map((project, index) => {
                    return (
                        <Col key={index} className="col-md-6 col-12 col-lg-4" style={{ margin: '15px', position: 'relative' }} >
                            <Card sx={{ position: 'relative' }}>
                                <Box sx={{ height: '216px' }}>
                                    <img style={{ height: '100%', width: '100%', objectFit: 'cover' }} src={project.projImgs[0]} alt='' />
                                </Box>
                                <CardContent>
                                    <Stack sx={{ marginBottom: '10px' }}>
                                        <Typography sx={{ lineHeight: '1.3', fontWeight: 'bold', color: 'rgb(30, 65, 100)' }} variant="body1">
                                            {project.proj}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: " rgb(100, 100, 100) ", lineHeight: '1', padding: '0 0 0 5px' }}>
                                            {project.Location}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                                <Stack sx={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <IconButton x={{ width: '50px', height: '50px' }} onClick={async () => {
                                        await updateDoc(doc(db, 'admin', value.data().devName), {
                                            dev: arrayRemove(project)
                                        });
                                    }}>
                                        <Delete color='error' />
                                    </IconButton>
                                </Stack>
                            </Card>
                        </Col>
                    )
                })}
            </Box>
        )

    }
}

export default Editdevdetails