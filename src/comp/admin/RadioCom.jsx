import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { memo } from "react";

function RadioCom({ value, onChange, data, label, name, lang }) {
  return (
    <FormControl className="mt-2.5 mb-2.5 w-full">
      <FormLabel required>{label}</FormLabel>
      <RadioGroup row name={name} value={value} onChange={onChange}>
        {data?.map((item, index) => {
          const itemLabel = typeof item === "object" ? item[lang] : item;
          const itemValue = typeof item === "object" ? item.en : item;
          return (
            <FormControlLabel
              value={itemValue}
              key={index}
              control={<Radio />}
              label={itemLabel}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

export default memo(RadioCom);
