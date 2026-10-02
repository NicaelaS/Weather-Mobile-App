import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { EmptyState } from '@/features/layout/EmptyState';
import { Header } from '@/features/layout/Header';
import { WeatherCard } from '@/features/weather/WeatherCard';
import { useFavorites } from '@/hooks/useFavorites';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

const favorites = [
  { id: 'san-diego', city: 'San Diego', condition: 'Sunny', temperature: 24 },
  { id: 'tokyo', city: 'Tokyo', condition: 'Cloudy', temperature: 19 },
];

export function FavoritesScreen() {
  const { favorites: favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  const visibleFavorites = favorites.filter((city) => favoriteIds.includes(city.id));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="Favorites" subtitle="Saved cities" />

      {visibleFavorites.length === 0 ? (
        <EmptyState title="No favorites yet" message="Tap the star on a city to save it here." />
      ) : (
        <View>
          {visibleFavorites.map((city) => (
            <WeatherCard
              key={city.id}
              id={city.id}
              city={city.city}
              condition={city.condition}
              temperature={city.temperature}
              isFavorite={isFavorite(city.id)}
              onToggleFavorite={() => toggleFavorite(city.id)}
            />
          ))}
        </View>
      )}

      <Text style={styles.helperText}>{favoriteIds.length} saved</Text>
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
  helperText: {
    marginTop: spacing.md,
    color: colors.textMuted,
    fontSize: 12,
  },
});
