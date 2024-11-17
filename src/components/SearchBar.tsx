import React from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import colors from '../assets/color';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'Availability'>;

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for hotels or locations..."
        placeholderTextColor={colors.text}
        value={value}
        onChangeText={onChange}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Availability')} style={styles.iconContainer}>
        <Icon name="sliders" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: colors.primary,
    color: colors.text,
  },
  iconContainer: {
    marginLeft: 10,
  },
});

export default SearchBar;
