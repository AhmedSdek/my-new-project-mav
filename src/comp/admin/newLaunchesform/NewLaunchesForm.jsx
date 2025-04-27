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


function NewLaunchesForm() {
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
    const [masterplan, setMasterplan] = useState([])
    const [video, setVideo] = useState('')
    const [dev, setDev] = React.useState('');
    const [icon, setIcon] = useState('')
    const [btn, setBtn] = useState(false);
    const [launchName, setLaunchName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [dis, setDis] = React.useState('');
    const [dis2, setDis2] = React.useState('');
    const [dis3, setDis3] = React.useState('');
    const [dis4, setDis4] = React.useState('');
    const [dis5, setDis5] = React.useState('');
    const [dis6, setDis6] = React.useState('');
    const [dis7, setDis7] = React.useState('');
    const [dis8, setDis8] = React.useState('');
    const [details, setDetails] = React.useState('');
    const [prog, setProg] = useState(0)
    const [prog3, setProg3] = useState(0)
    const [prog4, setProg4] = useState(0)
    const [url, setUrl] = useState([]);
    // const [url3, setUrl3] = useState([]);
    const handleLaunchNameChange = (event) => {
        setLaunchName(event.target.value);
    };
    const handleDevChange = (event) => {
        setDev(event.target.value);
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








    const handleVideoChange = async (event) => {

            // console.log(i)
        const storageRef = ref(storage, event.target.files[0].name);
        const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log('Upload is ' + progress + '% done');
                    setProg4(progress);
                    // if (i < event.target.files.length) {
                    //     setBtn(true)
                    // }
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
                        setVideo(downloadURL);
                        setBtn(false)
                        // Add a new document in collection "cities"
                    });
                }
            );


        // console.log(event.target.files[0].name)


        //     const storageRef = ref(storage, event.target.files[0].name);

        //     const uploadTask = uploadBytesResumable(storageRef, `video/${video}`);
        //     uploadTask.on('state_changed',
        //         (snapshot) => {
        //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         console.log('Upload is ' + progress + '% done');
        //         switch (snapshot.state) {
        //             case 'paused':
        //                 console.log('Upload is paused');
        //                 break;
        //             case 'running':
        //                 console.log('Upload is running');
        //                 break;
        //         }
        //     },
        //     (error) => {
        //         // Handle unsuccessful uploads
        //     },
        //     () => {
        //             // Handle successful uploads on complete
        //             // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //                 setVideo(downloadURL)
        //                 console.log('File available at', downloadURL);
        //             });
        //     }
        // );



    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const handlelocationChange = (event) => {
        setLocation(event.target.value);
    };
    const handleDisChange = (event) => {
        setDis(event.target.value);
    };
    const handleDis2Change = (event) => {
        setDis2(event.target.value);
    };
    const handleDis3Change = (event) => {
        setDis3(event.target.value);
    };
    const handleDis4Change = (event) => {
        setDis4(event.target.value);
    };
    const handleDis5Change = (event) => {
        setDis5(event.target.value);
    };
    const handleDis6Change = (event) => {
        setDis6(event.target.value);
    };
    const handleDis7Change = (event) => {
        setDis7(event.target.value);
    };
    const handleDis8Change = (event) => {
        setDis8(event.target.value);
    };
    const handleDetailsChange = (event) => {
        setDetails(event.target.value);
    };
    const handleFileChange = async (event) => {
        for (let i = 0; i < event.target.files.length; i++) {
            // console.log(i)
            const storageRef = ref(storage, 'newLaunches/' + event.target.files[i].name);
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
        const dataId = new Date().getTime();
        try {
            await setDoc(doc(db, 'newlaunch', `${dataId}`), {
                id: dataId,
                launchName: launchName,
                price: price,
                Location: location,
                Dis: dis,
                dis2: dis2,
                dis3: dis3,
                // dis4: dis4,
                // dis5: dis5,
                // dis6: dis6,
                // dis7: dis7,
                // dis8: dis8,
                // details: details,
                img: url,
                video: video,
                Layoutimg: masterplan,
                icon: icon,
                devname: dev
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
                        New Launches
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
                            value={launchName}

                            id="LaunchName" label="LaunchName"
                            variant="outlined" type="text"
                            onChange={(e) => {
                                handleLaunchNameChange(e)
                            }}
                        />
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            id="price" label="price" variant="outlined" type="text"

                            value={price}
                            onChange={(e) => {
                                handlePriceChange(e)
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
                                <VisuallyHiddenInput type="file" />
                            </Button>
                            <LinearProgress variant="determinate" value={prog3} />
                        </Box>
                        <Box sx={{ width: { xs: '100%', md: '50%' }, padding: '5px' }}>
                            <Typography variant='body2'>
                                Video ...
                            </Typography>
                            <Button
                                component="label"
                                variant="outlined"
                                // tabIndex={-1}
                                sx={{ padding: '10px', margin: '15px' }}
                                startIcon={<AddPhotoAlternate />}
                                onChange={(e) => {
                                    handleVideoChange(e)
                                }}
                            >
                                <VisuallyHiddenInput type="file" />
                            </Button>
                            <LinearProgress variant="determinate" value={prog4} />
                        </Box>
                        <TextField
                            id="outlined-multiline-static"
                            label="Launch Details"
                            multiline

                            value={dis}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleDisChange(e)
                            }}
                        />
                        {/* <TextField
                            id="outlined-multiline-static"
                            label="Launch Details2"
                            multiline
                            value={dis6}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleDis6Change(e)
                            }}
                        /> */}
                        {/* <TextField
                            id="outlined-multiline-static"
                            label="Launch Details3"
                            multiline

                            value={dis7}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleDis7Change(e)
                            }}
                        /> */}
                        {/* <TextField
                            id="outlined-multiline-static"
                            label="Launch Details4"
                            multiline
                            value={dis8}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleDis8Change(e)
                            }}
                        /> */}
                        <TextField
                            id="outlined2-multiline-static"
                            label="Launch Description2"
                            value={dis2}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleDis2Change(e)
                            }}
                        />
                        <TextField
                            id="outlined3-multiline-static"
                            label="Launch Description3"
                            multiline
                            value={dis3}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleDis3Change(e)
                            }}
                        />
                        {/* <TextField
                            id="outlined4-multiline-static"
                            label="Launch Description3"
                            multiline

                            value={dis4}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleDis4Change(e)
                            }}
                        /> */}
                        {/* <TextField
                            id="Details-multiline-static"
                            label="Launch Description4"
                            multiline
                            value={details}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleDetailsChange(e)
                            }}
                        /> */}
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
                        <TextField
                            id="About-multiline-static"
                            label="Launch Description5"
                            multiline
                            value={dis5}
                            rows={4}
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                handleDis5Change(e)
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

export default NewLaunchesForm