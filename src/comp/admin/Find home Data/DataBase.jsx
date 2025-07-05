import React, { useCallback, useEffect, useMemo, useState } from "react";
import { db, storage } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import ReactLoading from "react-loading";
import { Delete, HelpOutline, Info, Remove } from "@mui/icons-material";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import FormGro from "../FormGro";
import Input from "../Input";
import CheckboxCom from "../CheckboxCom";
import FileUpload from "../FileUpload";
import MavLoading from "../../Loading/MavLoading";
import { useTranslation } from "react-i18next";

function DataBase() {
  const [developers, setDevelopers] = useState([]);
  const [devLoading, setDevLoading] = useState(true);
  const { i18n } = useTranslation();
  const lang = i18n.language;
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
    compoundName: {
      ar: "",
      en: ""
    },
    compoundImgs: [],
    district: {
      ar: "",
      en: ""
    },
    price: 0,
    compoundDes: {
      ar: "",
      en: ""
    },
    masterplanImg: [],
    Location: {
      ar: "",
      en: ""
    },
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
          developer: selectedDev,
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
  const onchange = useCallback((parentKey, lang) => (e) => {
    setNewData((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [lang]: e.target.value
      }
    }));
  }, []);
  const handleFileChange = useCallback(async (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const storageRef = ref(
        storage,
        "compound/" + event.target.files[i].name
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
          setProg(progress);
          if (i < event.target.files.length) setBtn(true);
        },
        (error) => console.error(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setNewData((prev) => ({
              ...prev,
              compoundImgs: [...prev.compoundImgs, downloadURL],
            }));
            setBtn(false);
          });
        }
      );
    }
  }, []);

  const handleMasterplanImgChange = useCallback(async (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const storageRef = ref(storage, "compound/" + event.target.files[i].name);
      const uploadTask = uploadBytesResumable(
        storageRef,
        event.target.files[i]
      );
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            (item) =>
              item.en !== selectedItem.en || item.ar !== selectedItem.ar
          )
          : [...prev.aminatis, selectedItem],
      };
    });
  }, []);

  const handleCheckbox2Change = useCallback((selectedItem) => {
    setNewData((prev) => {
      const exists = prev.type.some(
        (item) => item.en === selectedItem.en && item.ar === selectedItem.ar
      );
      return {
        ...prev,
        type: exists
          ? prev.type.filter(
            (item) =>
              item.en !== selectedItem.en || item.ar !== selectedItem.ar
          )
          : [...prev.type, selectedItem],
      };
    });
  }, []);

  // Offers Handlers
  const handleOfferChange = useCallback(
    (index, field) => (e) => {
      const value = e.target.value;
      setOffers((prev) => {
        const updated = [...prev];
        updated[index][field] = value;
        return updated;
      });
    },
    []
  );

  const addOffer = () =>
    setOffers((prev) => [...prev, { pers: "", year: "", offer: "" }]);

  const removeOffer = (index) =>
    setOffers((prev) => prev.filter((_, i) => i !== index));

  const checkBoxOptions1 = useMemo(
    () => [
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
      { en: "Medical centre", ar: "مركز طبي" },
    ],
    []
  );
  const checkBoxOptions2 = useMemo(() => [
    { en: "Villa", ar: "فيلا" },
    { en: "Retail", ar: "محل تجاري" },
    { en: "Office", ar: "مكتب" },
    { en: "Cabin", ar: "كوخ / كابينة" },
    { en: "Clinic", ar: "عيادة" },
    { en: "Townhouse", ar: "تاون هاوس" },
    { en: "Chalet", ar: "شاليه" },
    { en: "One storey Villa", ar: "فيلا دور واحد" },
    { en: "Twin house", ar: "توين هاوس" },
    { en: "Standalone", ar: "مستقل" },
    { en: "Family house", ar: "بيت عائلي" },
    { en: "Penthouse", ar: "بنتهاوس" },
    { en: "Studio", ar: "استوديو" },
    { en: "Duplex", ar: "دوبلكس" },
    { en: "Apartment", ar: "شقة" }
  ], []);
  const onsubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const id = new Date().getTime();
      const projectObject = {
        ...newData,
        offers,
        id: id.toString(),
      };
      try {
        setBtn(true);
        const docRef = doc(db, "compound", newData.developer.id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(docRef, {
            // developer: { ...newData.developer },
            compound: [projectObject],
          });
        } else {
          await updateDoc(docRef, {
            compound: arrayUnion(projectObject),
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
    },
    [newData, offers, nav]
  );

  if (devLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <MavLoading />
      </div>
    );
  }

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
          <Typography variant="h5">{lang === "ar" ? "اضف كومباوند" : "Add Compound"}</Typography>
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
              gap: "10px",
            }}
          >
            <FormGro
              inputLabel={lang === "ar" ? "اختر المطور" : "Select Developer"}
              name="dev"
              data={developers}
              value={newData.developer?.id || ""}
              fun={handleDevChange}
              lang={lang}
            />
            <Input
              onChange={onchange("compoundName", "en")}
              id="Compound Name en"
              label={lang === "ar" ? "اسم الكومباوند انجليزي" : "Compound Name en"}
              type="text"
              value={newData.compoundName.en}
            />
            <Input
              onChange={onchange("compoundName", "ar")}
              id="Compound Name ar"
              label={lang === "ar" ? "اسم الكومباوند عربي" : "Compound Name ar"}
              type="text"
              value={newData.compoundName.ar}
            />
            <CheckboxCom
              data={checkBoxOptions1}
              handleCheckboxChange={handleCheckboxChange}
              name={newData.aminatis}
              lang={lang}
            />

            <Divider />
            <FileUpload
              handleFileChange={handleFileChange}
              prog={prog}
              title={
                lang === "ar"
                  ? "ارفع صور المشروع"
                  : "Upload Your Project Images ..."
              }
            />
            <Input
              onChange={onchange("district", "en")}
              id="district"
              label={lang === "ar" ? " المنطقة انجليزي" : "District en"}
              type="text"
              value={newData.district.en}
            />
            <Input
              onChange={onchange("district", "ar")}
              id="district"
              label={lang === "ar" ? " المنطقة عربي" : "District ar"}
              type="text"
              value={newData.district.ar}
            />
            <Input
              onChange={handleChange}
              id="price"
              label={lang === "ar" ? "السعر" : "Price"}
              type="number"
              name="price"
              value={newData.price}
            />
            {offers.map((offer, index) => (
              <Stack
                key={index}
                sx={{ gap: "10px", alignItems: "center", flexDirection: 'row', width: '100%' }}
              >
                <Input
                  onChange={handleOfferChange(index, "pers")}
                  label={`Pers ${index + 1}`}
                  type="number"
                  value={offer.pers}
                />
                <Input
                  onChange={handleOfferChange(index, "year")}
                  label={`Year ${index + 1}`}
                  type="text"
                  value={offer.year}
                />
                <Input
                  onChange={handleOfferChange(index, "offer")}
                  label={`Offer ${index + 1}`}
                  type="text"
                  value={offer.offer}
                />
                <Button
                  onClick={() => removeOffer(index)}
                  variant="outlined"
                  color="error"
                >
                  <Delete />
                </Button>
              </Stack>
            ))}
            <Button
              onClick={addOffer}
              variant="contained"
              style={{ margin: "10px 0" }}
            >
              {lang === "ar" ? "اضافه عرض +" : "+ Add Offer"}
            </Button>
            <CheckboxCom
              data={checkBoxOptions2}
              handleCheckboxChange={handleCheckbox2Change}
              name={newData.type}
              lang={lang}
            />
            <IconButton onClick={() => setOpen(true)}>
              <HelpOutline />
            </IconButton>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogContent>
                <Typography style={{ whiteSpace: "pre-wrap", fontSize: "0.9rem" }}>
                  {`📝 إزاي تستخدم Markdown:
 # عنوان رئيسي
 ## عنوان فرعي
 ### عنوان
 #### عنوان
 ##### عنوان
 ###### عنوان
 * نص مائل
 ** نص عريض
 ~~ نص مشطوب
 - قائمة نقطية
 1. قائمة مرقمة
 > اقتباس
 `}{" "}
                </Typography>
              </DialogContent>
            </Dialog>

            <Input
              onChange={onchange("compoundDes", "en")}
              id="projectDes"
              label={lang === "ar" ? "تفاصيل الكومباوند انجليزي" : "Compound Description en"}
              type="text"
              value={newData.compoundDes.en}
              multiline
              rows={4}
            />
            <Input
              onChange={onchange("compoundDes", "ar")}
              id="projectDesar"
              label={lang === "ar" ? "تفاصيل الكومباوند عربي" : "Compound Description ar"}
              type="text"
              value={newData.compoundDes.ar}
              multiline
              rows={4}
            />
            <FileUpload
              handleFileChange={handleMasterplanImgChange}
              prog={prog3}
              title={lang === "ar" ? " صوره الماستر بلان" : "Master plan Images ..."}
            />
            <Input
              onChange={onchange("Location", "en")}
              id="location"
              label={lang === "ar" ? "الموقع انجليزي" : "Location en"}
              type="text"
              value={newData.Location.en}
            />
            <Input
              onChange={onchange("Location", "ar")}
              id="location"
              label={lang === "ar" ? "الموقع عربي" : "Location ar"}
              type="text"
              value={newData.Location.ar}
            />
            <Button
              disabled={btn}
              variant="contained"
              type="submit"
              style={{ width: "50%" }}
            >
              {btn ? (
                <ReactLoading type={"spin"} height={"20px"} width={"20px"} />
              ) : (
                lang === "ar" ? "ارسال" : "Send"
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

export default DataBase;
