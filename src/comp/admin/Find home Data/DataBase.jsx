// import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import { db, storage } from '../../../firebase/config';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button, Card, Dialog, DialogContent, Divider, IconButton, Stack, Typography, styled } from '@mui/material';
// import ReactLoading from 'react-loading';
// import 'react-phone-input-2/lib/style.css'
// import { HelpOutline, Info } from '@mui/icons-material';
// import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import FormGro from '../FormGro';
// import Input from '../Input';
// import CheckboxCom from '../CheckboxCom';
// import FileUpload from '../FileUpload';
// import MavLoading from '../../Loading/MavLoading';
// import { useTranslation } from 'react-i18next';

// function DataBase() {
//   const [developers, setDevelopers] = useState([]);
//   const { i18n } = useTranslation();
//   const lang = i18n.language; // هيطلع "ar" أو "en"
//   const [devLoading, setDevLoading] = useState(true);
//   const [devError, setDevError] = useState("");
//   const [messege, setMessege] = React.useState(false);
//   const nav = useNavigate()
//   const [open, setOpen] = useState(false);
//   const [btn, setBtn] = useState(false);
//   const [prog3, setProg3] = useState(0)
//   const [prog, setProg] = useState(0)
//   useEffect(() => {
//     const fetchDevelopers = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "developer"));
//         const devs = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setDevelopers(devs);
//       } catch (err) {
//         console.error("خطأ أثناء جلب المطورين:", err);
//         setDevError("حدث خطأ أثناء تحميل البيانات.");
//       } finally {
//         setDevLoading(false);
//       }
//     };

//     fetchDevelopers();
//   }, []);
//   const [newData, setNewData] = useState({
//     developer: {},
//     proj: "",
//     projImgs: [],
//     district: "",
//     price: 0,
//     projDes: "",
//     masterplanImg: [],
//     Location: "",
//     aminatis: [],
//     type: [],
//     pers1: "",
//     year1: "",
//     pers2: "",
//     year2: "",
//     pers3: "",
//     year3: "",
//     pers4: "",
//     year4: "",
//     offer1: "",
//     offer2: "",
//     offer3: "",
//     offer4: "",
//   });
//   const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
//   });
//   const handleDevChange = useCallback(
//     (e) => {
//       const selectedDev = developers.find((dev) => dev.id === e.target.value);
//       console.log(selectedDev)
//       if (selectedDev) {
//         setNewData((prev) => ({
//           ...prev,
//           developer: selectedDev
//         }));
//       }
//     },
//     [developers]
//   );
//   const handleChange = useCallback((e) => {
//     setNewData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   }, []);
//   const handleFileChange = useCallback(async (event) => {
//     for (let i = 0; i < event.target.files.length; i++) {
//       const storageRef = ref(
//         storage,
//         "developer/" + event.target.files[i].name
//       );
//       const uploadTask = uploadBytesResumable(
//         storageRef,
//         event.target.files[i]
//       );

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           // console.log('Upload is ' + progress + '% done');
//           setProg(progress);
//           if (i < event.target.files.length) {
//             setBtn(true);
//           }
//           switch (snapshot.state) {
//             case "paused":
//               console.log("Upload is paused");
//               break;
//             case "running":
//               console.log("Upload is running");
//               break;
//           }
//         },
//         (error) => {
//           // A full list of error codes is available at
//           // https://firebase.google.com/docs/storage/web/handle-errors
//           switch (error.code) {
//             case "storage/unauthorized":
//               // User doesn't have permission to access the object
//               break;
//             case "storage/canceled":
//               // User canceled the upload
//               break;

//             // ...

//             case "storage/unknown":
//               // Unknown error occurred, inspect error.serverResponse
//               break;
//           }
//         },
//         () => {
//           // Upload completed successfully, now we can get the download URL
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             console.log("File available at", downloadURL);
//             setNewData((prev) => ({
//               ...prev,
//               projImgs: [...prev.projImgs, downloadURL],
//             }));
//             setBtn(false);
//             // Add a new document in collection "cities"
//           });
//         }
//       );
//     }
//   }, []);
//   const handleCheckboxChange = useCallback((selectedItem) => {
//     setNewData((prev) => {
//       const exists = prev.aminatis.some(
//         (item) => item.en === selectedItem.en && item.ar === selectedItem.ar
//       );
//       if (exists) {
//         return {
//           ...prev,
//           aminatis: prev.aminatis.filter(
//             (item) => item.en !== selectedItem.en || item.ar !== selectedItem.ar
//           )
//         };
//       } else {
//         return {
//           ...prev,
//           aminatis: [...prev.aminatis, selectedItem]
//         };
//       }
//     });
//   }, []);

