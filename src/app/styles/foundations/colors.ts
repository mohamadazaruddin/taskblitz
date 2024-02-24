type Colors = {
  [key: string]: {
    [key: string]: string;
  };
};

export const colors: Colors = {
  primary: {
    100: "#E4E4E6",
    200: "#BABAFF",
    300: "#6F6AF84D",
    400: "#7C7CF9",
    500: "#5251cc",
  },
  contrast: {
    200: "#ffffff",
  },
  secondary: {
    400: "#0E0E10",
  },
  gray: {
    100: "#cacaca",
    400: "#797C86",
    500: "#4b4b4e",
    600: "#696C74",
    800: "#343333",
    900: "#D7D7D7",
  },
  black: {
    500: "#070708",
    600: "#1A1A1E",
  },
  gradient: {
    100: "linear-gradient(166deg, #5251CC -7.84%, #FFF 68.35%)",
    200: "linear-gradient(345deg, #000 0.39%, rgba(2, 2, 10, 0.64) 137.26%, #000 137.26%)",
  },
};
