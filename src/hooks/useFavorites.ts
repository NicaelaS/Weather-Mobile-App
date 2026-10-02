import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'weather_app_favorites'

interface Favorite {
  name: string
}

async function readFavorites(): Promise<Favorite[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch (err) {
    console.warn('Unable to read favorites from AsyncStorage', err)
    return []
  }
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize from AsyncStorage on mount
  useEffect(() => {
    let isMounted = true

    readFavorites().then((data) => {
      if (isMounted) {
        setFavorites(data)
        setIsInitialized(true)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  // Persist to AsyncStorage when favorites change
  useEffect(() => {
    if (isInitialized) {
      try {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch(
          (err) => {
            console.warn('Unable to write favorites to AsyncStorage', err)
          }
        )
      } catch (err) {
        console.warn('Unable to write favorites to AsyncStorage', err)
      }
    }
  }, [favorites, isInitialized])

  const addFavorite = useCallback((name: string) => {
    setFavorites((prev) => {
      if (prev.find((f) => f.name === name)) return prev
      return [...prev, { name }]
    })
  }, [])

  const removeFavorite = useCallback((name: string) => {
    setFavorites((prev) => prev.filter((f) => f.name !== name))
  }, [])

  const isFavorite = useCallback(
    (name: string) => {
      return favorites.some((f) => f.name === name)
    },
    [favorites]
  )

  const clearFavorites = useCallback(() => setFavorites([]), [])

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
  }
}