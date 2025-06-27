import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  gross: number;
  discount: number;
  tax: number;
  platformFee: number;
  net: number;
};

const PriceSummary = ({ gross, discount, tax, platformFee, net }: Props) => {
  const originalTotal = gross + tax + platformFee;
  const hasDiscount = discount > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Price Summary</Text>

      <Row label="Subtotal" value={gross} />
      {hasDiscount && <Row label="Discount" value={-discount} color="#2ecc71" />}
      <Row label="Tax" value={tax} />
      <Row label="Platform Fee" value={platformFee} />

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <View style={styles.totalValueContainer}>
          {hasDiscount && (
            <Text style={styles.originalTotal}>${originalTotal.toFixed(2)}</Text>
          )}
          <Text style={styles.totalValue}>${net.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const Row = ({ label, value, color = '#333' }: { label: string; value: number; color?: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, { color }]}>
      {value < 0 ? '-' : ''}${Math.abs(value).toFixed(2)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  totalValueContainer: {
    alignItems: 'flex-end',
  },
  originalTotal: {
    fontSize: 13,
    color: '#888',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
});

export default PriceSummary;
