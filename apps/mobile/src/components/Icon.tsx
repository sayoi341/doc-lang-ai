import { AntDesign } from '@expo/vector-icons';

const Icon = (props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string; size: number }) => (
  <AntDesign style={{ marginBottom: -3 }} {...props} />
);

export default Icon;
