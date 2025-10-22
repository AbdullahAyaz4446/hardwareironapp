import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const TopBar = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: '#FFFFFF', padding: 20 }}
      onPress={onPress}
    >
      <Ionicons name='arrow-back' size={25} color='black' />
    </TouchableOpacity>
  );
};

export default TopBar;
