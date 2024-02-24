import { StyleFunctionProps } from "@chakra-ui/theme-tools";
const Button = {
  defaultProps: {},
  baseStyle: {
    lineHeight: 1,
    fontWeight: "bold",
    rounded: "2px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: "transparent",
    _focus: {
      boxShadow: "none",
      border: "none !important",
    },
    _hover: {
      color: "secondary.200",
      background: "primary.500",
    },
  },
  variants: {
    outline: (props: StyleFunctionProps) => {
      const { colorScheme: c } = props;
      // if (c === "primary") {
      //   const primaryColor = c + ".500";
      return {
        border: "1px solid",
        borderColor: "primary.500",
        color: "primary.500",
        _hover: {
          bg: "pineapple.800",
          color: `${c}.100`,
          _disabled: {
            borderColor: "gray.700",
            color: "gray.700",
          },
        },
        _focus: {
          outline: "none",
          bg: "primary.500",
          border: "none !important",
          color: "primary.500",
        },
        _disabled: {
          borderColor: `${c}.800`,
          color: "gray.700",
          opacity: "1",
        },
      };
      // }
    },
    solid: (props: StyleFunctionProps) => {
      return {
        bg: "primary.500",
        color: "contrast.200 ",
        rounded: "base",
        _hover: {
          bg: `primary.40`,
          color: "contrast.100",
          _disabled: {
            bg: `primary.60`,
            color: "contrast.100",
          },
        },
        _focus: {
          border: "2px solid",
          borderColor: `primary.70`,
        },
        _disabled: {
          bg: `800`,
          color: "gray.900",
          opacity: "1",
        },
      };
    },

    ghost: (props: StyleFunctionProps) => {
      // const { colorScheme: c } = props;
      // if (c === "primary") {
      //   const primaryColor = c + ".500";
      return {
        color: "primary.500",
        _hover: {
          bg: "gray.800",
          _disabled: {
            color: "gray.700",
          },
        },
        _focus: {
          bg: "pineapple.800",
        },
        _disabled: {
          color: "gray.700",
          opacity: "1",
        },
      };
      // }
    },
    link: (props: StyleFunctionProps) => {
      const { colorScheme: c } = props;
      // if (c === "primary") {
      //   const primaryColor = c + ".500";
      return {
        color: "primary.500",
        textDecoration: "underline",
        textUnderlineOffset: "2px",
        _hover: {
          textDecoration: "none",
          _disabled: {
            color: "gray.700",
          },
        },
        _focus: {
          bg: "pineapple.800",
        },
        _disabled: {
          color: "gray.700",
          opacity: "1",
        },
      };
      // }
    },
    linkwhite: () => {
      const primaryColor = "gray.400";
      return {
        color: "primary.500",
        textDecoration: "underline",
        textUnderlineOffset: "2px",
        _hover: {
          color: "gray.400",
          textDecoration: "none",
        },
        _focus: {
          color: "gray.400",
        },
        _disabled: {
          color: "gray.700",
          opacity: "1",
        },
      };
    },
  },
  sizes: {
    xl: {
      fontSize: "2xl",
      h: 12,
      w: 12,
      px: 8,
    },
  },
};
export default Button;
