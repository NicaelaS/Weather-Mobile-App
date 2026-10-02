import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Header } from '@/features/layout/Header';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

const sampleCities = ['Paris', 'Tokyo', 'New York', 'Berlin', 'Sydney'];

export function SearchScreen() {
  const [query, setQuery] = useState('');

  const results = sampleCities.filter((city) => city.toLowerCase().includes(query.toLowerCase()));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="Search" subtitle="Find a city forecast" />

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search for a city"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />

      {results.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No cities matched your search.</Text>
        </View>
      ) : (
        <View style={styles.results}>
          {results.map((city) => (
            <View key={city} style={styles.resultItem}>
              <Text style={styles.resultText}>{city}</Text>
            </View>
          ))}
        </View>
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
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
  emptyBox: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.xl,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  results: {
    gap: spacing.sm,
  },
  resultItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  resultText: {
    color: colors.text,
    fontSize: 16,
  },
});
