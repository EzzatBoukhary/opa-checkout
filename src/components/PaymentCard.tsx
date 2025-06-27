import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const PaymentCard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Method</Text>

            <View style={styles.cardRow}>
                <View style={styles.paymentCard}>
                    <Text style={styles.cardText}> Apple Pay</Text>
                </View>

                <Pressable style={styles.addCard}>
                    <AntDesign name="plus" size={16} color="#111" />
                    <Text style={styles.addText}>Add Method</Text>
                </Pressable>
            </View>
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
    cardRow: {
        flexDirection: 'row',
        gap: 12,
    },
    paymentCard: {
        flex: 1,
        backgroundColor: '#eee',
        borderRadius: 10,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontWeight: '600',
        fontSize: 14,
    },
    addCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
        gap: 6,
    },
    addText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default PaymentCard;
