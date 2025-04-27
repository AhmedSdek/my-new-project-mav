import React, { useState } from "react";
import { db, storage } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import ReactLoading from "react-loading";
import "react-phone-input-2/lib/style.css";
import { AddPhotoAlternate, Info } from "@mui/icons-material";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { data } from "../../Data";
import { useCollection } from "react-firebase-hooks/firestore";
// import data from
function Inventory() {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const nav = useNavigate();

  // const [url, setUrl] = useState([]);
  const [prog, setProg] = useState(0);
  const [prog3, setProg3] = useState(0);
  const [prog2, setProg2] = useState(0);
  const [btn, setBtn] = useState(false);
  const [messege, setMessege] = React.useState(false);

  const [newData, setNewData] = useState({
    dev: null,
    description: "",
    descbold: "",
    aminatis: [],
    descriptionList: "",
    proj: "",
    projImgs: [],
    masterplan: "",
    moneyType: "",
    price: "",
    downPayment: "",
    remaining: "",
    month: "",
    roofArea: "",
    landArea: "",
    rental: "",
    refNum: "",
    gardenArea: "",
    about: "",
    // description: "",
    status: "",
    finishing: "",
    bathroom: "",
    bedroom: "",
    soldOut: "",
    delivery: "",
    floor: "",
    type: "",
    arya: "",
    layoutImage: "",
  });
  // console.log(newData);
  // البيانات كلها في Array واحدة
  const checkboxes = [
    "Clubhouse",
    "Commercial Strip",
    "Underground Parking",
    "Outdoor Pools",
    "Jogging Trail",
    "Bicycles Lanes",
    "Business Hub",
    "Schools",
    "Sports Clubs",
    "Livability",
    "Infrastructure",
    "mosque",
    "children area",
    "kids' area",
    "gym",
    "spa",
    "Educational hub",
    "Commercial area",
    "Medical centre",
  ];
  // الفانكشن المسؤولة عن التعديل
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setNewData((prev) => ({
        ...prev,
        aminatis: [...prev.aminatis, value],
      }));
    } else {
      setNewData((prev) => ({
        ...prev,
        aminatis: prev.aminatis.filter((item) => item !== value),
      }));
    }
  };
  const [value, loading, error] = useCollection(collection(db, "admin"));
  var arr = [];
  value &&
    value.docs.map((e) =>
      e.data().dev.map((it) => {
        // console.log(it);
        if (!arr.includes(it.proj) && it.proj !== "") {
          arr.push(it.proj);
        }
      })
    );
  const handleFileChange = async (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const storageRef = ref(
        storage,
        "developer/" + event.target.files[i].name
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
              projImgs: [...prev.projImgs, downloadURL],
            }));
            setBtn(false);
            // Add a new document in collection "cities"
          });
        }
      );
    }
  };

  const handleMasterplanImgChange = async (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const storageRef = ref(
        storage,
        "developer/" + event.target.files[i].name
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
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            setNewData((prev) => ({
              ...prev,
              masterplan: downloadURL,
            }));
            setBtn(false);
            // Add a new document in collection "cities"
          });
        }
      );
    }
  };
  const handleFiletowChange = async (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const storageRef = ref(
        storage,
        "developer/" + event.target.files[i].name
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
          setProg2(progress);
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
              layoutImage: downloadURL,
            }));
            setBtn(false);
            // Add a new document in collection "cities"
          });
        }
      );
    }
  };
  const sendData = async () => {
    setBtn(true);
    try {
      const id = new Date().getTime();
      await setDoc(doc(db, "inventory", `${id}`), {
        id: `${id}`,
        ...newData, // هنا بنضيف كل الداتا اللي جوه newData
      });
    } catch (er) {}
    setBtn(false);
  };
  // console.log(arr);
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
          <Typography variant="h5">inventory</Typography>
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
          <Stack
            onSubmit={async (e) => {
              e.preventDefault();
              sendData();
              setMessege(true);
              setTimeout(() => {
                setMessege(false);
                nav("/");
              }, 2000);
            }}
            sx={{ width: "100%", alignItems: "center" }}
            component="form"
          >
            <FormControl sx={{ width: { xs: "100%", md: "50%" } }}>
              <InputLabel id="demo-simple-select-label">Dev</InputLabel>
              <Select
                sx={{ minWidth: "fit-content" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newData.dev?.id || ""} // نخزن ونعرض الـ id
                onChange={(e) => {
                  const selectedDev = data.find(
                    (dev) => dev.id === e.target.value
                  ); // نرجع الكائن كامل
                  setNewData({ ...newData, [e.target.name]: selectedDev }); // نخزنه في newData
                }}
                label="Dev"
                name="dev"
              >
                {data.map((devName) => {
                  return (
                    <MenuItem key={devName.id} value={devName.id}>
                      {devName.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              id="outlined-multiline-static"
              label=" Description"
              name="description"
              multiline
              value={newData.description}
              rows={4}
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value });
              }}
              sx={{
                margin: "10px 0",
                // padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
            />
            <TextField
              id="outlined-multiline-static"
              label=" Description bold"
              rows={4}
              name="descbold"
              value={newData.descbold}
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value });
              }}
              sx={{
                margin: "10px 0",
                // padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
            />
            <FormGroup sx={{ flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
              {checkboxes.map((label) => (
                <FormControlLabel
                  key={label}
                  control={
                    <Checkbox
                      value={label}
                      onChange={handleCheckboxChange}
                      checked={newData.aminatis.includes(label)}
                      // عشان تكون متعلمه لو متضافه
                    />
                  }
                  label={label}
                />
              ))}
            </FormGroup>
            <TextField
              id="outlined-multiline-static"
              label="Dev Description list"
              multiline
              name="descriptionList"
              value={newData.descriptionList}
              rows={4}
              sx={{
                margin: "10px",
                padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value });
              }}
            />
            <FormControl sx={{ width: { xs: "100%", md: "50%" } }}>
              <InputLabel id="demo-simple-select-label">Dev</InputLabel>
              <Select
                sx={{ minWidth: "fit-content" }}
                labelId="demo-simple-label"
                id="demo-simple"
                value={newData.proj || ""} // نخزن ونعرض الـ id
                onChange={(e) => {
                  setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
                }}
                label="Project"
                name="proj"
              >
                {arr &&
                  arr.map((proj, index) => {
                    return (
                      <MenuItem key={index} value={proj}>
                        {proj}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <Box sx={{ width: { xs: "100%", md: "50%" }, padding: "5px" }}>
              <Typography variant="body2">
                Upload Your Project Images ...
              </Typography>
              <Button
                component="label"
                variant="outlined"
                sx={{ padding: "10px", margin: "15px" }}
                startIcon={<AddPhotoAlternate />}
                onChange={(e) => {
                  handleFileChange(e);
                }}
              >
                <VisuallyHiddenInput type="file" multiple />
              </Button>
              <LinearProgress variant="determinate" value={prog} />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "50%" }, padding: "5px" }}>
              <Typography variant="body2">Master plan Image ...</Typography>
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
                <VisuallyHiddenInput type="file" accept="image/*" />
              </Button>
              <LinearProgress variant="determinate" value={prog3} />
            </Box>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="mony-type-label">Money Type</InputLabel>
              <Select
                sx={{ minWidth: "fit-content" }}
                labelId="soldlap"
                id="demo-sold"
                name="moneyType"
                value={newData.moneyType} // نخزن ونعرض الـ id
                onChange={(e) => {
                  setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
                }}
                label="Money Type"
              >
                <MenuItem value={"dollar"}>Dollar</MenuItem>
                <MenuItem value={"pound"}>Pound</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{
                margin: "10px",
                padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
              id="Price"
              label="Total Price"
              variant="outlined"
              type="number"
              name="price"
              value={newData.price} // نخزن ونعرض الـ id
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
              }}
            />
            <TextField
              sx={{
                margin: "10px",
                padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
              id="downPayment"
              label="down Payment"
              variant="outlined"
              type="number"
              name="downPayment"
              value={newData.downPayment} // نخزن ونعرض الـ id
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
              }}
            />
            <TextField
              sx={{
                margin: "10px",
                padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
              id="remaining"
              label="remaining"
              variant="outlined"
              type="text"
              name="remaining"
              value={newData.remaining} // نخزن ونعرض الـ id
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
              }}
            />
            <TextField
              sx={{
                margin: "10px",
                padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
              id="month"
              label="Month"
              variant="outlined"
              type="number"
              name="month"
              value={newData.month} // نخزن ونعرض الـ id
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
              }}
            />
            <TextField
              sx={{
                margin: "10px",
                padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
              id="RoofArea"
              label="Roof Area"
              variant="outlined"
              type="number"
              name="roofArea"
              value={newData.roofArea} // نخزن ونعرض الـ id
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
              }}
            />
            <TextField
              sx={{
                margin: "10px",
                padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
              id="Land-area"
              label="Land Area"
              variant="outlined"
              type="number"
              name="landArea"
              value={newData.landArea} // نخزن ونعرض الـ id
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
              }}
            />
            <TextField
              sx={{
                margin: "10px",
                padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
              id="rental"
              label="Minimum rental period"
              variant="outlined"
              type="number"
              name="rental"
              value={newData.rental} // نخزن ونعرض الـ id
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
              }}
            />
            <TextField
              sx={{
                margin: "10px",
                padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
              id="RefNum"
              label="RefNum"
              variant="outlined"
              type="number"
              name="refNum"
              value={newData.refNum} // نخزن ونعرض الـ id
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
              }}
            />

            <TextField
              sx={{
                margin: "10px",
                padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
              id="Garden-area"
              label="Garden area"
              variant="outlined"
              type="number"
              name="gardenArea"
              value={newData.gardenArea} // نخزن ونعرض الـ id
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
              }}
            />
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="sold-label">Sold</InputLabel>
              <Select
                sx={{ minWidth: "fit-content" }}
                labelId="soldlap"
                id="demo-sold"
                label="SOLD OUT"
                name="soldOut"
                value={newData.soldOut} // نخزن ونعرض الـ id
                onChange={(e) => {
                  setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
                }}
              >
                <MenuItem value={"SOLD OUT"}>SOLD OUT</MenuItem>
                <MenuItem value={"Not"}>Not</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label">Delivery</InputLabel>
              <Select
                sx={{ minWidth: "fit-content" }}
                labelId="Delivery"
                id="Delivery-select"
                label="Delivery"
                name="delivery"
                value={newData.delivery} // نخزن ونعرض الـ id
                onChange={(e) => {
                  setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
                }}
              >
                <MenuItem value="Delivered">Delivered</MenuItem>
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
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="Floor-label">Floor</InputLabel>
              <Select
                sx={{ minWidth: "fit-content" }}
                labelId="soldlap"
                id="demo-Floor "
                label="Floor"
                name="floor"
                value={newData.floor} // نخزن ونعرض الـ id
                onChange={(e) => {
                  setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
                }}
              >
                <MenuItem value={"Typical"}>Typical</MenuItem>
                <MenuItem value={"Ground"}>Ground</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                sx={{ minWidth: "fit-content" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
                name="type"
                value={newData.type} // نخزن ونعرض الـ id
                onChange={(e) => {
                  setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
                }}
              >
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="Duplex">Duplex</MenuItem>
                <MenuItem value="Studio">Studio</MenuItem>
                <MenuItem value="Penthouse">Penthouse</MenuItem>
                <MenuItem value="Family">Family house</MenuItem>
                <MenuItem value="Standalone">Standalone</MenuItem>
                <MenuItem value="Twin house">Twin house</MenuItem>
                <MenuItem value="One storey Villa">One storey Villa</MenuItem>
                <MenuItem value="Chalet">Chalet</MenuItem>
                <MenuItem value="Townhouse">Townhouse</MenuItem>
                <MenuItem value="Cabin">Cabin</MenuItem>
                <MenuItem value="Clinic">Clinic</MenuItem>
                <MenuItem value="Office">Office</MenuItem>
                <MenuItem value="Retail">Retail</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{
                margin: "10px",
                padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
              id="arya"
              label="Area(m)"
              variant="outlined"
              type="number"
              name="arya"
              value={newData.arya} // نخزن ونعرض الـ id
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
              }}
            />
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="Bedrooms">Bedrooms</InputLabel>
              <Select
                sx={{ minWidth: "fit-content" }}
                labelId="demo-simple-select-label"
                id="Bedroom"
                label="Bedrooms"
                name="bedroom"
                value={newData.bedroom} // نخزن ونعرض الـ id
                onChange={(e) => {
                  setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
                }}
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
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="Bathrooms">Bathrooms</InputLabel>
              <Select
                sx={{ minWidth: "fit-content" }}
                labelId="demo-simple-select-label"
                id="Bathroom"
                label="Bathrooms"
                name="bathroom"
                value={newData.bathroom} // نخزن ونعرض الـ id
                onChange={(e) => {
                  setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{ width: { xs: "100%", md: "50%" }, padding: "5px" }}
            >
              <FormLabel required id="demo-row-radio-buttons-group-label">
                Finishing
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                itemProp="required"
                name="finishing"
                value={newData.finishing} // نخزن ونعرض الـ id
                onChange={(e) => {
                  setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
                }}
              >
                <FormControlLabel
                  value="Finished"
                  control={<Radio />}
                  label="Finished"
                />
                <FormControlLabel
                  value="Semi Finished"
                  control={<Radio />}
                  label="Semi Finished"
                />
                <FormControlLabel
                  value="Cor & Shell"
                  control={<Radio />}
                  label="Cor & Shell"
                />
                <FormControlLabel
                  value="Furnished"
                  control={<Radio />}
                  label="Furnished"
                />
              </RadioGroup>
            </FormControl>
            <Box sx={{ width: { xs: "100%", md: "50%" }, padding: "5px" }}>
              <Typography variant="body2">Layout Image ...</Typography>
              <Button
                component="label"
                variant="outlined"
                sx={{ padding: "10px", margin: "15px" }}
                startIcon={<AddPhotoAlternate />}
                onChange={(e) => {
                  handleFiletowChange(e);
                }}
              >
                <VisuallyHiddenInput type="file" multiple />
              </Button>
              <LinearProgress variant="determinate" value={prog2} />
            </Box>
            <FormControl
              required
              sx={{ width: { xs: "100%", md: "50%" }, padding: "5px" }}
            >
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="status"
                value={newData.status} // نخزن ونعرض الـ id
                onChange={(e) => {
                  setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
                }}
              >
                <FormControlLabel
                  value="Resale"
                  control={<Radio />}
                  label="Resale"
                />
                <FormControlLabel
                  value="Rent"
                  control={<Radio />}
                  label="Rent"
                />
              </RadioGroup>
            </FormControl>
            {/* <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              sx={{
                margin: "10px",
                padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
              name="description"
              value={newData.description} // نخزن ونعرض الـ id
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
              }}
            /> */}

            <TextField
              id="About-multiline-static"
              label="About"
              multiline
              rows={4}
              sx={{
                margin: "10px",
                padding: "5px",
                width: { xs: "100%", md: "50%" },
              }}
              name="about"
              value={newData.about} // نخزن ونعرض الـ id
              onChange={(e) => {
                setNewData({ ...newData, [e.target.name]: e.target.value }); // نخزنه في newData
              }}
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
          </Stack>
        </Card>
      </Box>
      {/* <p
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
      </p> */}
    </>
  );
}

export default Inventory;
