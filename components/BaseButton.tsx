import { theme } from "@/constants/theme";
import { isAndroid, isIOS } from "@/helpers";
import { Pressable, PressableProps, StyleSheet } from "react-native";

export const BaseButton = ({ children, style, ...rest }: PressableProps) => (
  <Pressable
    {...rest}
    style={({ pressed }) => ({
      ...(isIOS && {
        opacity: pressed ? theme.custom.activeOpacity : 1,
      }),
      ...(isAndroid && { overflow: "hidden" }),
      ...StyleSheet.flatten(style),
    })}
    android_ripple={{ foreground: true, color: theme.custom.ripple }}
  >
    {children}
  </Pressable>
);
