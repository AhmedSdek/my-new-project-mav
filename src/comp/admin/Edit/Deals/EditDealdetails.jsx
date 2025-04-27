import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack } from '@mui/material'
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../../../firebase/config';
import { useNavigate, useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { data } from '../../../Data';
import MavLoading from '../../../Loading/MavLoading';

function EditDealdetails() {
    const { editeDealdetailsId } = useParams()
    const [value, loading, error] = useDocument(doc(db, 'Resell', editeDealdetailsId));
    const [sold, setSold] = React.useState('');
    const [sell, setSell] = React.useState('');
    const [devname, setDevname] = React.useState('');
    const [delivery, setDelivery] = React.useState('');
    const [finsh, setFinsh] = React.useState('');
    const [btn, setBtn] = useState(false);


    const handleDeliveryChange = (event) => {
        setDelivery(event.target.value);
    };
    const handleFinshChange = (event) => {
        setFinsh(event.target.value);
    };
    const nav = useNavigate()

    if (value) {



        const sendData = async () => {
            setBtn(true);
            try {
                await updateDoc(doc(db, 'Resell', editeDealdetailsId), {
                    sold: sold,
                    Sale: sell,
                    delivery: delivery,
                    Finsh: finsh,
                    devname: devname
                });
                nav('/')
            } catch (er) {
                console.log(er)
            }
            setBtn(false)
        }

        return (
            <Box sx={{ minHeight: 'calc(100vh - 100px)', padding: '70px 0' }}>
                EditDealdetails
                <Stack component='form'
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (sold !== '' && sell !== '' && delivery !== '' && finsh !== '' && devname !== '') {
                            sendData();
                        }
                    }}>
                    <Stack sx={{ flexDirection: 'row', width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="sold-label">Sold</InputLabel>
                            <Select
                                sx={{ minWidth: 'fit-content' }}
                                labelId="soldlap"
                                id="demo-sold"
                                value={sold}
                                label="SOLD OUT"
                                onChange={(e) => {
                                    setSold(e.target.value);
                                }}
                            >
                                <MenuItem value={'SOLD OUT'}>SOLD OUT</MenuItem>
                                <MenuItem value={'Not'}>Not</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack sx={{ flexDirection: 'row', width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="sold-label">Resale</InputLabel>
                            <Select
                                sx={{ minWidth: 'fit-content' }}
                                labelId="soldlap"
                                id="demo-sold"
                                value={sell}
                                label="SOLD OUT"
                                onChange={(e) => {
                                    setSell(e.target.value)
                                }}
                            >
                                <MenuItem value={'Resale'}>Resale</MenuItem>
                                <MenuItem value={'Rent'}>Rent</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack sx={{ flexDirection: 'row', width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-label">Delivery</InputLabel>
                            <Select
                                sx={{ minWidth: 'fit-content' }}
                                labelId="Delivery"
                                id="Delivery-select"
                                value={delivery}
                                label="Delivery"
                                onChange={handleDeliveryChange}
                            >
                                <MenuItem value='Delivered'>Delivered</MenuItem>
                                <MenuItem value="Rtm">Rtm</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                                <MenuItem value="2025">2025</MenuItem>
                                <MenuItem value="2026">2026</MenuItem>
                                <MenuItem value="2027">2027</MenuItem>
                                <MenuItem value="2028">2028</MenuItem>
                                <MenuItem value="2029">2029</MenuItem>
                                <MenuItem value="2030">2030</MenuItem>
                                <MenuItem value="2031">2031</MenuItem>
                                <MenuItem value="2032">2032</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>

                    <FormControl sx={{ width: { xs: '100%', md: '50%' }, padding: '5px' }} >
                        <FormLabel required id="demo-row-radio-buttons-group-label">Finishing</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            itemProp='required'
                            name="row-radio-buttons-group"
                            value={finsh}
                            onChange={(e) => {
                                handleFinshChange(e);
                            }}
                        >
                            <FormControlLabel value="Finished" control={<Radio />} label="Finished" />
                            <FormControlLabel value="Semi Finished" control={<Radio />} label="Semi Finished" />
                            <FormControlLabel value="Cor & Shell" control={<Radio />} label="Cor & Shell" />
                            <FormControlLabel value="Furnished" control={<Radio />} label="Furnished" />
                        </RadioGroup>
                    </FormControl>
                    <Stack sx={{ flexDirection: 'row', width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-label">DevName</InputLabel>
                            <Select
                                sx={{ minWidth: 'fit-content' }}
                                labelId="ddevname"
                                id="name"
                                value={devname}
                                label="DevName"
                                onChange={(e) => {
                                    setDevname(e.target.value);
                                }}
                            >
                                {data.map((devName) => {
                                    return (
                                        <MenuItem key={devName.id} value={devName.name}>{devName.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Button disabled={btn} variant="contained" type="submit" style={{ width: '50%' }}
                        className="btn">
                        {btn ? <ReactLoading type={'spin'} height={'20px'} width={'20px'} /> : "Update"}
                    </Button>
                </Stack>
            </Box>
        )
    }
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <MavLoading />
            </div>
        )
    }
}

export default EditDealdetails