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
    fontSize: 25,
  },

  header: {
    fontSize: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: colors.dark,
  },

  centerItems: {
    alignItems: "center",
    justifyContent: "center",
  },

  verticalPadding: {
    paddingVertical: 20,
  },

  horizontalPadding: {
    paddingHorizontal: 20,
  },

  padding: {
    padding: 20,
  },
};
