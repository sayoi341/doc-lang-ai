import { Text, TextProps } from './Themed';

const MonoText = (props: TextProps) => <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;

export default MonoText;
