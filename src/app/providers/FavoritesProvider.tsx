import { createContext, ReactNode, useContext } from 'react'
import useFavorites from '../../hooks/useFavorites'

interface FavoritesContextType {
  favorites: Array<{ name: string }>
  addFavorite: (name: string) => void
  removeFavorite: (name: string) => void
  isFavorite: (name: string) => boolean
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favoritesLogic = useFavorites()

  return (
    <FavoritesContext.Provider value={favoritesLogic}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavoritesContext(): FavoritesContextType {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavoritesContext must be used inside <FavoritesProvider>')
  }
  return context
}