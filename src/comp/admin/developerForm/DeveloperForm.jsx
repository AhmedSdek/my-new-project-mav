import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ReactLoading from "react-loading";
import "react-phone-input-2/lib/style.css";
import { HelpOutline } from "@mui/icons-material";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import Input from "../Input";
import FileUpload from "../FileUpload";

function DeveloperForm() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [prog, setProg] = useState(0);
  const [btn, setBtn] = useState(false);
  const [messege, setMessege] = useState(false);
  const [newData, setNewData] = useState({
    // dev: null,
    // Dis: "",
    img: [],
    name: "",
  });

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
  const sendData = async (dataToSend) => {
    setBtn(true);
    try {
      const id = new Date().getTime();
      await setDoc(doc(db, "developers", `${id}`), {
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
  return (
    <Box sx={{ height: 'calc(100vh - 100px)' }} className="w-full flex flex-col justify-center align-items-center pt-16">
      <Stack className="align-items-center mb-2.5">
        <Typography variant="h5">inventory</Typography>
      </Stack>
      <Card
        onSubmit={onsubmit}
        component="form"
        sx={{ gap: '10px' }}
        className="sm:w-11/12 md:w-4/5 flex align-items-center flex-col p-5 mt-2.5 mb-2.5"
      >
        <Input
          onChange={onchange}
          type="text"
          id="DevName"
          label="Dev Name"
          name="name"
          value={newData.name} // نخزن ونعرض الـ id
        />
        {/* <IconButton onClick={() => setOpen(true)}>
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
        </Dialog> */}
        {/* <Input
          name="Dis"
          value={newData.Dis}
          onChange={onchange}
          // placeholder="اكتب شيئًا هنا"
          rows={4}
          label="Description"
          multiline
          id="outlined-multiline-static"
        /> */}
        <FileUpload handleFileChange={handleFileChange} prog={prog} title='imges' />

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

export default DeveloperForm