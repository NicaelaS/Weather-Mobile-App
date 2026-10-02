import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Header } from '@/features/layout/Header';
import { ForecastList } from '@/features/weather/ForecastList';
import { WeatherCard } from '@/features/weather/WeatherCard';
import { useFavorites } from '@/hooks/useFavorites';
import { fetchWeatherByCity, type WeatherForecast } from '@/services/weatherapi';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

export function HomeScreen() {
  const [weather, setWeather] = useState<WeatherForecast | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    let active = true;

    fetchWeatherByCity('San Diego')
      .then((data) => {
        if (active) {
          setWeather(data);
        }
      })
      .catch(() => {
        if (active) {
          setError('Unable to load weather data.');
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="Weather" subtitle="Daily overview" />

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {!weather ? (
        <View style={styles.loadingBox}>
          <Text style={styles.loadingText}>Loading weather…</Text>
        </View>
      ) : (
        <>
          <WeatherCard
            id={weather.id}
            city={weather.city}
            condition={weather.condition}
            temperature={weather.temperature}
            isFavorite={isFavorite(weather.id)}
            onToggleFavorite={() => toggleFavorite(weather.id)}
          />

          <View style={styles.summary}>
            <Text style={styles.summaryLabel}>Feels like</Text>
            <Text style={styles.summaryValue}>{weather.feelsLike}°C</Text>
          </View>

          <View style={styles.metaGrid}>
            <View style={styles.metaBox}>
              <Text style={styles.metaLabel}>Humidity</Text>
              <Text style={styles.metaValue}>{weather.humidity}%</Text>
            </View>
            <View style={styles.metaBox}>
              <Text style={styles.metaLabel}>Wind</Text>
              <Text style={styles.metaValue}>{weather.wind} km/h</Text>
            </View>
          </View>

          <ForecastList forecasts={weather.hourly} />
        </>
      )}
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
    paddingBottom: spacing.xxxl,
  },
  errorBox: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
  },
  loadingBox: {
    marginTop: spacing.lg,
    padding: spacing.xl,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  loadingText: {
    color: colors.text,
    fontSize: 16,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 14,
  },
  summaryValue: {
    color: colors.primarySoft,
    fontSize: 22,
    fontWeight: '700',
  },
  metaGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  metaBox: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  metaValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
});
