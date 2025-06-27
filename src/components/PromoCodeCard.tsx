import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, LayoutAnimation } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  promo: string;
  setPromo: (val: string) => void;
  onApply: () => void;
  onRemove: () => void;
  appliedCode?: string | null;
  discountAmount?: number;
};

const PromoCodeCard = ({
  promo,
  setPromo,
  onApply,
  onRemove,
  appliedCode,
  discountAmount = 0,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promo Code</Text>

      <View style={styles.row}>
        <TextInput
          placeholder="Enter code"
          value={promo}
          onChangeText={setPromo}
          style={styles.input}
        />
        <Pressable
          style={styles.btn}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            onApply();
          }}
        >
          <Text style={styles.btnText}>Apply</Text>
        </Pressable>
      </View>

      {appliedCode && (
        <View style={styles.appliedRow}>
          <Feather name="check-circle" size={16} color="#2ecc71" />
          <Text style={styles.appliedText}>
            <Text style={{ fontWeight: '600' }}>{appliedCode}</Text> applied — ${discountAmount.toFixed(2)} off
          </Text>
          <Pressable
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
              onRemove();
            }}
            style={styles.removeBtn}
          >
            <Feather name="x-circle" size={16} color="#888" />
            <Text style={styles.removeText}>Remove</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  btn: {
    backgroundColor: '#111',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  appliedRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  appliedText: {
    fontSize: 13,
    color: '#2ecc71',
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
  },
  removeText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
});

export default PromoCodeCard;
