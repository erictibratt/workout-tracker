import { Platform, Text, type TextProps } from 'react-native';

export default function AppText({ style, ...props }: TextProps) {
  return (
    <Text
      {...props}
      allowFontScaling={Platform.OS === 'ios' ? false : props.allowFontScaling}
      style={[{ color: '#FFFFFF' }, style]}
    />
  );
}
