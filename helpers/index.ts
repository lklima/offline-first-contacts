import { Platform } from "react-native";

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";

export const formatTime = (time: Date) => {
  return time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const generateRandomImage = () => {
  return `https://picsum.photos/200/300?random=${Math.random()}`;
};
