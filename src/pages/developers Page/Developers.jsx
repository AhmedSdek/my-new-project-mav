import "./developers.css";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import MavLoading from "../../comp/Loading/MavLoading";
import { Box, Container, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
function Developers() {
  const [data, setData] = useState([]); // تخزين البيانات القادمة من Firebase
  const [searchTerm, setSearchTerm] = useState(""); // تتبع نص البحث
  const [filteredData, setFilteredData] = useState([]); // تخزين البيانات المصنفة
  const [loading, setLoading] = useState(true); // حالة التحميل
  // جلب البيانات من Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "admin")); // اسم مجموعة البيانات
        const devData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(devData); // تخزين البيانات الأصلية
        setFilteredData(devData); // تخزين نسخة مبدئية
        setLoading(false); // إيقاف حالة التحميل
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
        setLoading(false); // إيقاف حالة التحميل في حالة الخطأ
      }
    };
    fetchData();
  }, []);
  // تصفية البيانات عند تحديث نص البحث
  useEffect(() => {
    const results = data.filter((item) =>
      item.devName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);
  return (
    <Box sx={{ minHeight: "calc(100vh - 100px)", padding: "70px 0" }}>
      <h1 className="developers-title">DEVELOPERS FULL LIST</h1>
      <Container>
        <Stack
          component="form"
          sx={{
            flexDirection: "column",
            width: "70%",
            alignItems: "center",
            paddingTop: "10px",
            position: "relative",
            margin: "15px auto",
          }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextField
            color="warning"
            sx={{
              backgroundColor: "white",
              width: "100%",
              borderRadius: "20px",
            }}
            id="outlined-search"
            placeholder="Developers Search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // تحديث نص البحث
          />
        </Stack>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 100px)",
            }}
          >
            <MavLoading />
          </div>
        ) : (
          <Stack
            sx={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => {
                console.log(item);
                return (
                  <Stack
                    className="colDev"
                    key={index}
                    sx={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                    }}
                  >
                    <Link
                      style={{
                        width: "120px",
                        height: "120px",
                        padding: "0",
                        borderRadius: "50%",
                      }}
                      className="logo hoveredLogo d-flex align-items-center flex-column  inner"
                      to={`/developers/${item.devName}`}
                    >
                      <img
                        style={{ height: "100%", width: "100%" }}
                        className="img-fluid img shadow-filter rounded-circle"
                        src={item.devIcon}
                        alt={item.devName}
                      ></img>
                    </Link>
                  </Stack>
                );
              })
            ) : (
              <p>No results found</p>
            )}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
export default Developers;
