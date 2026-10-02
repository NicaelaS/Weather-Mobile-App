import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Header } from '@/features/layout/Header';
import { ForecastList } from '@/features/weather/ForecastList';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

type WeatherDetailScreenProps = {
  city?: string;
  condition?: string;
  temperature?: number;
  description?: string;
};

export function WeatherDetailScreen({
  city = 'San Diego',
  condition = 'Sunny',
  temperature = 24,
  description = 'Warm and bright with comfortable conditions.',
}: WeatherDetailScreenProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title={city} subtitle={condition} />

      <View style={styles.card}>
        <Text style={styles.temperature}>{temperature}°C</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <ForecastList
        forecasts={[
          { time: 'Now', temp: temperature },
          { time: '1PM', temp: temperature + 2 },
          { time: '2PM', temp: temperature + 3 },
          { time: '3PM', temp: temperature + 2 },
          { time: '4PM', temp: temperature + 1 },
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xxl,
  },
  temperature: {
    color: colors.text,
    fontSize: 42,
    fontWeight: '800',
  },
  description: {
    color: colors.textMuted,
    fontSize: 16,
    marginTop: spacing.md,
  },
});
