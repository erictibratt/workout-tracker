import { Text, TextProps } from "react-native";

export default function AppText({ style, ...props }: TextProps) {
  return (
    <Text
      {...props}
      style={[{ color: "#FFFFFF" }, style]}
    />
  );
}