//   const handleCheckbox2Change = useCallback((e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setNewData((prev) => ({
//         ...prev,
//         type: [...prev.type, value],
//       }));
//     } else {
//       setNewData((prev) => ({
//         ...prev,
//         type: prev.type.filter((item) => item !== value),
//       }));
//     }
//   }, []);
//   const handleMasterplanImgChange = useCallback(async (event) => {
//     for (let i = 0; i < event.target.files.length; i++) {
//       // console.log(i)
//       const storageRef = ref(storage, event.target.files[i].name);
//       const uploadTask = uploadBytesResumable(storageRef, event.target.files[i]);

//       uploadTask.on('state_changed',
//         (snapshot) => {
//           // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           // console.log('Upload is ' + progress + '% done');
//           setProg3(progress);
//           if (i < event.target.files.length) {
//             setBtn(true)
//           }
//           switch (snapshot.state) {
//             case 'paused':
//               console.log('Upload is paused');
//               break;
//             case 'running':
//               console.log('Upload is running');
//               break;
//           }
//         },
//         (error) => {
//           // A full list of error codes is available at
//           // https://firebase.google.com/docs/storage/web/handle-errors
//           switch (error.code) {
//             case 'storage/unauthorized':
//               // User doesn't have permission to access the object
//               break;
//             case 'storage/canceled':
//               // User canceled the upload
//               break;

//             // ...

