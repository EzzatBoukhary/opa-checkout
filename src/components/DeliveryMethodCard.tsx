import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
} from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const screenWidth = Dimensions.get('window').width;

type Props = {
  method: 'delivery' | 'pickup';
  setMethod: (m: 'delivery' | 'pickup') => void;
  address: string;
};

const DeliveryMethodCard = ({ method, setMethod, address }: Props) => {
  const handleSelect = (m: 'delivery' | 'pickup') => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMethod(m);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Method</Text>

      <View style={styles.toggleRow}>
        <Pressable
          onPress={() => handleSelect('delivery')}
          style={[
            styles.toggleBtn,
            method === 'delivery' && styles.activeBtn,
          ]}
        >
          <Text style={styles.toggleText}>Delivery</Text>
          <Text style={styles.subtext}>Est. 25–35 mins</Text>
        </Pressable>

        <Pressable
          onPress={() => handleSelect('pickup')}
          style={[
            styles.toggleBtn,
            method === 'pickup' && styles.activeBtn,
          ]}
        >
          <Text style={styles.toggleText}>Pickup</Text>
          <Text style={styles.subtext}>Ready in 10–15 mins</Text>
        </Pressable>
      </View>

      <Image
        source={require('../../assets/image.png')}
        style={styles.map}
      />

      <Text style={styles.addressLabel}>
        {method === 'delivery'
          ? `Delivery Address: ${address}`
          : `Pickup Location: ${address}`}
      </Text>
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
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  toggleBtn: {
    flexBasis: '48%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  activeBtn: {
    backgroundColor: '#d1f2eb',
    borderWidth: 1,
    borderColor: '#2ecc71',
  },
  toggleText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },
  subtext: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  map: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginTop: 10,
  },
  addressLabel: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '500',
    color: '#444',
  },
});

export default DeliveryMethodCard;
