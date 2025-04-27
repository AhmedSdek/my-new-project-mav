import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, FormControl, FormControlLabel, FormLabel, InputLabel, LinearProgress, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography, styled } from '@mui/material';
import ReactLoading from 'react-loading';
import 'react-phone-input-2/lib/style.css'
import { AddPhotoAlternate, Info } from '@mui/icons-material';
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../../firebase/config';
import { data } from '../../Data';
function Cityscape() {
    const [messege, setMessege] = React.useState(false);
    const nav = useNavigate()
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const [btn, setBtn] = useState(false);
    const [devname, setDevname] = React.useState('');
    const [projectName, setProjectName] = React.useState('')
    const [pers1, setPers1] = React.useState('');
    const [pers2, setPers2] = React.useState('');
    const [pers3, setPers3] = React.useState('');
    const [pers4, setPers4] = React.useState('');
    const [offerText1, setOfferText1] = React.useState('');
    const [offerText2, setOfferText2] = React.useState('');
    const [offerText3, setOfferText3] = React.useState('');
    const [offerText4, setOfferText4] = React.useState('');
    const [year1, setYear1] = React.useState('');
    const [year2, setYear2] = React.useState('');
    const [year3, setYear3] = React.useState('');
    const [year4, setYear4] = React.useState('');
    const [downPayment, setDownPayment] = React.useState('');

    const [years, setYears] = React.useState('');

    const [location, setLocation] = React.useState('');

    const [prog, setProg] = useState(0)

    const [url, setUrl] = useState([]);

    const [icon, setIcon] = useState('')
    const [dis, setDis] = React.useState('');

    const [cashDiscount, setCashDiscount] = useState('')

    const handleCashDiscountChange = (event) => {
        setCashDiscount(event.target.value);
    };
    const handleDisChange = (event) => {
        setDis(event.target.value);
    };
    const handledownPaymentChange = (event) => {
        setDownPayment(event.target.value);
    };

    const handleYearsChange = (event) => {
        setYears(event.target.value);
    };
    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };
    const handlePers1Change = (event) => {
        setPers1(event.target.value);
    };
    const handlePers2Change = (event) => {
        setPers2(event.target.value);
    };
    const handlePers3Change = (event) => {
        setPers3(event.target.value);
    };
    const handlePers4Change = (event) => {
        setPers4(event.target.value);
    };
    const handleYear1Change = (event) => {
        setYear1(event.target.value);
    };
    const handleYear2Change = (event) => {
        setYear2(event.target.value);
    };
    const handleYear3Change = (event) => {
        setYear3(event.target.value);
    };
    const handleYear4Change = (event) => {
        setYear4(event.target.value);
    };
    const handleOfferText1Change = (event) => {
        setOfferText1(event.target.value);
    };
    const handleOfferText2Change = (event) => {
        setOfferText2(event.target.value);
    };
    const handleOfferText3Change = (event) => {
        setOfferText3(event.target.value);
    };
    const handleOfferText4Change = (event) => {
        setOfferText4(event.target.value);
    };


    const handlelocationChange = (event) => {
        setLocation(event.target.value);
    };


    const handleFileChange = async (event) => {
        for (let i = 0; i < event.target.files.length; i++) {
            console.log(event.target.files.length)
            // console.log(i)
            const storageRef = ref(storage, event.target.files[i].name);
            const uploadTask = uploadBytesResumable(storageRef, event.target.files[i]);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log('Upload is ' + progress + '% done');
                    setProg(progress);
                    if (i < event.target.files.length) {
                        setBtn(true)
                    }
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        setUrl((old) => [...old, downloadURL]);
                        setBtn(false)
                        // Add a new document in collection "cities"
                    });
                }
            );
        }
    };
    const sendData = async () => {
        setBtn(true)
        try {
            const id = new Date().getTime()
            await setDoc(doc(db, 'cityscape', `${id}`), {
                id: `${id}`,
                projectName: projectName,
                icon: icon,
                downPayment: downPayment,
                img: url,
                devname: devname,
                years: years,
                CashDiscount: cashDiscount,
                location: location,
                dis: dis,
                pers1: pers1,
                // pers2: pers2,
                // pers3: pers3,
                // pers4: pers4,
                offer1: offerText1,
                // offer2: offerText2,
                // offer3: offerText3,
                // offer4: offerText4,
                year1: year1,
                // year2: year2,
                // year3: year3,
                // year4: year4,

            });
        } catch (er) {
        }
        setBtn(false)
    }
    return (
        <>
            <Box style={{ width: '100%', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '70px 0 0' }}>
                <Stack sx={{ alignItems: 'center', marginBottom: '10px' }}>
                    <Typography variant='h5'>
                        cityscape
                    </Typography>
                </Stack>
                <Card sx={{ width: { xs: '90%', sm: '80%' }, display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '20px', margin: '10px 0 ' }}>
                    <Box component='form'
                        onSubmit={async (e) => {
                            e.preventDefault();
                            sendData();
                            setMessege(true);
                            setTimeout(() => {
                                setMessege(false)
                                nav('/')
                            }, 2000);
                        }}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', margin: '15px 0 0' }}>


                        <Stack sx={{ flexDirection: 'row', width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id="demo-simple-select-label">DevIcon</InputLabel>
                                <Select
                                    required
                                    sx={{ minWidth: 'fit-content' }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={icon}
                                    label="DevIcon"
                                    onChange={(e) => {
                                        setIcon(e.target.value);

                                    }}
                                >
                                    {data.map((devName) => {
                                        return (
                                            <MenuItem key={devName.id} value={devName.image}>{devName.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Stack>
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

                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={projectName}
                            id="projectName" label="project Name"
                            variant="outlined" type="text"
                            onChange={(e) => {
                                handleProjectNameChange(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={downPayment}
                            id="downPayment" label="down Payment"
                            variant="outlined" type="text"
                            onChange={(e) => {
                                handledownPaymentChange(e)
                            }}
                        />

                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={years}
                            id="years" label="years"
                            variant="outlined" type="number"
                            onChange={(e) => {
                                handleYearsChange(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={cashDiscount}
                            id="CashDiscount" label="Cash Discount"
                            variant="outlined" type="text"
                            onChange={(e) => {
                                handleCashDiscountChange(e)
                            }}
                        />
                        <Box sx={{ width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                            <Typography variant='body2'>
                                Upload Your Images ...
                            </Typography>
                            <Button
                                component="label"
                                variant="outlined"
                                // tabIndex={-1}
                                sx={{ padding: '10px', margin: '15px' }}
                                startIcon={<AddPhotoAlternate />}
                                onChange={(e) => {
                                    handleFileChange(e)
                                }}
                            >
                                <VisuallyHiddenInput type="file" multiple />
                            </Button>
                            <LinearProgress variant="determinate" value={prog} />
                        </Box>

                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            id="Location" label="Location" variant="outlined" type="text"
                            value={location}
                            onChange={(e) => {
                                handlelocationChange(e)
                            }}
                        />

                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            value={dis}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleDisChange(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            id="1%" label="%1" variant="outlined" type="number"
                            value={pers1}
                            onChange={(e) => {
                                handlePers1Change(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            id="year1" label="year1" variant="outlined" type="number"
                            value={year1}
                            onChange={(e) => {
                                handleYear1Change(e)
                            }}
                        />
                        <TextField
                            id="offer text"
                            label=" offer text"
                            multiline
                            value={offerText1}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleOfferText1Change(e)
                            }}
                        />

                        {/* <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            id="2%" label="%2" variant="outlined" type="number"
                            value={pers2}
                            onChange={(e) => {
                                handlePers2Change(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            id="year2" label="year2" variant="outlined" type="number"
                            value={year2}
                            onChange={(e) => {
                                handleYear2Change(e)
                            }}
                        />
                        <TextField
                            id="offer text2"
                            label=" offer text2"
                            multiline
                            value={offerText2}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleOfferText2Change(e)
                            }}
                        />

                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            id="3%" label="%3" variant="outlined" type="number"
                            value={pers3}
                            onChange={(e) => {
                                handlePers3Change(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            id="year3" label="year3" variant="outlined" type="number"
                            value={year3}
                            onChange={(e) => {
                                handleYear3Change(e)
                            }}
                        />
                        <TextField
                            id="offer-text3"
                            label=" offer text3"
                            multiline
                            value={offerText3}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleOfferText3Change(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            id="4%" label="%4" variant="outlined" type="number"
                            value={pers4}
                            onChange={(e) => {
                                handlePers4Change(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            id="year4" label="year4" variant="outlined" type="number"
                            value={year4}
                            onChange={(e) => {
                                handleYear4Change(e)
                            }}
                        />
                        <TextField
                            id="offer-text4"
                            label=" offer text4"
                            multiline
                            value={offerText4}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleOfferText4Change(e)
                            }}
                        /> */}
                        <Button disabled={btn} variant="contained" type="submit" style={{ width: '50%' }}

                            className="btn">
                            {btn ? <ReactLoading type={'spin'} height={'20px'} width={'20px'} /> : "Send"}
                        </Button>
                    </Box>
                </Card>
            </Box>
            <p style={{ zIndex: '10', backgroundColor: 'whitesmoke', display: 'flex', alignItems: 'center', color: 'black', padding: '10px', borderRadius: '6px', boxShadow: 'rgb(255 255 255 / 25%) 0px 5px 30px 0px', position: 'fixed', top: '100px', right: messege ? '20px' : '-230px', transition: '0.8s', scale: messege ? "1" : '0' }}>Data has been sent successfully <Info style={{ margin: '3px 0 0 10px', fontSize: '20px', color: 'teal' }} /></p>
        </>
    )
}

export default Cityscape