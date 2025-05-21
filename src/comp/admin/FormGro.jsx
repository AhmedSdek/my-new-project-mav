import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { memo } from "react";

function FormGro(props) {
  const { inputLabel, label, name, value, fun, data } = props;

  return (
    <FormControl className="mt-2.5 mb-2.5 w-full">
      <InputLabel>{inputLabel}</InputLabel>
      <Select label={label} name={name} value={value} onChange={fun}>
        {data?.map((item, index) => {
          // console.log(item);
          const isObject = typeof item === "object" && item !== null;
          const itemValue = isObject ? item.id : item;
          const itemLabel = isObject ? item.name : item;
          return (
            <MenuItem value={itemValue} key={index}>
              {itemLabel}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default memo(FormGro);
