import React, { Component } from 'react';
import { Animated, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

class FadeAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), // Initial value for opacity: 0
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 2000, // Fade in over 2 seconds
        useNativeDriver: true // Use the native driver for performance
      }
    ).start();
  }

  render() {
    const { fadeAnim } = this.state;

    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: fadeAnim, // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FadeAnimation style={styles.fadeAnimation}>
          <TouchableOpacity onPress={() => console.log('Button Pressed')}>
            <Text style={styles.text}>Press Me!</Text>
          </TouchableOpacity>
        </FadeAnimation>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fadeAnimation: {
    backgroundColor: 'skyblue',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});
