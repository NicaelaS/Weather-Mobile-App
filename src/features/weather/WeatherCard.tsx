import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { formatTemperature } from '@/utils/formatTemperature';

type WeatherCardProps = {
  id: string;
  city: string;
  condition: string;
  temperature: number;
  isFavorite?: boolean;
  onPress?: () => void;
  onToggleFavorite?: () => void;
};

export function WeatherCard({
  id,
  city,
  condition,
  temperature,
  isFavorite = false,
  onPress,
  onToggleFavorite,
}: WeatherCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.location}>{city}</Text>
          <Text style={styles.condition}>{condition}</Text>
        </View>
        <Pressable onPress={onToggleFavorite} style={styles.favoriteButton} hitSlop={8}>
          <Text style={styles.favoriteText}>{isFavorite ? '★' : '☆'}</Text>
        </Pressable>
      </View>

      <Text style={styles.temp}>{formatTemperature(temperature)}</Text>
      <Text style={styles.meta}>City ID: {id}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 20,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  condition: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.xs,
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteText: {
    color: colors.warning,
    fontSize: 18,
  },
  temp: {
    color: colors.text,
    fontSize: 42,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.sm,
  },
});
