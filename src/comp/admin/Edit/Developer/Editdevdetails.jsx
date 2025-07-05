import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { db, storage } from "../../../../firebase/config";
import { HelpOutline, Info } from "@mui/icons-material";
import Input from "../../Input";
import FormGro from "../../FormGro";
import FileUpload from "../../FileUpload";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ReactLoading from "react-loading";
import { useTranslation } from "react-i18next";

function Editdevdetails() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { editDeveloperId } = useParams();
  const [value, loading] = useDocument(doc(db, "developer", editDeveloperId));
  const [messege, setMessege] = useState(false);
  const [open, setOpen] = useState(false);
  const [prog, setProg] = useState(0);
  const [btn, setBtn] = useState(false);
  const nav = useNavigate();

  const [developerData, setDeveloperData] = useState({
    devName: { en: "", ar: "" },
    devDis: { en: "", ar: "" },
    country: { en: "", ar: "" },
    img: "",
  });

  useEffect(() => {
    if (value) {
      const data = value.data();
      setDeveloperData({
        devName: data.devName || { en: "", ar: "" },
        devDis: data.devDis || { en: "", ar: "" },
        country: data.country || { en: "", ar: "" },
        img: data.img || [],
      });
    }
  }, [value]);

  const onchange = useCallback(
    (parentKey, lang) => (e) => {
      setDeveloperData((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [lang]: e.target.value,
        },
      }));
    },
    []
  );

  const CountryOptions = [{ ar: "مصر", en: "Egypt" }, { ar: "الامارات", en: "UAE" }];

  const handleSelectChange = useCallback(
    (e) => {
      const selectedLabel = e.target.value;
      const selectedObject = CountryOptions.find(
        (item) => (item[lang] || item.en) === selectedLabel
      );
      setDeveloperData((prev) => ({
        ...prev,
        country: selectedObject || prev.country,
      }));
    },
    [CountryOptions, lang]
  );

  const handleFileChange = useCallback(async (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const storageRef = ref(storage, "developer/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProg((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setBtn(true);
        },
        (err) => console.error(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDeveloperData((prev) => ({
              ...prev,
              img: downloadURL,
            }));
            setBtn(false);
          });
        }
      );
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "developer", editDeveloperId);
      await updateDoc(docRef, {
        devName: developerData.devName,
        devDis: developerData.devDis,
        country: developerData.country,
        img: developerData.img,
      });
      setMessege(true);
      setTimeout(() => {
        setMessege(false);
        nav("/dashboard");
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 100px)",
        padding: "70px 0",
        width: "100%",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        component="form"
        sx={{ gap: '10px' }}
        onSubmit={handleUpdate}
        className="sm:w-11/12 md:w-4/5 flex align-items-center flex-col p-5"
      >
        <Input
          onChange={onchange("devName", "en")}
          label={lang === "ar" ? "اسم الدفيلوبر انجليزي" : "Developer Name EN"}
          value={developerData.devName.en}
        />
        <Input
          onChange={onchange("devName", "ar")}
          label={lang === "ar" ? "اسم الدفيلوبر عربي" : "Developer Name AR"}
          value={developerData.devName.ar}
        />
        <FormGro
          inputLabel={lang === "ar" ? "اختر البلد" : "Select Country"}
          name="country"
          data={CountryOptions}
          value={developerData.country[lang] || ""}
          fun={handleSelectChange}
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
          onChange={onchange("devDis", "en")}
          label={lang === "ar" ? "التفاصيل انجليزي" : "Description EN"}
          value={developerData.devDis.en}
          multiline
          rows={4}
        />
        <Input
          onChange={onchange("devDis", "ar")}
          label={lang === "ar" ? "التفاصيل عربي" : "Description AR"}
          value={developerData.devDis.ar}
          multiline
          rows={4}
        />
        <FileUpload
          handleFileChange={handleFileChange}
          prog={prog}
          title={lang === "ar" ? "ايقونه المطور" : "Developer Icon"}
        />
        <Button
          disabled={btn}
          type="submit"
          variant="contained"
          className="btn w-1/2"
        >
          {btn ? (
            <ReactLoading type={"spin"} height={"20px"} width={"20px"} />
          ) : lang === "ar" ? (
            "تحديث"
          ) : (
            "Update"
          )}
        </Button>
      </Card>
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
        Data has been updated successfully{" "}
        <Info
          style={{ margin: "0 0 0 10px", fontSize: "20px", color: "teal" }}
        />
      </p>
    </Box>
  );
}

export default Editdevdetails;
