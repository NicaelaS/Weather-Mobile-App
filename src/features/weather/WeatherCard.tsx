import { spacing } from '@/styles/spacing'
import { useNavigation } from '@react-navigation/native'
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { useFavoritesContext } from '../../app/providers/FavoritesProvider'
import { colors } from '../../styles/colors'
import formatTempBoth from '../../utils/formatTemperature'

interface WeatherCardProps {
  city: string
  temperature: number | undefined
  icon: string | undefined
}

export function WeatherCard({ city, temperature, icon }: WeatherCardProps) {
  const navigation = useNavigation<any>()
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesContext()
  const favorited = isFavorite(city)

  const iconUrl = icon
    ? `https://openweathermap.org/img/wn/${icon}@4x.png`
    : null

  const handlePress = () => {
    navigation.navigate('WeatherDetail', { city })
  }

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(city)
    } else {
      addFavorite(city)
      Alert.alert('Success', `${city} added to favorites!`)
    }
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.iconContainer}>
        {iconUrl ? (
          <Image source={{ uri: iconUrl }} style={styles.icon} />
        ) : (
          <Text style={styles.fallbackIcon}>☀️</Text>
        )}
      </View>

      <View style={styles.body}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.temperature}>
          {typeof temperature === 'number'
            ? formatTempBoth(temperature)
            : 'Loading...'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.favoriteButton, favorited && styles.favoriteButtonActive]}
        onPress={handleToggleFavorite}
      >
        <Text style={styles.favoriteButtonText}>
          {favorited ? '★' : '☆'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    marginRight: spacing.md,
  },
  icon: {
    width: 60,
    height: 60,
  },
  fallbackIcon: {
    fontSize: 48,
  },
  body: {
    flex: 1,
  },
  city: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  temperature: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  favoriteButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  favoriteButtonActive: {
    backgroundColor: colors.secondary,
    borderRadius: 4,
  },
  favoriteButtonText: {
    fontSize: 20,
  },
})