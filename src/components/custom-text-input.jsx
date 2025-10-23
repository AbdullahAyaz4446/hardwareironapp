import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showEyeIcon = false,
  keyboardType = 'default',
  error = '',
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          error ? { borderColor: 'red', borderWidth: 1 } : {},
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          placeholderTextColor='#A6A6A6'
          keyboardType={keyboardType}
        />

        {showEyeIcon && secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={!isPasswordVisible ? 'eye' : 'eye-off'}
              size={22}
              color='#54408C'
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#0f0e10ff',
    paddingBottom: 6,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  eyeButton: {
    padding: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  },
});
