import { StyleSheet, View, ActivityIndicator } from 'react-native';

function Splash() {
  return (
    <View style={[styles.container, { transform: [{ scale: 3 }] }]}>
      <ActivityIndicator size="large" color="white" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Splash;