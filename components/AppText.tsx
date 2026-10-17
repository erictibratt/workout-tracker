import { Text, type TextProps } from 'react-native';

export default function AppText({ style, ...props }: TextProps) {
  return (
    <Text
      {...props}
      style={[{ color: '#FFFFFF' }, style]}
    />
  );
}
