import axios from 'axios'

const apiKey =
  process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY ??
  process.env.REACT_APP_OPENWEATHER_API_KEY

if (!apiKey) {
  console.warn(
    'Missing EXPO_PUBLIC_OPENWEATHER_API_KEY. Add it to your .env file before running the app.'
  )
}

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: apiKey,
    units: 'metric',
  },
})

function buildDateKey(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

interface ForecastEntry {
  dt?: number
  date?: number
  weather?: Array<{ description?: string; icon?: string }>
  temp?: { min?: number; max?: number; day?: number }
  main?: { temp?: number; temp_min?: number; temp_max?: number }
}

interface NormalizedForecast {
  date: string
  label: string
  description: string
  icon: string | null
  tempMin: number
  tempMax: number
}

export function normalizeDailyForecast(list: ForecastEntry[]): NormalizedForecast[] {
  if (!Array.isArray(list) || list.length === 0) {
    return []
  }

  const grouped = new Map<string, any>()

  list.forEach((entry) => {
    const timestamp = entry.dt ?? entry.date
    if (!timestamp) {
      return
    }

    const dateKey = buildDateKey(timestamp)
    const existing = grouped.get(dateKey) ?? {
      date: dateKey,
      description: entry.weather?.[0]?.description || 'Forecast',
      icon: entry.weather?.[0]?.icon || null,
      tempMin: Number.POSITIVE_INFINITY,
      tempMax: Number.NEGATIVE_INFINITY,
    }

    const tempObject =
      entry.temp && typeof entry.temp === 'object' ? entry.temp : null
    const tempMin =
      tempObject?.min ??
      entry.main?.temp_min ??
      tempObject?.day ??
      entry.main?.temp ??
      null
    const tempMax =
      tempObject?.max ??
      entry.main?.temp_max ??
      tempObject?.day ??
      entry.main?.temp ??
      null

    const nextTempMin = typeof tempMin === 'number' && Number.isFinite(tempMin)
      ? tempMin
      : null
    const nextTempMax = typeof tempMax === 'number' && Number.isFinite(tempMax)
      ? tempMax
      : null

    if (nextTempMin !== null) {
      existing.tempMin = Math.min(existing.tempMin, nextTempMin)
    }
    if (nextTempMax !== null) {
      existing.tempMax = Math.max(existing.tempMax, nextTempMax)
    }

    if (!existing.description && entry.weather?.[0]?.description) {
      existing.description = entry.weather[0].description
    }

    if (!existing.icon && entry.weather?.[0]?.icon) {
      existing.icon = entry.weather[0].icon
    }

    grouped.set(dateKey, existing)
  })

  return Array.from(grouped.values())
    .filter(
      (item) => Number.isFinite(item.tempMin) && Number.isFinite(item.tempMax)
    )
    .slice(0, 7)
    .map((item) => ({
      ...item,
      label: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(
        new Date(`${item.date}T12:00:00`)
      ),
      tempMin: Number(item.tempMin),
      tempMax: Number(item.tempMax),
    }))
}

export interface WeatherData {
  name: string
  id: number
  weather: Array<{ description: string; icon: string }>
  main: {
    temp: number
    humidity: number
    pressure: number
  }
  wind: {
    speed: number
  }
  sys: any
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  if (!apiKey) {
    throw new Error(
      'Missing OpenWeather API key. Add EXPO_PUBLIC_OPENWEATHER_API_KEY to your .env file.'
    )
  }

  const response = await weatherApi.get('/weather', {
    params: {
      q: city,
    },
  })

  const { name, id, weather, main, wind, sys } = response.data

  return {
    name,
    id,
    weather,
    main: {
      temp: main?.temp,
      humidity: main?.humidity,
      pressure: main?.pressure,
    },
    wind,
    sys,
  }
}

export interface ForecastResult {
  list: NormalizedForecast[]
  city: any
}

export async function getForecastByCity(city: string): Promise<ForecastResult> {
  if (!apiKey) {
    throw new Error(
      'Missing OpenWeather API key. Add EXPO_PUBLIC_OPENWEATHER_API_KEY to your .env file.'
    )
  }

  const response = await weatherApi.get('/forecast', {
    params: {
      q: city,
    },
  })

  const list = response?.data?.list ?? []
  const normalized = normalizeDailyForecast(list).slice(0, 7)

  return {
    list: normalized,
    city: response?.data?.city ?? null,
  }
}