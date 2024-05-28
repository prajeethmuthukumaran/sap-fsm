import {  createTheme } from "@mui/material";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#1A73E8",
    },
    secondary: {
      main: "#F9BE02",
    },
    button: {
      main: "#071942",
    },
    ascendo: {
      blue: "#1A73E8",
      yellow: "#F9BE02",
      darkblue: "#071942",
    },
    grey: {
     
    },
  },
  typography: {
    fontFamily: ["Rubik", "sans-serif"].join(","),
    fontSize: 14,
  },
  components: {
    MuiAutocomplete: {
      defaultProps: {
        openOnFocus: true,

        slotProps: {
          popper: {
            placement: "bottom-end",
          },
        },
        popupIcon: <ArrowDropDownRoundedIcon fontSize="large" />,
        ListboxProps: {
          style: { fontSize: "14px", color: "#071942" },
        },
        ChipProps: {
          style: {
            backgroundColor: "rgba(26, 115, 232, 0.08)",
            color: "#1A73E8",
            width: "75px",
            fontSize: "12px",
            borderRadius: "4px",
            marginBottom: "6px",
            flexDirection: "row",
          },
        },
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall .MuiAutocomplete-input":
            {
              paddingRight: "20px",
            },

          "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
            height: "32px",
            overflowY: "clip",
          },
          "& .Mui-focused": {
            "& .MuiChip-root ": {
              display: "none",
            },
            "& .MuiSvgIcon-root": {
              color: "#1A73E8",
            },
          },
        },
        noOptions: {
          fontSize: "14px",
          marginLeft: "6px",
        },

        tag: {
          color: "#1A73E8",
          fontSize: "12px",
        },
        popupIndicator: {
          color: "rgba(7, 25, 66, 0.5)",
        },

        clearIndicator: {
          visibility: "visible",
          marginLeft: "-32px",
          marginRight: "4px",
        },
        endAdornment: {
          display: "flex",
          alignItems: "center",
          height: "70%",

          borderLeft: "1px solid rgba(7, 25, 66, 0.3) ",
        },
      },
    },

    MuiSelect: {
      defaultProps: {
        IconComponent: ArrowDropDownRoundedIcon,
      },
      styleOverrides: {
        icon: {
          height: "36px",
          width: "36px",
          top: "0",
          marginRight: "-5px",
          color: "rgba(7, 25, 66, 0.3)",
        },

        select: {
          "& .MuiInputBase-input": {
            paddingLeft: "0px",
          },
        },
      },
    },
   
    MuiPaginationItem: {
      styleOverrides: {
        page: {
          display: "none",
        },
        root: {
          padding:"0px",
        },
        icon: {
          height: "36px",
          width: "36px",
          color: "rgba(7, 25, 66, 0.3)",
        },
        ellipsis:{
          display:"none"
        }
        
      },
    },
   
     
    MuiDataGrid: {
      styleOverrides: {
        row: {
          "&.Mui-selected": {
            backgroundColor: "transparent",

            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        },
      },
    },
   
    
    MuiGrid: {
      variants: [
        {
          props: { variant: "stepperheaderFixedtop1" },
          style: {
            position: "sticky",
            top: 0,
            display: "flex",
            flex: "1 1 auto",
          },
        },
        {
          props: { variant: "stepperFixedtop" },
          style: {
            position: "absolute",
            width: "100%",
            top: "140px",
            display: "flex",
            flex: "1 1 auto",
          },
        },
        {
          props: { variant: "stepperScroller" },
          style: {
            position: "absolute",
            overflowY: "auto",
            top: "240px",
            bottom: "100px",
            left: 0,
            right: 0,
            overflowX: "hidden",
          },
        },
        {
          props: { variant: "stepperFixedbottombtn" },
          style: {
            position: "fixed",
            right: "20px",
            bottom: "0",
            zIndex: "999"
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "ascendo" },
          style: {
            backgroundColor: "#F9BE02",
            textTransform: "none",
            height: "40px",
            color: "#071942",
            "&:hover": {
              backgroundColor: "#fac51b",
            },
          },
        },
      ],
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: "rgba(7, 25, 66, 0.5)",

          overflowX: "hidden",
          "& .MuiTablePagination-actions": {
            paddingLeft:"10px",
            paddingRight:"10px"
          },
          "& .MuiTablePagination-displayedRows": {
            marginLeft: "-30px",
            marginRight: "-14px",
            paddingLeft: "10px",
            borderLeft: "1px solid rgba(7, 25, 66, 0.3)",
          },
          "& .MuiTablePagination-select": {
            paddingTop: "8px",
          },
        },
      },
      defaultProps: {
        labelRowsPerPage: "Items per page",
      },
    },

    MuiStepLabel: {
      styleOverrides: {
        label: {
          "&.Mui-active": {
            color: "#1A73E8",
            fontSize: "14px",
            fontWeight: "400",
          },
          "&.Mui-completed": {
            color: "#32C49E",
            fontSize: "14px",
            fontWeight: "400",
          },
          fontSize: "14px",
          fontWeight: "400",
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.Mui-active": {
            color: "#1A73E8",
          },
          "&.Mui-completed": {
            color: "#32C49E",
          },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          height: "2px",
          left: "calc(-50% + 12px)",
          right: "calc(50% + 12px)",
          border: "2px",
          "&.Mui-active": {
            height: "2px",
            backgroundImage:
              "linear-gradient(90deg, #32C49E -2.94%, #1A73E8 103.07%)",
          },
          "&.Mui-completed": {
            height: "2px",
            backgroundColor: "#32C49E",
          },
        },
      },
    },
   

    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontSize: "14px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: "14px",
        },
        sizeSmall: {
          height: "40px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: "2px",
          fontSize: "14px",
        },
      },
    },
  },
});


