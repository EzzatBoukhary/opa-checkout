import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { WorkingHour } from '../types';
import dayjs from 'dayjs';

type Props = {
    name: string;
    imageUrl?: string;
    address: string;
    workingHours: WorkingHour[];
    isOpen: boolean;
};

const RestaurantHeader = ({ name, imageUrl, address, workingHours, isOpen }: Props) => {
    const today = dayjs().format('dddd').toUpperCase();
    const todayHours = workingHours.find((w) => w.day === today);

    const formatTime = (time: string) => {
        const [hour, minute, second] = time.split(':').map(Number);
        const parsed = dayjs().hour(hour).minute(minute).second(second);
        return parsed.isValid() ? parsed.format('h:mm A') : 'N/A';
    };


    return (
        <View style={styles.container}>
            {imageUrl && <Image source={{ uri: imageUrl }} style={styles.logo} />}
            <Text style={styles.name}>{name}</Text>
            <View style={styles.row}>
                <MaterialIcons name="location-pin" size={16} color="#666" />
                <Text style={styles.address}>{address}</Text>
            </View>
            <View
                style={[
                    styles.statusBadge,
                    { backgroundColor: isOpen ? '#daf5db' : '#fbe0e0' },
                ]}
            >
                <Text style={styles.statusText}>{isOpen ? 'Open Now' : 'Closed'}</Text>
            </View>
            {todayHours && (
                <Text style={styles.hours}>
                    Open today: {formatTime(todayHours.opens)} – {formatTime(todayHours.closes)}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    logo: {
        width: 72,
        height: 72,
        borderRadius: 16,
        marginBottom: 12,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    address: {
        fontSize: 14,
        color: '#555',
        marginLeft: 4,
    },
    statusBadge: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
    },
    hours: {
        fontSize: 13,
        color: '#666',
        marginTop: 6,
        textAlign: 'center',
    },
});

export default RestaurantHeader;
