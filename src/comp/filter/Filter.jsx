import { Close, Tune } from "@mui/icons-material";
import {
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import React, { memo } from "react";

function Filter({
  data,
  lang,
  setOpenFilterDrawer,
  openFilterDrawer,
  setFilters,
  filters,
  label,
}) {
  const handleSliderChange = (type) => (event, newValue) => {
    setFilters((prev) => ({ ...prev, [type]: newValue }));
  };
  return (
    <>
      <Stack
        sx={{
          flexDirection: "row",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          label={`${lang === "ar" ? label.ar : label.en}`}
          variant="outlined"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
        />
        <IconButton
          onClick={() => setOpenFilterDrawer(true)}
          sx={{
            borderRadius: 1,
            width: 40,
            height: 40,
            backgroundColor: "#f5f5f5",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <Tune />
        </IconButton>
      </Stack>
      <SwipeableDrawer
        anchor="bottom"
        open={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        onOpen={() => setOpenFilterDrawer(true)}
      >
        <Container>
          <Stack sx={{ padding: "10px" }}>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                gap: 2,
                padding: "15px",
              }}
            >
              <IconButton
                onClick={() => setOpenFilterDrawer(false)}
                sx={{
                  borderRadius: 1,
                  width: 40,
                  height: 40,
                  backgroundColor: "#f5f5f5",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <Close color="error" />
              </IconButton>
              <Typography
                sx={{
                  fontFamily: "materialBold",
                  fontSize: "20px",
                  color: "rgb(30, 65, 100)",
                  textTransform: "uppercase",
                  letterSpacing: "4.14px",
                }}
              >
                {lang === "ar" ? "خيارات البحث" : "Filter options"}
              </Typography>
            </Stack>
            <Grid
              container
              spacing={4}
              sx={{
                px: 4,
                justifyContent: { xs: "center", md: "initial" },
              }}
            >
              {/* Type Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    label="Type"
                    value={filters.type}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="">All</MenuItem>
                    {Array.from(new Set(data.map((d) => d.Type?.[lang]))).map(
                      (type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>

              {/* Bedrooms Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel>Bedrooms</InputLabel>
                  <Select
                    label="Bedrooms"
                    value={filters.bed}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        bed: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="">All</MenuItem>
                    {[...new Set(data.map((d) => d.Bed?.[lang]))].map(
                      (bed, index) => (
                        <MenuItem key={index} value={bed}>
                          {bed}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>

              {/* Bathrooms Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel>Bath</InputLabel>
                  <Select
                    label="Bath"
                    value={filters.bath}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        bath: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="">All</MenuItem>
                    {[...new Set(data.map((d) => d.Bath?.[lang]))].map(
                      (bath, index) => (
                        <MenuItem key={index} value={bath}>
                          {bath}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>

              {/* Finishing Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel>Finishing</InputLabel>
                  <Select
                    label="Finishing"
                    value={filters.Finsh}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        Finsh: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="">All</MenuItem>
                    {Array.from(new Set(data.map((d) => d.Finsh?.[lang]))).map(
                      (Finsh) => (
                        <MenuItem key={Finsh} value={Finsh}>
                          {Finsh}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>

              {/* Sale Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel>Sale</InputLabel>
                  <Select
                    label="Sale"
                    value={filters.sale}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sale: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="">All</MenuItem>
                    {Array.from(new Set(data.map((d) => d.Sale?.[lang]))).map(
                      (sale) => (
                        <MenuItem key={sale} value={sale}>
                          {sale}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>

              {/* Money Type Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel>Money Type</InputLabel>
                  <Select
                    label="Money Type"
                    value={filters.monyType}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        monyType: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="">All</MenuItem>
                    {Array.from(
                      new Set(data.map((d) => d.monyType?.[lang]))
                    ).map((mony) => (
                      <MenuItem key={mony} value={mony}>
                        {mony}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Compound Name Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel>Compound</InputLabel>
                  <Select
                    label="Compound"
                    value={filters.compoundName}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        compoundName: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="">All</MenuItem>
                    {Array.from(
                      new Set(data.map((d) => d.compoundName?.[lang]))
                    ).map((compound, index) => (
                      <MenuItem key={index} value={compound}>
                        {compound}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Price Range Slider */}
            </Grid>
            <Grid container spacing={4} sx={{ p: "20px" }}>
              <Grid item size={{ xs: 12, sm: 6 }} sx={{ flexGrow: 1 }}>
                <Typography gutterBottom>Price Range</Typography>
                <Slider
                  value={filters.price}
                  onChange={handleSliderChange("price")}
                  valueLabelDisplay="auto"
                  step={100000}
                  min={0}
                  max={10000000}
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6 }} sx={{ flexGrow: 1 }}>
                <Typography gutterBottom>Area Range (m²)</Typography>
                <Slider
                  value={filters.area}
                  onChange={handleSliderChange("area")}
                  valueLabelDisplay="auto"
                  step={10}
                  min={0}
                  max={10000}
                />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </SwipeableDrawer>
    </>
  );
}

export default memo(Filter);
