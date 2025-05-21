import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { memo } from "react";
const checkboxes = [
  "Clubhouse",
  "Commercial Strip",
  "Underground Parking",
  "Outdoor Pools",
  "Jogging Trail",
  "Bicycles Lanes",
  "Business Hub",
  "Schools",
  "Sports Clubs",
  "Livability",
  "Infrastructure",
  "mosque",
  "children area",
  "kids' area",
  "gym",
  "spa",
  "Educational hub",
  "Commercial area",
  "Medical centre",
];
function CheckboxCom({ handleCheckboxChange, aminatis }) {
  return (
    <FormGroup className="flex-row flex-wrap gap-2">
      {checkboxes.map((label) => (
        <FormControlLabel
          key={label}
          control={
            <Checkbox
              value={label}
              onChange={handleCheckboxChange}
              checked={aminatis.includes(label)}
            />
          }
          label={label}
        />
      ))}
    </FormGroup>
  );
}

export default memo(CheckboxCom);
