// components/CustomTabBar.js
import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const animations = useRef(state.routes.map(() => new Animated.Value(1))).current; // Icon scale animations
  const translateYValues = useRef(state.routes.map(() => new Animated.Value(0))).current; // Slide animation refs

  useEffect(() => {
    state.routes.forEach((_, index) => {
      Animated.timing(animations[index], {
        toValue: state.index === index ? 1.3 : 1, // Scale up when active
        duration: 200,
        useNativeDriver: true,
      }).start();

      Animated.timing(translateYValues[index], {
        toValue: state.index === index ? -10 : 0, // Slide up effect
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [state.index]);

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const iconName = options.icon;
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabButton}
          >
            {/* Full Red Circle with White Border */}
            {isFocused && <View style={styles.activeBackground} />}

            <Animated.View
              style={{
                transform: [{ scale: animations[index] }, { translateY: translateYValues[index] }],
              }}
            >
              <Icon 
                name={iconName} 
                size={24} 
                color="white" // Keep icon white for contrast
              />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#111',
    paddingVertical: 10,
    borderRadius: 15,
    margin: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 55,
    position: 'relative',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative',
  },
  activeBackground: {
    position: 'absolute',
    bottom: -20, // Move the circle below the icon
    width: 65,
    height: 65, // Full circle
    backgroundColor: '#E50914',
    borderRadius: 50,
    borderWidth: 5, // White border
    borderColor: 'white',
    zIndex: -1,
    top:-36
  },
});

export default CustomTabBar;
