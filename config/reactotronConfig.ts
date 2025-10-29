import Reactotron from "reactotron-react-native";

declare global {
  interface Console {
    tron: any;
  }
}

const tron = Reactotron.configure({}).useReactNative().connect();

// clear timeline after reload
tron?.clear?.();

console.tron = tron;
