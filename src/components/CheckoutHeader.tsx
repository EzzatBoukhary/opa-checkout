import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
    restaurantName: string;
    onBack?: () => void;
};

const CheckoutHeader = ({ restaurantName, onBack }: Props) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.backBtn} onPress={onBack}>
                <Feather name="x" size={22} color="#333" />
            </Pressable>

            <View style={styles.textBox}>
                <Text style={styles.title}>Checkout</Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                    {restaurantName}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 14,
        paddingBottom: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    backBtn: {
        padding: 6,
    },
    textBox: {
        flex: 1,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111',
    },
    subtitle: {
        fontSize: 13,
        color: '#888',
    },
});

export default CheckoutHeader;
