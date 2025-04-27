import { Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase/config';

function SearchCom() {
    const [serch, setSerch] = useState(null);
    const [menu, setMenu] = useState(false);
    const [value, loading, error] = useCollection(collection(db, 'admin'));
    let firebasedata = [];
    if (value) {
        value.docs.map((item) => {
            //projects data
            item.data().dev.map((proj) => {
                if (proj.proj.toUpperCase().includes(serch)) {
                    firebasedata.push({ "divIcon": item.data().devIcon, "devName": item.data().devName, proj })
                }
            })
            //developrt data
            if (item.data().devName.toUpperCase().includes(serch)) {
                firebasedata.push({ "Name": item.data().devName, "Icon": item.data().devIcon })
            }
            //distract data 
            item.data().dev.map((proj) => {
                if (proj.district.toUpperCase().includes(serch)) {
                    if (!firebasedata.includes(proj.district) && firebasedata.district !== '') {
                        firebasedata.push(proj.district);
                    }
                }
            })
        })
    }
    return (
        <Stack component='form' sx={{ flexDirection: 'column', width: '100%', alignItems: 'center', paddingTop: '10px', position: 'relative' }} onSubmit={(e) => {
            e.preventDefault();
        }}>
            <TextField color="warning" className='header-search' sx={{ backgroundColor: 'white', width: '100%', borderRadius: '10px' }} id="outlined-search" placeholder='Developers Or Area Or Compounds ' type="search" onChange={(e) => {
                if (e.target.value === '') {
                    setSerch(null);
                    setMenu(false)
                } else {
                    setSerch(e.target.value.toUpperCase());
                    setMenu(true)
                }
            }
            } />
            <Stack className='searchBox' sx={{ display: !menu && "none" }}>
                <Stack sx={{ width: '100%', gap: 1 }}>
                    {value ?
                        (firebasedata.length > 0 ?
                            firebasedata.map((filter, index) => {
                                return (
                                    <a className='searchLink' key={index}
                                        onClick={() => setSerch(null)}
                                        href={
                                            filter.Name
                                                ?
                                                `developers/${filter.Name}`
                                                :
                                                filter.divIcon
                                                    ?
                                                    `developers/${filter.devName}/${filter.proj.proj}`
                                                    :
                                                    `findhome/${filter}`
                                        }
                                    >
                                        <Paper sx={{ padding: '10px', width: '100%', display: "flex", alignItems: 'center', gap: 2 }} elevation={3} >
                                            {
                                                filter.Name
                                                    ?
                                                    <Stack sx={{ flexDirection: 'row', alignItems: 'center', width: '100%', gap: 1 }}>
                                                        <img src={filter.Icon} alt='' style={{ width: "50px", filter: "drop-shadow(0 0 10px rgba(0, 0, 0, .15))" }} />
                                                        <Typography sx={{ fontWeight: 'bold' }}>
                                                            {filter.Name}
                                                        </Typography>
                                                    </Stack>
                                                    :
                                                    filter.divIcon
                                                        ?
                                                        <Stack sx={{ flexDirection: 'row', alignItems: 'center', width: '100%', gap: 1 }}>
                                                            <img src={filter.divIcon} alt='' style={{ width: "50px", filter: "drop-shadow(0 0 10px rgba(0, 0, 0, .15))" }} />
                                                            <Stack>
                                                                <Typography sx={{ fontWeight: 'bold' }}>
                                                                    {filter.proj.proj}
                                                                </Typography>
                                                                <Typography variant='caption'>
                                                                    {filter.proj.Location}
                                                                </Typography>
                                                            </Stack>
                                                        </Stack>
                                                        :
                                                        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                                            <Typography sx={{ fontWeight: 'bold' }}>
                                                                {filter}
                                                            </Typography>
                                                            <Typography variant='caption' sx={{ backgroundColor: 'rgb(240, 240, 240)', padding: '1px 7px', borderRadius: '10px', color: 'rgb(33, 36, 39)', fontWeight: 'bold' }}>
                                                                Area
                                                            </Typography>
                                                        </Stack>
                                            }
                                        </Paper>
                                    </a>
                                )
                            })
                            :
                            <Typography>
                                Data Not Found !
                            </Typography>
                        )
                        :
                        <Typography>
                            loading
                        </Typography>
                    }
                </Stack>
            </Stack>
        </Stack >
    )
}

export default SearchCom