import React, { useState } from 'react'
import { db, storage } from '../../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, InputLabel, LinearProgress, MenuItem, Select, Stack, TextField, Typography, styled } from '@mui/material';
import ReactLoading from 'react-loading';
import 'react-phone-input-2/lib/style.css'
import { AddPhotoAlternate, Info } from '@mui/icons-material';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { data } from '../../Data';
// import data from
function DataBase() {
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
    const [type, setType] = React.useState('');
    const [dev, setDev] = React.useState('');
    const [devName, setDevName] = React.useState('');
    const [icon, setIcon] = useState('')
    const [devDis, setDevDis] = React.useState('');
    const [devDis2, setDevDis2] = React.useState('');
    const [devDis3, setDevDis3] = React.useState('');
    const [devDis4, setDevDis4] = React.useState('');
    const [devDis5, setDevDis5] = React.useState('');
    const [devDis6, setDevDis6] = React.useState('');
    const [pers1, setPers1] = React.useState('');
    const [pers2, setPers2] = React.useState('');
    const [pers3, setPers3] = React.useState('');
    const [pers4, setPers4] = React.useState('');

    const [year1, setYear1] = React.useState('');
    const [year2, setYear2] = React.useState('');
    const [year3, setYear3] = React.useState('');
    const [year4, setYear4] = React.useState('');

    const [proj, setProj] = React.useState('');
    const [url, setUrl] = useState([])
    const [price, setPrice] = React.useState('');
    const [district, setDistrict] = React.useState('');
    const [projDis, setProjDis] = React.useState('');
    const [projDis2, setProjDis2] = React.useState('');
    const [projDis3, setProjDis3] = React.useState('');
    const [projDis4, setProjDis4] = React.useState('');
    const [projDis5, setProjDis5] = React.useState('');
    const [projDis6, setProjDis6] = React.useState('');
    const [offerText1, setOfferText1] = React.useState('');
    const [offerText2, setOfferText2] = React.useState('');
    const [offerText3, setOfferText3] = React.useState('');
    const [offerText4, setOfferText4] = React.useState('');

    const [btn, setBtn] = useState(false);
    // const [startPrice, setStartPrice] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [masterplan, setMasterplan] = useState([])
    const [prog3, setProg3] = useState(0)
    const [prog, setProg] = useState(0)
    const [arrCheck, setArrCheck] = useState([]);
    const [arrCheckType, setArrCheckType] = useState([]);

    // const handleTypeChange = (event) => {
    //     setType(event.target.value);
    // };
    const handleDevChange = (event) => {
        setDev(event.target.value);
        setDevName(event.target.value)
    };
    const handleDevDisChange = (event) => {
        setDevDis(event.target.value);
    };
    const handleDevDis2Change = (event) => {
        setDevDis2(event.target.value);
    };
    const handleDevDis3Change = (event) => {
        setDevDis3(event.target.value);
    };
    const handleDevDis4Change = (event) => {
        setDevDis4(event.target.value);
    };
    const handleDevDis5Change = (event) => {
        setDevDis5(event.target.value);
    };
    const handleDevDis6Change = (event) => {
        setDevDis6(event.target.value);
    };
    const handleProjChange = (event) => {
        setProj(event.target.value);
    };
    const handleFileChange = async (event) => {
        for (let i = 0; i < event.target.files.length; i++) {
            const storageRef = ref(storage, 'developer/' + event.target.files[i].name);
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
    const handleDistrictChange = (event) => {
        setDistrict(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const handleProjDisChange = (event) => {
        setProjDis(event.target.value);
    };
    const handleProjDis2Change = (event) => {
        setProjDis2(event.target.value);
    };
    const handleProjDis3Change = (event) => {
        setProjDis3(event.target.value);
    };
    const handleProjDis4Change = (event) => {
        setProjDis4(event.target.value);
    };
    const handleProjDis5Change = (event) => {
        setProjDis5(event.target.value);
    };
    const handleProjDis6Change = (event) => {
        setProjDis6(event.target.value);
    };
    const handlelocationChange = (event) => {
        setLocation(event.target.value);
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
    const handleMasterplanImgChange = async (event) => {
        for (let i = 0; i < event.target.files.length; i++) {
            // console.log(i)
            const storageRef = ref(storage, event.target.files[i].name);
            const uploadTask = uploadBytesResumable(storageRef, event.target.files[i]);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log('Upload is ' + progress + '% done');
                    setProg3(progress);
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
                        setMasterplan((old) => [...old, downloadURL]);
                        setBtn(false)
                        // Add a new document in collection "cities"
                    });
                }
            );
        }
    };
    const sendData = async () => {
        setBtn(true);
        try {
            const res = await getDoc(doc(db, 'admin', devName));
            const id = new Date().getTime()
            if (!res.exists()) {
                await setDoc(doc(db, 'admin', devName), {
                    devName: devName,
                    devIcon: icon,
                    devDis: devDis,
                    devDis2: devDis2,
                    devDis6: devDis6,
                    dev:
                        [
                            {
                                proj: proj,
                                projImgs: url,
                                district: district,
                                price: price,
                                projDes: projDis,
                                projDes2: projDis2,
                                projDes3: projDis3,
                                masterplanImg: masterplan,
                                id: id,
                                Location: location,
                                aminatis: arrCheck,
                                type: arrCheckType,
                                pers1: pers1,
                                year1: year1,
                                offer1: offerText1,
                                offer2: offerText2,
                                offer3: offerText3,
                                offer4: offerText4,
                                pers2: pers2,
                                year2: year2,
                                pers3: pers3,
                                year3: year3,
                                pers4: pers4,
                                year4: year4,
                            },
                        ]
                });
            } else {
                await updateDoc(doc(db, 'admin', devName), {
                    dev: arrayUnion({
                        proj: proj,
                        projImgs: url,
                        district: district,
                        price: price,
                        projDes: projDis,
                        projDes2: projDis2,
                        projDes3: projDis3,
                        masterplanImg: masterplan,
                        id: id,
                        Location: location,
                        aminatis: arrCheck,
                        type: arrCheckType,
                        pers1: pers1,
                        year1: year1,
                        pers2: pers2,
                        year2: year2,
                        pers3: pers3,
                        year3: year3,
                        pers4: pers4,
                        year4: year4,
                        offer1: offerText1,
                        offer2: offerText2,
                        offer3: offerText3,
                        offer4: offerText4,
                    })
                })
            }
        } catch (er) {
        }
        setBtn(false)
    }
    return (
        <>
            <Box style={{ width: '100%', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '70px 0 0' }}>
                <Stack sx={{ alignItems: 'center', marginBottom: '10px' }}>
                    <Typography variant='h5'>
                        Maverick Deals
                    </Typography>
                </Stack>
                <Card sx={{ width: { xs: '90%', sm: '80%' }, display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '20px', margin: '10px 0 ' }}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                        Complete The Form
                    </Typography>
                    <Typography variant='caption'>
                        Your privacy is important to us. We won't publish or share your information with anyone
                    </Typography>
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
                                <InputLabel id="demo-simple-select-label">Dev</InputLabel>
                                <Select
                                    sx={{ minWidth: 'fit-content' }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={dev}
                                    label="Dev"
                                    onChange={handleDevChange}
                                >
                                    {data.map((devName) => {
                                        return (
                                            <MenuItem key={devName.id} value={devName.name}>{devName.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack sx={{ flexDirection: 'row', width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id="demo-simple-select-label">DevIcon</InputLabel>
                                <Select
                                    sx={{ minWidth: 'fit-content' }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={icon}
                                    label="DevIcon"
                                    onChange={(e) => { setIcon(e.target.value) }}
                                >
                                    {data.map((devName) => {
                                        return (
                                            <MenuItem key={devName.id} value={devName.image}>{devName.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Stack>
                        <TextField
                            id="outlined-multiline-static"
                            label=" Description"
                            value={devDis}
                            multiline
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => { 
                                handleDevDisChange(e)
                            }}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label=" Description bold"
                            value={devDis2}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleDevDis2Change(e)
                            }}
                        />
                        <FormGroup sx={{ flexDirection: 'row' }}>
                            <FormControlLabel control={<Checkbox value='Clubhouse' onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                            }} />} label="Clubhouse" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                            }} value='Commercial Strip' />} label="Commercial Strip" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                            }} value='Underground Parking' />} label="Underground Parking" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Outdoor Pools" />} label="Outdoor Pools" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Jogging Trail" />} label="Jogging Trail" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Bicycles Lanes" />} label="Bicycles Lanes" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Business Hub" />} label="Business Hub" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Schools" />} label="Schools" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Sports Clubs" />} label="Sports Clubs" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Livability" />} label="Livability" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Infrastructure" />} label="Infrastructure" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="mosque" />} label="mosque" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="children area" />} label="children area" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="kids' area" />} label="kids' area" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="gym" />} label="gym" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="spa" />} label="spa" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Educational hub" />} label="Educational hub" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Commercial area" />} label="Commercial area" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheck((old) => [...old, e.target.value])
                                } else {
                                    setArrCheck(arrCheck.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Medical centre" />} label="Medical centre" />
                        </FormGroup>
                        <TextField
                            id="outlined-multiline-static"
                            label="Dev Description list"
                            multiline
                            value={devDis6}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleDevDis6Change(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={proj}
                            id="project" label="projectName"
                            variant="outlined" type="text"
                            onChange={handleProjChange}
                        />
                        <Divider />
                        <Box sx={{ width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                            <Typography variant='body2'>
                                Upload Your Project Images ...
                            </Typography>
                            <Button
                                component="label"
                                variant="outlined"
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
                            value={district}
                            id="District" label="District"
                            variant="outlined" type="text"
                            onChange={handleDistrictChange}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={price}
                            id="price" label="Price"
                            variant="outlined" type="text"
                            onChange={(e) => {
                                handlePriceChange(e)
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
                        <FormGroup sx={{ flexDirection: 'row' }}>
                            <FormControlLabel control={<Checkbox value='Apartment' onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                            }} />} label="Apartment" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                            }} value='Duplex' />} label="Duplex" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                            }} value='Studio' />} label="Studio" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Penthouse" />} label="Penthouse" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Family house" />} label="Family house" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Standalone" />} label="Standalone" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Twin house" />} label="Twin house" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="One storey Villa" />} label="One storey Villa" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Chalet" />} label="Chalet" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Townhouse" />} label="Townhouse" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Clinic" />} label="Clinic" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Cabin" />} label="Cabin" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Office" />} label="Office" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Retail" />} label="Retail" />
                            <FormControlLabel control={<Checkbox onClick={(e) => {
                                if (e.target.checked === true) {
                                    setArrCheckType((old) => [...old, e.target.value])
                                } else {
                                    setArrCheckType(arrCheckType.filter((it) => it !== e.target.value))
                                }
                                // console.log(e.target.checked)
                            }} value="Villa" />} label="Villa" />
                        </FormGroup>
                        <TextField
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
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Project Description"
                            multiline
                            value={projDis}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleProjDisChange(e)
                            }}
                        />
                        <TextField
                            id="Project Description2"
                            label="Project Description bold"
                            value={projDis2}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleProjDis2Change(e)
                            }}
                        />
                        <TextField
                            id="Project Description3"
                            label="Project Description3"
                            multiline
                            value={projDis3}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleProjDis3Change(e)
                            }}
                        />
                        {/* <TextField
                            id="Project Description4"
                            label="Project Description4"
                            multiline
                            value={projDis4}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleProjDis4Change(e)
                            }}
                        /> */}
                        {/* <TextField
                            id="Project Description5"
                            label="Project Description5 bold"
                            multiline
                            value={projDis5}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleProjDis5Change(e)
                            }}
                        /> */}
                        {/* <TextField
                            id="Project Description6"
                            label="Project Description6"
                            multiline
                            value={projDis6}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleProjDis6Change(e)
                            }}
                        /> */}
                        <Box sx={{ width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                            <Typography variant='body2'>
                                Master plan Images ...
                            </Typography>
                            <Button
                                component="label"
                                variant="outlined"
                                // tabIndex={-1}
                                sx={{ padding: '10px', margin: '15px' }}
                                startIcon={<AddPhotoAlternate />}
                                onChange={(e) => {
                                    handleMasterplanImgChange(e)
                                }}
                            >
                                <VisuallyHiddenInput type="file" multiple />
                            </Button>
                            <LinearProgress variant="determinate" value={prog3} />
                        </Box>
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            id="Location" label="Location" variant="outlined" type="text"
                            value={location}
                            onChange={(e) => {
                                handlelocationChange(e)
                            }}
                        />
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

export default DataBase