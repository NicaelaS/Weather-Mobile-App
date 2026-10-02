import { StyleSheet, View } from 'react-native';

import { HomeScreen } from '@/features/weather/HomeScreen';

export function RootNavigator() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
