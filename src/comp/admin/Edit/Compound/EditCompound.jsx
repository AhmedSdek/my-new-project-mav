import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { db } from '../../../../firebase/config';
import MavLoading from '../../../Loading/MavLoading';
import { Box, Card, CardMedia, Container, IconButton, Stack, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function EditCompound() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [compound, setCompound] = useState([]);
  console.log(compound)
  const [deletLoading, setDeletLoading] = useState(false);
  const [compoundLoading, setCompoundLoading] = useState(true);

  useEffect(() => {
    const fetchcompound = async () => {
      try {
        const snapshot = await getDocs(collection(db, "compound"));
        const comp = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompound(comp);
      } catch (err) {
        console.error("خطأ أثناء جلب الديل:", err);
      } finally {
        setCompoundLoading(false);
      }
    };
    fetchcompound();
  }, []);
  if (compoundLoading) {
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
    <Box sx={{ minHeight: 'calc(100vh - 100px)', padding: '70px 0' }}>
      <h2>
        {lang === "ar" ? "كل الدفيلوبر" : "All Developer page"}
      </h2>
      <Container>
        {compound.length > 0 ?
          <Stack style={{ gap: 2, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: '30px 0' }}>
            {compound.map((product) => {
              console.log(product)
              return (
                <Card key={product.id} className="col-xl-4 col-sm-6 col-12" style={{ backgroundColor: 'rgb(228 228 228)', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
                  <Link to={`${product.id}`} >
                    <CardMedia >
                      <img src={product.img} alt={product.devName[lang]} />
                    </CardMedia>
                    <Stack sx={{ p: '10px' }}>
                      <Typography>
                        {`${product.devName[lang]}`}
                      </Typography>
                      <Typography variant='caption'>
                        {`${product.country[lang]}`}
                      </Typography>
                    </Stack>
                  </Link>
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
  )
}

export default EditCompound