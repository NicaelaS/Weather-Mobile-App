import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

type ErrorStateProps = {
  message?: string;
};

export function ErrorState({ message = 'Something went wrong.' }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  title: {
    color: colors.danger,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  message: {
    color: colors.text,
    fontSize: 14,
  },
});