//             case 'storage/unknown':
//               // Unknown error occurred, inspect error.serverResponse
//               break;
//           }
//         },
//         () => {
//           // Upload completed successfully, now we can get the download URL
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             console.log('File available at', downloadURL);
//             setNewData((prev) => ({
//               ...prev,
//               masterplanImg: [...prev.masterplanImg, downloadURL],
//             }));
//             setBtn(false)
//             // Add a new document in collection "cities"
//           });
//         }
//       );
//     }
//   }, []);
//   const checkBoxOptions1 = useMemo(() => [
//     { en: "Clubhouse", ar: "النادي الاجتماعي" },
//     { en: "Commercial Strip", ar: "الشريط التجاري" },
//     { en: "Underground Parking", ar: "مواقف سيارات تحت الأرض" },
//     { en: "Outdoor Pools", ar: "حمامات سباحة خارجية" },
//     { en: "Jogging Trail", ar: "مسار للجري" },
//     { en: "Bicycles Lanes", ar: "مسارات للدراجات" },
//     { en: "Business Hub", ar: "مركز أعمال" },
//     { en: "Schools", ar: "مدارس" },
//     { en: "Sports Clubs", ar: "أندية رياضية" },
//     { en: "Livability", ar: "جودة الحياة" },
//     { en: "Infrastructure", ar: "البنية التحتية" },
//     { en: "mosque", ar: "مسجد" },
//     { en: "children area", ar: "منطقة للأطفال" },
//     { en: "kids' area", ar: "منطقة لعب للأطفال" },
//     { en: "gym", ar: "صالة رياضية (جيم)" },
//     { en: "spa", ar: "مركز سبا" },
//     { en: "Educational hub", ar: "مركز تعليمي" },
//     { en: "Commercial area", ar: "منطقة تجارية" },
//     { en: "Medical centre", ar: "مركز طبي" }
//   ]
//     , []);
//   const checkBoxOptions2 = useMemo(() => [
//     "Villa",
//     "Retail",
//     "Office",
//     "Cabin",
//     "Clinic",
//     "Townhouse",
//     "Chalet",
//     "One storey Villa",
//     "Twin house",
//     "Standalone",
//     "Family house",
//     "Penthouse",
//     "Studio",
//     "Duplex",
//     "Apartment"
//   ], []);
//   const sendProjectToFirebase = async () => {
//     if (!newData.devid || !newData.proj) {
//       alert("برجاء اختيار مطور وكتابة اسم المشروع");
//       return;
//     }
//     setBtn(true);
//     try {
//       const id = new Date().getTime();
//       const projectObject = {
//         proj: newData.proj,
//         projImgs: newData.projImgs,
//         district: newData.district,
//         price: newData.price,
//         projDes: newData.projDes,
//         masterplanImg: newData.masterplanImg,
//         id: id.toString(),
//         Location: newData.Location,
//         aminatis: newData.aminatis,
//         type: newData.type,
//         pers1: newData.pers1,
//         year1: newData.year1,
//         pers2: newData.pers2,
//         year2: newData.year2,
//         pers3: newData.pers3,
//         year3: newData.year3,
//         pers4: newData.pers4,
//         year4: newData.year4,
//         offer1: newData.offer1,
//         offer2: newData.offer2,
//         offer3: newData.offer3,
//         offer4: newData.offer4,
//       };
//       const docRef = doc(db, "admin", newData.devName);
//       const docSnap = await getDoc(docRef);
//       if (!docSnap.exists()) {
//         await setDoc(docRef, {
//           devName: newData.devName,
//           devIcon: newData.devIcon,
//           id: newData.devName,
//           devDis: newData.devDis,
//           dev: [projectObject],
//         });
//         alert("✅ تم إنشاء المطور وإضافة المشروع");
//       } else {
//         await updateDoc(docRef, {
//           dev: arrayUnion(projectObject),
//         });
//         alert("✅ تم إضافة المشروع للمطور الحالي");
//       }
//       nav('/dashboard')
//     } catch (err) {
//       console.error("❌ خطأ:", err);
//       alert("❌ حدث خطأ أثناء حفظ البيانات");
//     } finally {
//       setMessege(true);
//       setTimeout(() => {
//         setMessege(false);
//         nav("/dashboard");
//       }, 1000);
//     }
//     setBtn(false);
//   };
//   const onsubmit = useCallback(
//     async (e) => {
//       e.preventDefault();
//       console.log(newData);
//       // await sendProjectToFirebase(newData);
//     },
//     [newData] // لازم تضيف newData هنا عشان يشوف النسخة المحدثة
//   );
//   if (devLoading) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <MavLoading />
//       </div>
//     )
//   }
//   return (
//     <>
//       <Box
//         style={{
//           width: "100%",
//           flexDirection: "column",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "70px 0 0",
//         }}
//       >
//         <Stack sx={{ alignItems: "center", marginBottom: "10px" }}>
//           <Typography variant="h5">DataBase</Typography>
//         </Stack>
//         <Card
//           sx={{
//             width: { xs: "90%", sm: "80%" },
//             display: "flex",
//             alignItems: "center",
//             flexDirection: "column",
//             padding: "20px",
//             margin: "10px 0 ",
//           }}
//         >
//           <Box
//             component="form"
//             onSubmit={onsubmit}
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               flexDirection: "column",
//               width: "100%",
//               margin: "15px 0 0",
//               gap: '10px'
//             }}
//           >
//             <FormGro
//               inputLabel={lang === "ar" ? "اختر المطور" : "Select Developer"}
//               name="dev"
//               data={developers}
//               value={newData.developer?.id || ""}
//               fun={handleDevChange}
//               lang={lang}
//             />
//             <CheckboxCom
//               data={checkBoxOptions1}
//               handleCheckboxChange={handleCheckboxChange}
//               name={newData.aminatis}
//               lang={lang}
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="Compound Name"
//               label={lang === "ar" ? "اسم الكومباوند" : "Compound Name"}
//               variant="outlined"
//               type="text"
//               name="proj"
//               value={newData.proj} // نخزن ونعرض الـ id
//             />
//             <Divider />
//             <FileUpload handleFileChange={handleFileChange} prog={prog}
//               title={lang === "ar" ? "ارفع صور المشروع" : 'Upload Your Project Images ...'}
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="district"
//               label={lang === "ar" ? "المنطقة" : "District"}
//               variant="outlined"
//               type="text"
//               name="district"
//               value={newData.district} // نخزن ونعرض الـ id
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="price"
//               label={lang === "ar" ? "السعر" : "price"}
//               variant="outlined"
//               type="number"
//               name="price"
//               value={newData.price} // نخزن ونعرض الـ id
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="pers1"
//               label="pers1"
//               variant="outlined"
//               type="number"
//               name="pers1"
//               value={newData.pers1} // نخزن ونعرض الـ id
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="year1"
//               label="year1"
//               variant="outlined"
//               type="text"
//               name="year1"
//               value={newData.year1} // نخزن ونعرض الـ id
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="offer1"
//               label="offer1"
//               variant="outlined"
//               type="text"
//               name="offer1"
//               value={newData.offer1} // نخزن ونعرض الـ id
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="pers2"
//               label="pers2"
//               variant="outlined"
//               type="text"
//               name="pers2"
//               value={newData.pers2} // نخزن ونعرض الـ id
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="year2"
//               label="year2"
//               variant="outlined"
//               type="text"
//               name="year2"
//               value={newData.year2} // نخزن ونعرض الـ id
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="offer2"
//               label="offer2"
//               variant="outlined"
//               type="text"
//               name="offer2"
//               value={newData.offer2} // نخزن ونعرض الـ id
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="pers3"
//               label="pers3"
//               variant="outlined"
//               type="text"
//               name="pers3"
//               value={newData.pers3} // نخزن ونعرض الـ id
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="year3"
//               label="year3"
//               variant="outlined"
//               type="text"
//               name="year3"
//               value={newData.year3} // نخزن ونعرض الـ id
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="offer3"
//               label="offer3"
//               variant="outlined"
//               type="text"
//               name="offer3"
//               value={newData.offer3} // نخزن ونعرض الـ id
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="pers4"
//               label="pers4"
//               variant="outlined"
//               type="text"
//               name="pers4"
//               value={newData.pers4} // نخزن ونعرض الـ id
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="year4"
//               label="year4"
//               variant="outlined"
//               type="text"
//               name="year4"
//               value={newData.year4} // نخزن ونعرض الـ id
//             />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="offer4"
//               label="offer4"
//               variant="outlined"
//               type="text"
//               name="offer4"
//               value={newData.offer4} // نخزن ونعرض الـ id
//             />
//             <IconButton onClick={() => setOpen(true)}>
//               <HelpOutline />
//             </IconButton>
//             <Dialog open={open} onClose={() => setOpen(false)}>
//               <DialogContent>
//                 <Typography style={{ whiteSpace: "pre-wrap", fontSize: "0.9rem" }}>
//                   {`📝 إزاي تستخدم Markdown:
// # عنوان رئيسي
// ## عنوان فرعي
// ### عنوان
// #### عنوان
// ##### عنوان
// ###### عنوان
// * نص مائل
// ** نص عريض
// ~~ نص مشطوب
// - قائمة نقطية
// 1. قائمة مرقمة
// > اقتباس
// `}{" "}
//                 </Typography>
//               </DialogContent>
//             </Dialog>
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="projectDes"
//               label="project Des"
//               variant="outlined"
//               type="text"
//               name="projDes"
//               value={newData.projDes} // نخزن ونعرض الـ id
//               multiline
//               rows={4}
//             />
//             <FileUpload handleFileChange={handleMasterplanImgChange} prog={prog3} title='Master plan Images ...' />
//             <Input
//               onChange={handleChange} // نخزن ونعرض الـ id
//               id="location"
//               label="Location"
//               variant="outlined"
//               type="text"
//               name="Location"
//               value={newData.Location} // نخزن ونعرض الـ id
//             />
//             <Button
//               disabled={btn}
//               variant="contained"
//               type="submit"
//               style={{ width: "50%" }}
//               className="btn"
//             >
//               {btn ? (
//                 <ReactLoading type={"spin"} height={"20px"} width={"20px"} />
//               ) : (
//                 "Send"
//               )}
//             </Button>
//           </Box>
//         </Card>
//       </Box>
//       <p
//         style={{
//           zIndex: "10",
//           backgroundColor: "whitesmoke",
//           display: "flex",
//           alignItems: "center",
//           color: "black",
//           padding: "10px",
//           borderRadius: "6px",
//           boxShadow: "rgb(255 255 255 / 25%) 0px 5px 30px 0px",
//           position: "fixed",
//           top: "100px",
//           right: messege ? "20px" : "-230px",
//           transition: "0.8s",
//           scale: messege ? "1" : "0",
//         }}
//       >
//         Data has been sent successfully{" "}
//         <Info
//           style={{ margin: "3px 0 0 10px", fontSize: "20px", color: "teal" }}
//         />
//       </p>
//     </>
//   );
// }
// export default DataBase
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { db, storage } from '../../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Dialog, DialogContent, Divider, IconButton, Stack, Typography, styled } from '@mui/material';
import ReactLoading from 'react-loading';
import { HelpOutline, Info } from '@mui/icons-material';
import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import FormGro from '../FormGro';
import Input from '../Input';
import CheckboxCom from '../CheckboxCom';
import FileUpload from '../FileUpload';
import MavLoading from '../../Loading/MavLoading';
import { useTranslation } from 'react-i18next';

