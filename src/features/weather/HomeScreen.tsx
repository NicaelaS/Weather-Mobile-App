import { spacing } from '@/styles/spacing'
import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { getWeatherByCity } from '../../services/weatherapi'
import { colors } from '../../styles/colors'
import { EmptyState } from '../layout/EmptyState'
import { ErrorState } from '../layout/ErrorState'
import { Header } from '../layout/Header'
import { LoadingState } from '../layout/LoadingState'
import { WeatherCard } from './WeatherCard'

const DEFAULT_CITIES = ['Seattle', 'Tokyo', 'Paris', 'London', 'New York', 'Berlin']

interface WeatherEntry {
  city: string
  temperature: number | undefined
  icon: string | undefined
}

export function HomeScreen() {
  const [weatherData, setWeatherData] = useState<WeatherEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useFocusEffect(
    React.useCallback(() => {
      loadWeather()
    }, [])
  )

  const loadWeather = async () => {
    try {
      setLoading(true)
      setError(null)

      const results = await Promise.all(
        DEFAULT_CITIES.map(async (city) => {
          try {
            const data = await getWeatherByCity(city)
            return {
              city: data.name || city,
              temperature: data.main?.temp,
              icon: data.weather?.[0]?.icon,
            }
          } catch (err) {
            console.warn(`Failed to load weather for ${city}`, err)
            return {
              city,
              temperature: undefined,
              icon: undefined,
            }
          }
        })
      )

      setWeatherData(results)
    } catch (err: any) {
      console.error('Failed to load weather data', err)
      setError(err.message || 'Failed to load weather data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header title="Weather" subtitle="Browse current weather for your favorite cities" />
        <LoadingState message="Loading weather..." />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header title="Weather" subtitle="Browse current weather for your favorite cities" />
        <ErrorState title="Error" message={error} onRetry={loadWeather} />
      </>
    )
  }

  return (
    <View style={styles.container}>
      <Header title="Weather" subtitle="Browse current weather for your favorite cities" />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {weatherData.length === 0 ? (
          <EmptyState
            title="No Data"
            message="Unable to load weather data for default cities"
          />
        ) : (
          weatherData.map((entry) => (
            <WeatherCard
              key={entry.city}
              city={entry.city}
              temperature={entry.temperature}
              icon={entry.icon}
            />
          ))
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
})