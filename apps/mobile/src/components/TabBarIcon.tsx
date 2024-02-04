import { AntDesign } from '@expo/vector-icons';

const TabBarIcon = (props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) => (
  <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />
);

export default TabBarIcon;
