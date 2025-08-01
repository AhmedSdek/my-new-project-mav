import { Box, Button, Card, CardMedia, Container, Dialog, DialogContent, IconButton, Stack, Typography } from '@mui/material'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../../../../firebase/config';
import { Delete, Edit } from '@mui/icons-material';
import MavLoading from '../../../Loading/MavLoading';
import { useTranslation } from 'react-i18next';
import ReactLoading from "react-loading";
import Swal from 'sweetalert2';

function EditDeals() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [deals, setDeals] = useState([]);
  // console.log(deals)
  const [deletLoading, setDeletLoading] = useState(false);
  const [dealLoading, setDealLoading] = useState(true);


  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const snapshot = await getDocs(collection(db, "deals"));
        const deal = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDeals(deal);
      } catch (err) {
        console.error("خطأ أثناء جلب الديل:", err);
      } finally {
        setDealLoading(false);
      }
    };

    fetchDeals();
  }, []);
  const handleDelete = async (id) => {
    try {
      setDeletLoading(true)
      await deleteDoc(doc(db, "deals", id));
      setDeals(prev => prev.filter(deal => deal.id !== id));
      setDeletLoading(false)
      console.log("✅ تم الحذف بنجاح");
    } catch (error) {
      setDeletLoading(false)
      console.error("❌ خطأ أثناء الحذف:", error);
    }
  };
  if (dealLoading) {
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
      <Box sx={{ minHeight: 'calc(100vh - 100px)', padding: '70px 0' }}>
        <h2>
          {lang === "ar" ? "تعديل العروض" : "Deals Edit page"}
        </h2>
        <Container>
          {deals.length > 0 ?
            <Stack style={{ gap: 2, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: '30px 0' }}>
              {deals.map((product) => {
                console.log(product)
                return (
                  <Card key={product.id} className="col-xl-4 col-sm-6 col-12" style={{ backgroundColor: 'rgb(228 228 228)', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
                    <CardMedia >
                      <img src={product.img} alt={product.compoundName[lang]} />
                    </CardMedia>
                    <Stack sx={{ p: '10px' }}>
                      <Typography>
                        {`${product.Type[lang]} at ${product.compoundName[lang]}`}
                      </Typography>
                      <Typography variant='caption'>
                        {`${product.Location[lang]}`}
                      </Typography>
                      <Typography >
                        {`${Intl.NumberFormat("en-US").format(
                          product.price
                        )} ${product.monyType.en === "dollar"
                          ? "$"
                          : "EGP"
                          }`}
                      </Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: 'row' }}>
                      <IconButton
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!"
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleDelete(product.id);
                              Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                              });
                            }
                          });
                        }}
                        sx={{ width: '50px', height: '50px' }}
                      >
                        <Delete color='error' />
                      </IconButton>
                      <Link to={`${product.id}`} >
                        <IconButton sx={{ width: '50px', height: '50px' }}>
                          <Edit />
                        </IconButton>
                      </Link>
                    </Stack>
                  </Card>
                )
              })}
            </Stack>
            :
            <Typography>
              no Data !
            </Typography>
          }
        </Container>
      </Box>

      {/* <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogContent>
          <Typography>{lang === "ar" ? "هل انت متأكد من انك تريد الحذف؟" : "Are you sure you want to delete?"}</Typography>
          <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
            <Button variant="contained" color="error" onClick={() => {
              handleDelete(selectedId);
            }}>
              {deletLoading ? (
                <ReactLoading type={"spin"} height={"20px"} width={"20px"} />
              ) : (
                lang === "ar" ? "نعم، احذف" : "Yes, delete")}
            </Button>
            <Button variant="outlined" onClick={() => setOpenConfirm(false)}>
              {lang === "ar" ? "إلغاء" : "Cancel"}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog> */}
    </>
  )
}

export default EditDeals