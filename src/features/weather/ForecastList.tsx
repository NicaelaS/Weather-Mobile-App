import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { formatTemperature } from '@/utils/formatTemperature';

type ForecastListProps = {
  forecasts: Array<{
    time: string;
    temp: number;
  }>;
};

export function ForecastList({ forecasts }: ForecastListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Next hours</Text>
      <View style={styles.list}>
        {forecasts.map((item) => (
          <View key={item.time} style={styles.item}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.temp}>{formatTemperature(item.temp)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xxl,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  item: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minWidth: 72,
    alignItems: 'center',
  },
  time: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  temp: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
