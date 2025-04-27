import React, { useState } from 'react'
import { db, storage } from '../../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, FormControl, FormControlLabel, FormLabel, InputLabel, LinearProgress, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography, styled } from '@mui/material';
import ReactLoading from 'react-loading';
import 'react-phone-input-2/lib/style.css'
import { AddPhotoAlternate, Info } from '@mui/icons-material';
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { data } from '../../Data';

function ReSale() {
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
    const [imgText, setImgText] = React.useState('');
    const [sold, setSold] = React.useState('');
    const [monyType, setMoneyType] = React.useState('');
    const [floor, setFloor] = React.useState('');
    const [devname, setDevname] = React.useState('');
    const [compoundName, setCompoundName] = React.useState('')
    const [price, setPrice] = React.useState('');
    const [downPayment, setDownPayment] = React.useState('');
    const [remaining, setRemaining] = React.useState('');
    const [month, setMonth] = React.useState('');
    const [rental, setRental] = React.useState('');
    const [refNum, setRefNum] = React.useState('');
    const [delivery, setDelivery] = React.useState('');
    const [type, setType] = React.useState('');
    const [area, setArea] = React.useState('');
    // console.log(area)
    const [bed, setBed] = React.useState('');
    const [bath, setBath] = React.useState('');
    const [finsh, setFinsh] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [sale, setSale] = React.useState('');
    const [dis, setDis] = React.useState('');
    // const [dis2, setDis2] = React.useState('');
    const [gardenArea, setGardenArea] = React.useState('');
    const [dis3, setDis3] = React.useState('');
    const [prog, setProg] = useState(0)
    const [prog2, setProg2] = useState(0)
    const [prog3, setProg3] = useState(0)
    const [url, setUrl] = useState([]);
    const [url2, setUrl2] = useState([]);
    const [url3, setUrl3] = useState([]);
    const [icon, setIcon] = useState('')
    const [landArea, setLandArea] = useState('')
    const [roofArea, setRoofArea] = useState('')

    const handleimgTextChange = (event) => {
        setImgText(event.target.value);
    };
    const handleRoofAreaChange = (event) => {
        setRoofArea(Number(event.target.value));
    };
    const handleCompoundNameChange = (event) => {
        setCompoundName(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(Number(event.target.value));
    };
    const handledownPaymentChange = (event) => {
        setDownPayment(Number(event.target.value));
    };
    const handleremainingChange = (event) => {
        setRemaining(event.target.value);
    };
    const handleMonthChange = (event) => {
        setMonth(Number(event.target.value));
    };
    const handleRentalChange = (event) => {
        setRental(event.target.value);
    };
    const handleDeliveryChange = (event) => {
        setDelivery(event.target.value);
    };
    const handleLandAreaChange = (event) => {
        setLandArea(Number(event.target.value));
    };
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };
    const handleAreaChange = (event) => {
        setArea(Number(event.target.value));
    };
    const handlebedChange = (event) => {
        setBed(event.target.value);
    };
    const handlebathChange = (event) => {
        setBath(event.target.value);
    };
    const handleRefNumChange = (event) => {
        setRefNum(event.target.value);
    };
    const handleGardenareaChange = (event) => {
        setGardenArea(Number(event.target.value));
    };
    const handleFinshChange = (event) => {
        setFinsh(event.target.value);
    };
    const handlelocationChange = (event) => {
        setLocation(event.target.value);
    };
    const handleSaleChange = (event) => {
        setSale(event.target.value);
    };
    const handleDisChange = (event) => {
        setDis(event.target.value);
    };
    // const handleDis2Change = (event) => {
    //     setDis2(event.target.value);
    // };
    const handleDis3Change = (event) => {
        setDis3(event.target.value);
    };
    const handleFileChange = async (event) => {
        for (let i = 0; i < event.target.files.length; i++) {
            console.log(event.target.files.length)
            // console.log(i)
            const storageRef = ref(storage, 'resale/' + event.target.files[i].name);
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
    const handleFiletowChange = async (event) => {
        for (let i = 0; i < event.target.files.length; i++) {
            // console.log(i)
            const storageRef = ref(storage, event.target.files[i].name);
            const uploadTask = uploadBytesResumable(storageRef, event.target.files[i]);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log('Upload is ' + progress + '% done');
                    setProg2(progress);
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
                        setUrl2((old) => [...old, downloadURL]);
                        setBtn(false)
                        // Add a new document in collection "cities"
                    });
                }
            );
        }
    };
    const handleFile3Change = async (event) => {
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
                        setUrl3((old) => [...old, downloadURL]);
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
            await setDoc(doc(db, 'Resell', `${id}`), {
                id: `${id}`,
                imgtext: imgText,
                price: price,
                monyType: monyType,
                refNum: refNum,
                delivery: delivery,
                Type: type, 
                Area: area,
                compoundName: compoundName,
                icon: icon,
                Bed: bed,
                Bath: bath,
                Finsh: finsh,
                Location: location,
                Sale: sale,
                Dis: dis,
                rental: rental,
                month: month,
                downPayment: downPayment,
                remaining: remaining,
                // dis2: dis2,
                dis3: dis3,
                img: url,
                Layoutimg: url2,
                Masterimg: url3,
                sold: sold,
                like: 0,
                devname: devname,
                floor: floor,
                gardenArea: gardenArea,
                RoofArea: roofArea,
                landArea: landArea
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
                        Resale
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
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={imgText}
                            id="imgText" label="Title"
                            variant="outlined" type="text"
                            onChange={(e) => {
                                handleimgTextChange(e)
                            }}
                        />

                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={compoundName}
                            id="imgText" label="Compound Name"
                            variant="outlined" type="text"
                            onChange={(e) => {
                                handleCompoundNameChange(e)
                            }}
                        />

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

                        <Stack sx={{ flexDirection: 'row', width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id="mony-type-label">Money Type</InputLabel>
                                <Select
                                    sx={{ minWidth: 'fit-content' }}
                                    labelId="soldlap"
                                    id="demo-sold"
                                    value={monyType}
                                    label="Money Type"
                                    onChange={(e) => {
                                        setMoneyType(e.target.value)
                                    }}
                                >
                                    <MenuItem value={'dollar'}>Dollar</MenuItem>
                                    <MenuItem value={'pound'}>Pound</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={price}
                            id="Price" label="Total Price"
                            variant="outlined" type="number"
                            onChange={(e) => {
                                handlePriceChange(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={downPayment}
                            id="downPayment" label="down Payment"
                            variant="outlined" type="number"
                            onChange={(e) => {
                                handledownPaymentChange(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={remaining}
                            id="remaining" label="remaining"
                            variant="outlined" type="text"
                            onChange={(e) => {
                                handleremainingChange(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={month}
                            id="month" label="Month"
                            variant="outlined" type="number"
                            onChange={(e) => {
                                handleMonthChange(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={roofArea}
                            id="RoofArea" label="Roof Area"
                            variant="outlined" type="number"
                            onChange={(e) => {
                                handleRoofAreaChange(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={landArea}
                            id="Land-area" label="Land Area"
                            variant="outlined" type="number"
                            onChange={(e) => {
                                handleLandAreaChange(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={rental}
                            id="month" label="Minimum rental period"
                            variant="outlined" type="number"
                            onChange={(e) => {
                                handleRentalChange(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={refNum}
                            id="RefNum" label="RefNum"
                            variant="outlined" type="number"
                            onChange={(e) => {
                                handleRefNumChange(e)
                            }}
                        />

                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            value={gardenArea}
                            id="Garden-area" label="Garden area"
                            variant="outlined" type="number"
                            onChange={(e) => {
                                handleGardenareaChange(e)
                            }}
                        />

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
                                        setSold(e.target.value)
                                    }}
                                >
                                    <MenuItem value={'SOLD OUT'}>SOLD OUT</MenuItem>
                                    <MenuItem value={'Not'}>Not</MenuItem>
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

                        <Stack sx={{ flexDirection: 'row', width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id="Floor-label">Floor</InputLabel>
                                <Select
                                    sx={{ minWidth: 'fit-content' }}
                                    labelId="soldlap"
                                    id="demo-Floor "
                                    value={floor}
                                    label="Floor"
                                    onChange={(e) => {
                                        setFloor(e.target.value)
                                    }}
                                >
                                    <MenuItem value={'Typical'}>Typical</MenuItem>
                                    <MenuItem value={'Ground'}>Ground</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                        <Stack sx={{ flexDirection: 'row', width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    sx={{ minWidth: 'fit-content' }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    label="Type"
                                    onChange={handleTypeChange}
                                >
                                    <MenuItem value='Apartment'>Apartment</MenuItem>
                                    <MenuItem value="Duplex">Duplex</MenuItem>
                                    <MenuItem value="Studio">Studio</MenuItem>
                                    <MenuItem value="Penthouse">Penthouse</MenuItem>
                                    <MenuItem value="Family">Family house</MenuItem>
                                    <MenuItem value="Standalone">Standalone</MenuItem>
                                    <MenuItem value="Twin house">Twin house
                                    </MenuItem>
                                    <MenuItem value="One storey Villa">One storey Villa</MenuItem>
                                    <MenuItem value="Chalet">Chalet</MenuItem>
                                    <MenuItem value="Townhouse">Townhouse</MenuItem>
                                    <MenuItem value="Cabin">Cabin</MenuItem>
                                    <MenuItem value="Clinic">Clinic</MenuItem>
                                    <MenuItem value="Office">Office</MenuItem>
                                    <MenuItem value="Retail">Retail</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            id="arya" label="Area(m)" variant="outlined" type="number"
                            value={area}
                            onChange={(e) => {
                                handleAreaChange(e)
                            }}
                        />

                        <Stack sx={{ flexDirection: 'row', width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id="Bedrooms">Bedrooms</InputLabel>
                                <Select
                                    sx={{ minWidth: 'fit-content' }}
                                    labelId="demo-simple-select-label"
                                    id="Bedroom"
                                    value={bed}
                                    label="Bedrooms"
                                    onChange={handlebedChange}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                        <Stack sx={{ flexDirection: 'row', width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id="Bathrooms">Bathrooms</InputLabel>
                                <Select
                                    sx={{ minWidth: 'fit-content' }}
                                    labelId="demo-simple-select-label"
                                    id="Bathroom"
                                    value={bath}
                                    label="Bathrooms"
                                    onChange={handlebathChange}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

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

                        <FormControl sx={{ width: { xs: '100%', md: '50%' }, padding: '5px' }} >
                            <FormLabel required id="demo-row-radio-buttons-group-label">Finishing</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                itemProp='required'
                                name="row-radio-buttons-group"
                                value={finsh}
                                onChange={(e) => {
                                    handleFinshChange(e)
                                }}
                            >
                                <FormControlLabel value="Finished" control={<Radio />} label="Finished" />
                                <FormControlLabel value="Semi Finished" control={<Radio />} label="Semi Finished" />
                                <FormControlLabel value="Cor & Shell" control={<Radio />} label="Cor & Shell" />
                                <FormControlLabel value="Furnished" control={<Radio />} label="Furnished" />
                            </RadioGroup>
                        </FormControl>

                        <Box sx={{ width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                            <Typography variant='body2'>
                                Layout Images ...
                            </Typography>
                            <Button
                                component="label"
                                variant="outlined"
                                sx={{ padding: '10px', margin: '15px' }}
                                startIcon={<AddPhotoAlternate />}
                                onChange={(e) => {
                                    handleFiletowChange(e)
                                }}
                            >
                                <VisuallyHiddenInput type="file" multiple />
                            </Button>
                            <LinearProgress variant="determinate" value={prog2} />
                        </Box>

                        <Box sx={{ width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                            <Typography variant='body2'>
                                Master plan Images ...
                            </Typography>
                            <Button
                                component="label"
                                variant="outlined"
                                sx={{ padding: '10px', margin: '15px' }}
                                startIcon={<AddPhotoAlternate />}
                                onChange={(e) => {
                                    handleFile3Change(e)
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

                        <FormControl required sx={{ width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={sale}
                                onChange={(e) => {
                                    handleSaleChange(e)
                                }}
                            >
                                <FormControlLabel value="Resale" control={<Radio />} label="Resale" />
                                <FormControlLabel value="Rent" control={<Radio />} label="Rent" />
                            </RadioGroup>
                        </FormControl>


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
                            id="About-multiline-static"
                            label="About"
                            multiline
                            value={dis3}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleDis3Change(e)
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

export default ReSale 