function DataBase() {
  const [developers, setDevelopers] = useState([]);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [devLoading, setDevLoading] = useState(true);
  const [messege, setMessege] = useState(false);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [btn, setBtn] = useState(false);
  const [prog3, setProg3] = useState(0);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "developer"));
        const devs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDevelopers(devs);
      } catch (err) {
        console.error("خطأ أثناء جلب المطورين:", err);
      } finally {
        setDevLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  const [newData, setNewData] = useState({
    developer: {},
    proj: "",
    projImgs: [],
    district: "",
    price: 0,
    projDes: "",
    masterplanImg: [],
    Location: "",
    aminatis: [],
    type: [],
  });

  const [offers, setOffers] = useState([{ pers: "", year: "", offer: "" }]);

  const handleDevChange = useCallback(
    (e) => {
      const selectedDev = developers.find((dev) => dev.id === e.target.value);
      if (selectedDev) {
        setNewData((prev) => ({
          ...prev,
          developer: selectedDev
        }));
      }
    },
    [developers]
  );

  const handleChange = useCallback((e) => {
    setNewData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleFileChange = useCallback(async (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const storageRef = ref(storage, "developer/" + event.target.files[i].name);
      const uploadTask = uploadBytesResumable(storageRef, event.target.files[i]);
      uploadTask.on("state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProg(progress);
          if (i < event.target.files.length) setBtn(true);
        },
        (error) => console.error(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setNewData((prev) => ({
              ...prev,
              projImgs: [...prev.projImgs, downloadURL],
            }));
            setBtn(false);
          });
        }
      );
    }
  }, []);

  const handleMasterplanImgChange = useCallback(async (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const storageRef = ref(storage, event.target.files[i].name);
      const uploadTask = uploadBytesResumable(storageRef, event.target.files[i]);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProg3(progress);
          if (i < event.target.files.length) setBtn(true);
        },
        (error) => console.error(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setNewData((prev) => ({
              ...prev,
              masterplanImg: [...prev.masterplanImg, downloadURL],
            }));
            setBtn(false);
          });
        }
      );
    }
  }, []);

  const handleCheckboxChange = useCallback((selectedItem) => {
    setNewData((prev) => {
      const exists = prev.aminatis.some(
        (item) => item.en === selectedItem.en && item.ar === selectedItem.ar
      );
      return {
        ...prev,
        aminatis: exists
          ? prev.aminatis.filter(
            (item) => item.en !== selectedItem.en || item.ar !== selectedItem.ar
          )
          : [...prev.aminatis, selectedItem]
      };
    });
  }, []);

  const handleCheckbox2Change = useCallback((e) => {
    const { value, checked } = e.target;
    setNewData((prev) => ({
      ...prev,
      type: checked
        ? [...prev.type, value]
        : prev.type.filter((item) => item !== value),
    }));
  }, []);

  // Offers Handlers
  const handleOfferChange = useCallback((index, field) => (e) => {
    const value = e.target.value;
    setOffers((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  }, []);

  const addOffer = () => setOffers((prev) => [...prev, { pers: "", year: "", offer: "" }]);
  const removeOffer = (index) => setOffers((prev) => prev.filter((_, i) => i !== index));

  const checkBoxOptions1 = useMemo(() => [
    { en: "Clubhouse", ar: "النادي الاجتماعي" },
    { en: "Commercial Strip", ar: "الشريط التجاري" },
    { en: "Underground Parking", ar: "مواقف سيارات تحت الأرض" },
    { en: "Outdoor Pools", ar: "حمامات سباحة خارجية" },
    { en: "Jogging Trail", ar: "مسار للجري" },
    { en: "Bicycles Lanes", ar: "مسارات للدراجات" },
    { en: "Business Hub", ar: "مركز أعمال" },
    { en: "Schools", ar: "مدارس" },
    { en: "Sports Clubs", ar: "أندية رياضية" },
    { en: "Livability", ar: "جودة الحياة" },
    { en: "Infrastructure", ar: "البنية التحتية" },
    { en: "mosque", ar: "مسجد" },
    { en: "children area", ar: "منطقة للأطفال" },
    { en: "kids' area", ar: "منطقة لعب للأطفال" },
    { en: "gym", ar: "صالة رياضية (جيم)" },
    { en: "spa", ar: "مركز سبا" },
    { en: "Educational hub", ar: "مركز تعليمي" },
    { en: "Commercial area", ar: "منطقة تجارية" },
    { en: "Medical centre", ar: "مركز طبي" }
  ], []);

  const onsubmit = useCallback(async (e) => {
    e.preventDefault();
    const id = new Date().getTime();
    const projectObject = {
      ...newData,
      offers,
      id: id.toString()
    };
    try {
      setBtn(true);
      const docRef = doc(db, "admin", newData.developer.id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          ...newData.developer,
          dev: [projectObject],
        });
      } else {
        await updateDoc(docRef, {
          dev: arrayUnion(projectObject),
        });
      }
      setMessege(true);
      setTimeout(() => {
        setMessege(false);
        nav("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("❌ خطأ:", err);
    } finally {
      setBtn(false);
    }
  }, [newData, offers, nav]);

  if (devLoading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}><MavLoading /></div>
  }

  return (
    <>
      <Box style={{ width: "100%", flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center", padding: "70px 0 0" }}>
        <Stack sx={{ alignItems: "center", marginBottom: "10px" }}>
          <Typography variant="h5">DataBase</Typography>
        </Stack>
        <Card sx={{ width: { xs: "90%", sm: "80%" }, display: "flex", alignItems: "center", flexDirection: "column", padding: "20px", margin: "10px 0 " }}>
          <Box component="form" onSubmit={onsubmit} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%", margin: "15px 0 0", gap: '10px' }}>
            <FormGro inputLabel={lang === "ar" ? "اختر المطور" : "Select Developer"} name="dev" data={developers} value={newData.developer?.id || ""} fun={handleDevChange} lang={lang} />
            <CheckboxCom data={checkBoxOptions1} handleCheckboxChange={handleCheckboxChange} name={newData.aminatis} lang={lang} />
            <Input onChange={handleChange} id="Compound Name" label={lang === "ar" ? "اسم الكومباوند" : "Compound Name"} type="text" name="proj" value={newData.proj} />
            <Divider />
            <FileUpload handleFileChange={handleFileChange} prog={prog} title={lang === "ar" ? "ارفع صور المشروع" : 'Upload Your Project Images ...'} />
            <Input onChange={handleChange} id="district" label={lang === "ar" ? "المنطقة" : "District"} type="text" name="district" value={newData.district} />
            <Input onChange={handleChange} id="price" label={lang === "ar" ? "السعر" : "Price"} type="number" name="price" value={newData.price} />
            {offers.map((offer, index) => (
              <div key={index} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Input onChange={handleOfferChange(index, "pers")} label={`Pers ${index + 1}`} type="number" value={offer.pers} />
                <Input onChange={handleOfferChange(index, "year")} label={`Year ${index + 1}`} type="text" value={offer.year} />
                <Input onChange={handleOfferChange(index, "offer")} label={`Offer ${index + 1}`} type="text" value={offer.offer} />
                <Button onClick={() => removeOffer(index)} variant="outlined" color="error">Remove</Button>
              </div>
            ))}
            <Button onClick={addOffer} variant="contained" style={{ margin: "10px 0" }}>+ Add Offer</Button>
            <Input onChange={handleChange} id="projectDes" label="Project Description" type="text" name="projDes" value={newData.projDes} multiline rows={4} />
            <FileUpload handleFileChange={handleMasterplanImgChange} prog={prog3} title='Master plan Images ...' />
            <Input onChange={handleChange} id="location" label="Location" type="text" name="Location" value={newData.Location} />
            <Button disabled={btn} variant="contained" type="submit" style={{ width: "50%" }}>{btn ? <ReactLoading type={"spin"} height={"20px"} width={"20px"} /> : "Send"}</Button>
          </Box>
        </Card>
      </Box>
      <p style={{ zIndex: "10", backgroundColor: "whitesmoke", display: "flex", alignItems: "center", color: "black", padding: "10px", borderRadius: "6px", boxShadow: "rgb(255 255 255 / 25%) 0px 5px 30px 0px", position: "fixed", top: "100px", right: messege ? "20px" : "-230px", transition: "0.8s", scale: messege ? "1" : "0" }}>
        Data has been sent successfully <Info style={{ margin: "3px 0 0 10px", fontSize: "20px", color: "teal" }} />
      </p>
    </>
  );
}

export default DataBase;
