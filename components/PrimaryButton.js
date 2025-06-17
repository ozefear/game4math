import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const PrimaryButton = ({ 
  title, 
  onPress, 
  color = '#FF6B6B', 
  disabled = false, 
  style = {}, 
  textStyle = {},
  icon = null
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: color },
        disabled && styles.disabled,
        style
      ]}
      activeOpacity={0.8}
    >
      <View style={styles.buttonContent}>
        {icon && <Text style={[styles.icon, textStyle]}>{icon}</Text>}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    marginRight: 8,
    fontSize: 16,
  },
  disabled: {
    backgroundColor: '#CBD5E0',
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default PrimaryButton;
