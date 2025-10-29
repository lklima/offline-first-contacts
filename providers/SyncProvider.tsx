import { theme } from "@/constants/theme";
import NetInfo, { NetInfoState, useNetInfo } from "@react-native-community/netinfo";
import { createContext, useContext, useEffect, useRef } from "react";
import { Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FirestoreModule, syncFireMelon } from "@/helpers/sync";
import { AntDesign } from "@expo/vector-icons";
import { Database } from "@nozbe/watermelondb";
import { styles } from "./styles";

export const SyncContext = createContext<{
  sync: () => void;
}>({
  sync: () => {},
});

type Props = {
  children: React.ReactNode;
  database: Database;
  firestore: FirestoreModule;
};

export const SyncProvider = ({ children, database, firestore }: Props) => {
  const { top } = useSafeAreaInsets();
  const { isConnected } = useNetInfo();

  const topValue = useSharedValue(-60);
  const isPreviousConncted = useRef(true);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: topValue.value,
    };
  });

  const sync = () => {
    syncFireMelon(database, { contacts: {} }, firestore, "user_123");
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      if (state.isConnected && !isPreviousConncted.current) {
        topValue.value = withDelay(6000, withSpring(-60));
        isPreviousConncted.current = true;
        sync();
      } else if (!state.isConnected && isPreviousConncted.current) {
        topValue.value = withSpring(top + 60);
        isPreviousConncted.current = false;
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SyncContext.Provider value={{ sync }}>
      <Animated.View
        style={[
          styles.connectionToast,
          { top: top + 60 },
          {
            backgroundColor: isConnected ? theme.colors.green : theme.colors.lightRed,
          },
          animatedStyle,
        ]}
      >
        <AntDesign
          name={isConnected ? "link" : "disconnect"}
          size={18}
          color={isConnected ? theme.colors.lightGreen : theme.colors.red}
        />
        <Text
          style={[
            styles.connectionToastText,
            { color: isConnected ? theme.colors.lightGreen : theme.colors.red },
          ]}
        >
          {isConnected ? "Connected" : "No internet connection"}
        </Text>
      </Animated.View>
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = () => {
  return useContext(SyncContext);
};
