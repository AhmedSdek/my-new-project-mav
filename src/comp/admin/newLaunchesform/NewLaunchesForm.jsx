import React, { useCallback, useState } from 'react'
import { db, storage } from '../../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Dialog, DialogContent, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, LinearProgress, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography, styled } from '@mui/material';
import ReactLoading from 'react-loading';
import 'react-phone-input-2/lib/style.css'
import { AddPhotoAlternate, HelpOutline, Info } from '@mui/icons-material';
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { data } from '../../Data';
import Input from '../Input';
import FormGro from '../FormGro';
import FileUpload from '../FileUpload';

function NewLaunchesForm() {
  const [messege, setMessege] = useState(false);
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
  const [open, setOpen] = useState(false);
  const [btn, setBtn] = useState(false);
  const [prog, setProg] = useState(0)
  const [prog3, setProg3] = useState(0)
  const [prog4, setProg4] = useState(0)
  const [newData, setNewData] = useState({
    Dis: "",
    launchName: "",
    Dis: "",
    img: '',
    video: "",
    img: [],
    masterplan: "",
    Location: "",
    devid: "",
    icon: "",
    devname: "",
    price: "",
  });
  const handleDevChange = useCallback(
    (e) => {
      const selectedDev = data.find((dev) => dev.id === e.target.value);
      if (selectedDev) {
        setNewData((prev) => ({
          ...prev,
          devid: selectedDev.id,
          icon: selectedDev.image || "",
          devname: selectedDev.name || "",
        }));
      }
    },
    [data]
  );
  const handleFileChange = useCallback(async (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const storageRef = ref(
        storage,
        "newLaunches/" + event.target.files[i].name
      );
      const uploadTask = uploadBytesResumable(
        storageRef,
        event.target.files[i]
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
          setProg(progress);
          if (i < event.target.files.length) {
            setBtn(true);
          }
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            setNewData((prev) => ({
              ...prev,
              img: [...prev.img, downloadURL],
            }));
            setBtn(false);
            // Add a new document in collection "cities"
          });
        }
      );
    }
  }, []);
  const handleVideoChange = async (event) => {
    // console.log(i)
    const storageRef = ref(storage, event.target.files[0].name);
    const uploadTask = uploadBytesResumable(
      storageRef,
      event.target.files[0]
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        setProg4(progress);
        // if (i < event.target.files.length) {
        //     setBtn(true)
        // }
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          setNewData((prev) => ({
            ...prev,
            video: [...prev.video, downloadURL],
          }));
          // setVideo(downloadURL);
          setBtn(false);
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
  const handleMasterplanImgChange = useCallback(async (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
  // console.log(i)
      const storageRef = ref(storage, event.target.files[i].name);
      const uploadTask = uploadBytesResumable(
        storageRef,
        event.target.files[i]
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
          setProg3(progress);
          if (i < event.target.files.length) {
            setBtn(true);
          }
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
        // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              console.log("File available at", downloadURL);
              setNewData((prev) => ({
                ...prev,
                masterplan: [...prev.masterplan, downloadURL],
              }));
              setBtn(false);
          // Add a new document in collection "cities"
            }
          );
        }
      );
    }
  }, []);
  // const handleFileChange = async (event) => {
  //   for (let i = 0; i < event.target.files.length; i++) {
  // // console.log(i)
  //     const storageRef = ref(
  //       storage,
  //       "newLaunches/" + event.target.files[i].name
  //     );
  //     const uploadTask = uploadBytesResumable(
  //       storageRef,
  //       event.target.files[i]
  //     );

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         // console.log('Upload is ' + progress + '% done');
  //         setProg(progress);
  //         if (i < event.target.files.length) {
  //           setBtn(true);
  //         }
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //         }
  //       },
  //       (error) => {
  //         // A full list of error codes is available at
  //         // https://firebase.google.com/docs/storage/web/handle-errors
  //         switch (error.code) {
  //           case "storage/unauthorized":
  //             // User doesn't have permission to access the object
  //             break;
  //           case "storage/canceled":
  //             // User canceled the upload
  //             break;

  //           // ...

  //           case "storage/unknown":
  //             // Unknown error occurred, inspect error.serverResponse
  //             break;
  //         }
  //       },
  //       () => {
  //       // Upload completed successfully, now we can get the download URL
  //         getDownloadURL(uploadTask.snapshot.ref).then(
  //           async (downloadURL) => {
  //             console.log("File available at", downloadURL);
  //             setUrl((old) => [...old, downloadURL]);
  //             setBtn(false);
  //             // Add a new document in collection "cities"
  //           }
  //         );
  //       }
  //     );
  //   }
  // };
  const onchange = useCallback((e) => {
    setNewData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  const sendData = async (dataToSend) => {
    // console.log(dataToSend)
    setBtn(true);
    const id = new Date().getTime();
    try {
      await setDoc(doc(db, "newlaunch", `${id}`), {
        id: `${id}`,
        ...dataToSend,
      });
    } catch (er) { 
      console.log(er)
    }
    setBtn(false);
  };
  const onsubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setMessege(true);
      // setTimeout(() => {
      //   setMessege(false);
      //   nav("/");
      // }, 2000);
      await sendData(newData);
    },
    [newData]
  );
  return (
    <>
      <Box
        style={{
          width: "100%",
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "70px 0 0",
        }}
      >
        <Stack sx={{ alignItems: "center", marginBottom: "10px" }}>
          <Typography variant="h5">New Launches</Typography>
        </Stack>
        <Card
          sx={{
            width: { xs: "90%", sm: "80%" },
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px",
            margin: "10px 0 ",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Complete The Form
          </Typography>
          <Typography variant="caption">
            Your privacy is important to us. We won't publish or share your
            information with anyone
          </Typography>
          <Box
            component="form"
            onSubmit={onsubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              margin: "15px 0 0",
            }}
          >
            <FormGro
              label="Dev"
              name="dev"
              data={data}
              inputLabel="Dev"
              value={newData.devid || ""} // نخزن ونعرض الـ id
              fun={handleDevChange}
            />
            <Input
              name="launchName"
              value={newData.launchName}
              onChange={onchange}
              // placeholder="اكتب شيئًا هنا"
              label="Launch Name"
              id="outlined-multiline-static"
            />
            <Input
              name="price"
              value={newData.price}
              onChange={onchange}
              // placeholder="اكتب شيئًا هنا"
              label="Price"
              id="outlined-multiline-static"
            />
            <FileUpload handleFileChange={handleFileChange} prog={prog} title="Upload Your Images ..." />
            {/* <Box sx={{ width: { xs: "100%", md: "50%" }, padding: "5px" }}>
              <Typography variant="body2">Upload Your Images ...</Typography>
              <Button
                component="label"
                variant="outlined"
            // tabIndex={-1}
                sx={{ padding: "10px", margin: "15px" }}
                startIcon={<AddPhotoAlternate />}
                onChange={(e) => {
                  handleFileChange(e);
                }}
              >
                <VisuallyHiddenInput type="file" multiple />
              </Button>
              <LinearProgress variant="determinate" value={prog} />
            </Box> */}
            <Input
              name="Location"
              value={newData.Location}
              onChange={onchange}
              // placeholder="اكتب شيئًا هنا"
              label="Location"
              id="outlined-multiline-static"
            />
            <FileUpload handleFileChange={handleMasterplanImgChange} prog={prog3} title="Master plan Images ..." />

            {/* <Box sx={{ width: { xs: "100%", md: "50%" }, padding: "5px" }}>
              <Typography variant="body2">Master plan Images ...</Typography>
              <Button
                component="label"
                variant="outlined"
            // tabIndex={-1}
                sx={{ padding: "10px", margin: "15px" }}
                startIcon={<AddPhotoAlternate />}
                onChange={(e) => {
                  handleMasterplanImgChange(e);
                }}
              >
                <VisuallyHiddenInput type="file" />
              </Button>
              <LinearProgress variant="determinate" value={prog3} />
            </Box> */}
            <Box sx={{ width: { xs: "100%", md: "50%" }, padding: "5px" }}>
              <Typography variant="body2">Video ...</Typography>
              <Button
                component="label"
                variant="outlined"
            // tabIndex={-1}
                sx={{ padding: "10px", margin: "15px" }}
                startIcon={<AddPhotoAlternate />}
                onChange={(e) => {
                  handleVideoChange(e);
                }}
              >
                <VisuallyHiddenInput type="file" />
              </Button>
              <LinearProgress variant="determinate" value={prog4} />
            </Box>
            <IconButton onClick={() => setOpen(true)}>
              <HelpOutline />
            </IconButton>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogContent>
                <Typography style={{ whiteSpace: "pre-wrap", fontSize: "0.9rem" }}>
                  {`📝 إزاي تستخدم Markdown:
# عنوان رئيسي (H1)
## عنوان فرعي (H2)
### عنوان (H3)
#### عنوان (H4)
##### عنوان (H5)
###### عنوان (H6)
*نص مائل*           ← نص مائل
**نص عريض**         ← نص بولد
~~نص مشطوب~~        ← خط على النص
- عنصر              ← قائمة نقطية
1. عنصر مرقم        ← قائمة مرقمة
> اقتباس            ← اقتباس
`}{" "}
                </Typography>
              </DialogContent>
            </Dialog>
            <Input
              name="Dis"
              value={newData.Dis}
              onChange={onchange}
              // placeholder="اكتب شيئًا هنا"
              label="Details"
              id="outlined-Details"
              multiline
              rows={4}
            />
            <Button
              disabled={btn}
              variant="contained"
              type="submit"
              style={{ width: "50%" }}
              className="btn"
            >
              {btn ? (
                <ReactLoading type={"spin"} height={"20px"} width={"20px"} />
              ) : (
                "Send"
              )}
            </Button>
          </Box>
        </Card>
      </Box>
      <p
        style={{
          zIndex: "10",
          backgroundColor: "whitesmoke",
          display: "flex",
          alignItems: "center",
          color: "black",
          padding: "10px",
          borderRadius: "6px",
          boxShadow: "rgb(255 255 255 / 25%) 0px 5px 30px 0px",
          position: "fixed",
          top: "100px",
          right: messege ? "20px" : "-230px",
          transition: "0.8s",
          scale: messege ? "1" : "0",
        }}
      >
        Data has been sent successfully{" "}
        <Info
          style={{ margin: "3px 0 0 10px", fontSize: "20px", color: "teal" }}
        />
      </p>
    </>
  );
}

export default NewLaunchesForm