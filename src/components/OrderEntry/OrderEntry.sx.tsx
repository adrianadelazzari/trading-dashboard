import { SxProps, Theme } from "@mui/material";

export const textFieldStyles: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#3a3a3a",
    },
    "&:hover fieldset": {
      borderColor: "#FF00FF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FF00FF",
    },
  },
};

export const selectFieldStyles: SxProps<Theme> = {
  "& .MuiSelect-outlined": {
    borderColor: "#3a3a3a",
    "&:hover": {
      borderColor: "#FF00FF",
    },
    "&.Mui-focused": {
      borderColor: "#FF00FF",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3a3a3a",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#FF00FF",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#FF00FF",
  },
};

export const errorTextFieldStyles = (isError: boolean): SxProps<Theme> => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: isError ? "#E53935" : "#3a3a3a",
    },
    "&:hover fieldset": {
      borderColor: isError ? "#E53935" : "#FF00FF",
    },
    "&.Mui-focused fieldset": {
      borderColor: isError ? "#E53935" : "#FF00FF",
    },
  },
});
