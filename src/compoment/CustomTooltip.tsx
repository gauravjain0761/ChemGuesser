import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CustomTooltip = ({visible, content, onClose, position = 'top'}) => {
  if (!visible) return null;

  // Arrow styles based on the position
  const arrowStyle =
    position === 'top'
      ? {
          borderTopColor: 'white',
          borderTopWidth: 10,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderWidth: 10,
          marginBottom: 5, // Space between tooltip content and arrow
        }
      : {
          borderBottomColor: 'white',
          borderBottomWidth: 10,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: 'transparent',
          borderWidth: 10,
          marginTop: 5, // Space between tooltip content and arrow
        };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.tooltipContainer,
            position === 'top' && {top: 50},
            position === 'bottom' && {bottom: 50},
          ]}>
          {/* Ensure the arrow is positioned above or below the content */}
          <View style={[styles.arrow, arrowStyle]} />
          <View style={styles.tooltipContent}>
            <Text style={styles.tooltipText}>{content}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    maxWidth: '80%',
    width: 220,
  },
  arrow: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
  },
  tooltipContent: {
    paddingTop: 10,
    alignItems: 'center',
  },
  tooltipText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default CustomTooltip;
