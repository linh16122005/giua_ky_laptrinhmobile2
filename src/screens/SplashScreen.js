import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish }) {
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const bgOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // Fade + scale logo in
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // Fade text in
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // Hold for a moment
      Animated.delay(800),
      // Fade out everything
      Animated.timing(bgOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onFinish) onFinish();
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: bgOpacity }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Soft gradient blobs */}
      <View style={styles.blobTopLeft} />
      <View style={styles.blobBottomRight} />

      {/* Logo + Brand */}
      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}>

        {/* Icon mark */}
        <View style={styles.iconMark}>
          {/* Outer ring arc */}
          <View style={styles.outerArc} />
          {/* Inner circle with cut */}
          <View style={styles.innerCircle} />
          {/* Arrow / tail */}
          <View style={styles.tail} />
        </View>

        {/* Brand name */}
        <Animated.View style={[styles.brandRow, { opacity: textOpacity }]}>
          <Text style={styles.brandLight}>event</Text>
          <Text style={styles.brandBold}>Hub</Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Soft ambient blobs (like in the design)
  blobTopLeft: {
    position: 'absolute',
    top: -80,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(200, 180, 255, 0.18)',
  },
  blobBottomRight: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(150, 200, 255, 0.15)',
  },

  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },

  // "e" shaped icon mark
  iconMark: {
    width: 46,
    height: 46,
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  outerArc: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 5,
    borderColor: '#2B9FFF',
    borderTopColor: 'transparent',
    transform: [{ rotate: '-45deg' }],
  },
  innerCircle: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 5,
    borderColor: '#5B4EFF',
    borderTopColor: 'transparent',
    transform: [{ rotate: '135deg' }],
  },
  tail: {
    position: 'absolute',
    right: 1,
    top: 14,
    width: 10,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#2B9FFF',
    transform: [{ rotate: '-45deg' }],
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  brandLight: {
    fontSize: 36,
    fontWeight: '300',
    color: '#5B4EFF',
    letterSpacing: -0.5,
  },
  brandBold: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2B9FFF',
    letterSpacing: -0.5,
  },
});
