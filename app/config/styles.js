import { Platform } from "react-native";
import colors from "./colors";

export default {
  colors,

  text: {
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: colors.dark,
  },

  title: {
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: colors.dark,
    fontSize: 20,
  },

  centerItems: {
    alignItems: "center",
    justifyContent: "center",
  },
};
