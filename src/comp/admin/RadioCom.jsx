import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { memo } from "react";

function RadioCom({ value, onChange, data, name }) {
  // console.log(data);
  return (
    <FormControl className="mt-2.5 mb-2.5 w-full">
      <FormLabel required>{name}</FormLabel>
      <RadioGroup row name={name} value={value} onChange={onChange}>
        {data?.map((item, index) => {
          return (
            <FormControlLabel
              value={item}
              key={index}
              control={<Radio />}
              label={item}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

export default memo(RadioCom);
