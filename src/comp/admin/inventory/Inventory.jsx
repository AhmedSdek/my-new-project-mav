import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { db, storage } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import ReactLoading from "react-loading";
import "react-phone-input-2/lib/style.css";
import { HelpOutline } from "@mui/icons-material";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useCollection } from "react-firebase-hooks/firestore";
import Input from "../Input";
import FormGro from "../FormGro";
import FileUpload from "../FileUpload";
import RadioCom from "../RadioCom";
import CheckboxCom from "../CheckboxCom";

function Inventory() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [prog, setProg] = useState(0);
  const [prog3, setProg3] = useState(0);
  const [prog2, setProg2] = useState(0);
  const [btn, setBtn] = useState(false);
  const [messege, setMessege] = useState(false);
  // const [developers, setDevelopers] = useState([]);
  // console.log(developers[0])
  const [newData, setNewData] = useState({
    // dev: null,
    Dis: "",
    devid: "",
    compoundName: "",
    img: [],
    monyType: "",
    Area: "",
    imgtext: "",
    Masterimg: "",
    Layoutimg: "",
    Bed: "",
    Bath: "",
    Location: "",
    Sale: "",
    Finsh: "",
    icon: "",
    devname: "",
    aminatis: [],
    // descriptionList: "",
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
    // status: "",
    sold: "",
    delivery: "",
    floor: "",
    Type: "",
  });
  const handleCheckboxChange = useCallback((e) => {
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
  }, []);
  const [value, loading, error] = useCollection(collection(db, "admin"));
  const [devData, devLoading, devError] = useCollection(collection(db, "developers"));
  const developers = devData?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) || [];

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const arr = [];
    if (value) {
      value.docs.forEach((e) => {
        e.data().dev.forEach((it) => {
          if (!arr.includes(it.proj) && it.proj !== "") {
            arr.push(it.proj);
          }
        });
      });
    }
    setProjects(arr);
  }, [value]);
  const handleFileChange = useCallback(async (event) => {
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
              img: [...prev.img, downloadURL],
            }));
            setBtn(false);
            // Add a new document in collection "cities"
          });
        }
      );
    }
  }, []);
  const handleMasterplanImgChange = useCallback(async (event) => {
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
              Masterimg: downloadURL,
            }));
            setBtn(false);
            // Add a new document in collection "cities"
          });
        }
      );
    }
  }, []);
  const handleFiletowChange = useCallback(
    async (event) => {
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
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProg2(progress);
            if (i < event.target.files.length) {
              setBtn(true);
            }
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
              case "storage/canceled":
              case "storage/unknown":
                break;
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setNewData((prev) => ({
                ...prev,
                Layoutimg: downloadURL,
              }));
              setBtn(false);
            });
          }
        );
      }
    },
    [storage]
  ); // حط هنا كل الحاجات اللي بتتغير وبتستخدمها جوا الفانكشن
  const sendData = async (dataToSend) => {
    setBtn(true);
    try {
      const id = new Date().getTime();
      await setDoc(doc(db, "inventory", `${id}`), {
        id: `${id}`,
        ...dataToSend,
      });
      setTimeout(() => {
        setMessege(false);
        nav("/");
      }, 2000);
    } catch (er) {
      console.error("Send error:", er);
    }
    setBtn(false);
  };

  const onchange = useCallback((e) => {
    setNewData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  const onsubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // console.log(newData);
      await sendData(newData);
    },
    [newData] // لازم تضيف newData هنا عشان يشوف النسخة المحدثة
  );

  const monyType = useMemo(() => ["dollar", "pound"], []);
  const soldOutOptions = useMemo(() => ["SOLD OUT", "Not"], []);
  const deliveryOptions = useMemo(
    () => [
      "Delivered",
      "Rtm",
      "2024",
      "2025",
      "2026",
      "2027",
      "2028",
      "2029",
      "2030",
      "2031",
      "2032",
    ],
    []
  );
  const floorOptions = useMemo(() => ["Typical", "Ground"], []);
  const typeOptions = useMemo(
    () => [
      "Apartment",
      "Duplex",
      "Studio",
      "Penthouse",
      "Family",
      "Standalone",
      "Twin house",
      "Clinic",
      "Office",
      "Retail",
      "Cabin",
      "Townhouse",
      "Chalet",
      "One storey Villa",
    ],
    []
  );
  const bedroomOptions = useMemo(
    () => ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    []
  );
  const bathroomOptions = useMemo(() => ["1", "2", "3", "4", "5"], []);
  const finshOptions = useMemo(
    () => ["Finished", "Semi Finished", "Cor & Shell", "Furnished"],
    []
  );
  const statusOptions = useMemo(() => ["Resale", "Rent"], []);
  const checkBoxOptions = useMemo(() => [
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
  ], []);
  // const handleDevChange = useCallback(
  //   (e) => {
  //     const selectedDev = data.find((dev) => dev.id === e.target.value);
  //     setNewData((prev) => ({ ...prev, [e.target.name]: selectedDev }));
  //   },
  //   [data]
  // );
  const handleDevChange = useCallback(
    (e) => {
      const selectedDev = developers.find((dev) => dev.id === e.target.value);
      if (selectedDev) {
        console.log(selectedDev)
        setNewData((prev) => ({
          ...prev,
          devid: selectedDev.id,
          icon: selectedDev.img || "",
          devname: selectedDev.name || "",
        }));
      }
    },
    [developers]
  );
  // console.log(developers)
  return (

    <Box className="w-full flex flex-col justify-center align-items-center pt-16">
      <Stack className="align-items-center mb-2.5">
        <Typography variant="h5">inventory</Typography>
      </Stack>
      <Card
        onSubmit={onsubmit}
        component="form"
        sx={{ gap: '10px' }}
        className="sm:w-11/12 md:w-4/5 flex align-items-center flex-col p-5 mt-2.5 mb-2.5"
      >
        <FormGro
          label="Dev"
          name="dev"
          data={developers}
          inputLabel="Dev"
          value={newData.devid || ""} // نخزن ونعرض الـ id
          fun={handleDevChange}
        />
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
          rows={4}
          label=" Description"
          multiline
          id="outlined-multiline-static"
        />
        {/* <Input
              name="descriptionList"
              value={newData.descriptionList}
              onChange={onchange}
              rows={4}
              label="Dev Description list"
              multiline
            /> */}
        <CheckboxCom
          data={checkBoxOptions}
          handleCheckboxChange={handleCheckboxChange}
          name={newData.aminatis}
        />
        <FormGro
          label="Compound"
          name="compoundName"
          data={projects}
          inputLabel="Compound"
          value={newData.compoundName || ""} // نخزن ونعرض الـ id
          fun={onchange}
        />
        <FileUpload handleFileChange={handleFileChange} prog={prog} title='imges' />
        <Input
          onChange={onchange}
          type="text"
          id="imgtext"
          label="img text"
          name="imgtext"
          value={newData.imgtext} // نخزن ونعرض الـ id
        />
        <FileUpload handleFileChange={handleMasterplanImgChange} prog={prog3} title='Master img' />
        <FormGro
          label="Money Type"
          name="monyType"
          data={monyType}
          value={newData.monyType || ""} // نخزن ونعرض الـ id
          fun={onchange}
          inputLabel="Money Type"
        />
        <Input
          onChange={onchange}
          id="Price"
          label="Total Price"
          type="number"
          name="price"
          value={newData.price} // نخزن ونعرض الـ id
        />
        <Input
          onChange={onchange}
          type="text"
          id="Location"
          label="Location"
          name="Location"
          value={newData.Location} // نخزن ونعرض الـ id
        />
        <Input
          onChange={onchange}
          type="number"
          id="downPayment"
          label="down Payment"
          name="downPayment"
          value={newData.downPayment} // نخزن ونعرض الـ id
        />
        <Input
          onChange={onchange}
          id="remaining"
          label="remaining"
          name="remaining"
          value={newData.remaining} // نخزن ونعرض الـ id
          type="text"
        />
        <Input
          onChange={onchange}
          id="month"
          label="Month"
          variant="outlined"
          type="number"
          name="month"
          value={newData.month} // نخزن ونعرض الـ id
        />
        <Input
          onChange={onchange}
          variant="outlined"
          id="RoofArea"
          label="Roof Area"
          type="number"
          name="roofArea"
          value={newData.roofArea} // نخزن ونعرض الـ id
        />
        <Input
          onChange={onchange} // نخزن ونعرض الـ id
          id="Land-area"
          label="Land Area"
          variant="outlined"
          type="number"
          name="landArea"
          value={newData.landArea} // نخزن ونعرض الـ id
        />
        <Input
          onChange={onchange}
          id="rental"
          label="Minimum rental period"
          variant="outlined"
          type="number"
          name="rental"
          value={newData.rental} // نخزن ونعرض الـ id
        />

        <Input
          onChange={onchange}
          id="RefNum"
          label="RefNum"
          variant="outlined"
          type="number"
          name="refNum"
          value={newData.refNum} // نخزن ونعرض الـ id
        />

        <Input
          onChange={onchange}
          id="Garden-area"
          label="Garden area"
          variant="outlined"
          type="number"
          name="gardenArea"
          value={newData.gardenArea} // نخزن ونعرض الـ id
        />

        <FormGro
          label="SOLD OUT"
          name="sold"
          data={soldOutOptions}
          value={newData.sold || ""} // نخزن ونعرض الـ id
          fun={onchange}
          inputLabel="Sold"
        />

        <FormGro
          label="Delivery"
          name="delivery"
          data={deliveryOptions}
          value={newData.delivery || ""} // نخزن ونعرض الـ id
          fun={onchange}
          inputLabel="Delivery"
        />
        <FormGro
          label="Floor"
          name="floor"
          data={floorOptions}
          value={newData.floor || ""} // نخزن ونعرض الـ id
          fun={onchange}
          inputLabel="Floor"
        />
        <FormGro
          label="Type"
          name="Type"
          data={typeOptions}
          value={newData.Type || ""} // نخزن ونعرض الـ id
          fun={onchange}
          inputLabel="Type"
        />
        <Input
          onChange={onchange}
          id="area"
          label="Area(m)"
          variant="outlined"
          type="number"
          name="Area"
          value={newData.Area} // نخزن ونعرض الـ id
        />
        <FormGro
          label="Bedrooms"
          name="Bed"
          data={bedroomOptions}
          value={newData.Bed || ""} // نخزن ونعرض الـ id
          fun={onchange}
          inputLabel="Bedrooms"
        />
        <FormGro
          label="Bathrooms"
          name="Bath"
          data={bathroomOptions}
          value={newData.Bath || ""} // نخزن ونعرض الـ id
          fun={onchange}
          inputLabel="Bathrooms"
        />
        <RadioCom
          data={finshOptions}
          name="Finsh"
          value={newData.Finsh}
          onChange={onchange}
        />
        <FileUpload handleFileChange={handleFiletowChange} prog={prog2} title='Layout img' />
        <RadioCom
          name="Sale"
          data={statusOptions}
          value={newData.Sale}
          onChange={onchange}
        />
        <Button
          disabled={btn}
          variant="contained"
          type="submit"
          className="btn w-1/2"
        >
          {btn ? (
            <ReactLoading type={"spin"} height={"20px"} width={"20px"} />
          ) : (
            "Send"
          )}
        </Button>
      </Card>
    </Box>
  );
}

export default memo(Inventory);
