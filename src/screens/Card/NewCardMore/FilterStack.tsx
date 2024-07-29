import React, {useRef} from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const drawerHeight = height * 0.5; // Chiều cao của drawer
const FilterDrawer = () => {
  const animatedValue = useRef(new Animated.Value(-drawerHeight)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          animatedValue.setValue(-drawerHeight + gestureState.dy);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > drawerHeight / 2) {
          closeDrawer();
        } else {
          openDrawer();
        }
      },
    }),
  ).current;

  const openDrawer = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(animatedValue, {
      toValue: -drawerHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDrawer} style={styles.openButton}>
        <Text style={styles.buttonText}>Open Filter</Text>
      </TouchableOpacity>
      <Animated.View
        style={[styles.drawer, {transform: [{translateY: animatedValue}]}]}
        {...panResponder.panHandlers}>
        <Text style={styles.drawerText}>Filter Options</Text>
        {/* Thêm các tùy chọn lọc ở đây */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: drawerHeight,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
  },
  drawerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FilterDrawer;
