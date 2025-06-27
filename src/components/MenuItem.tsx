import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    LayoutAnimation,
    Platform,
    UIManager,
    Animated,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Modal from 'react-native-modal';
import ItemEditorModal from './ItemEditorModal';

type Props = {
    name: string;
    image: string;
    price: number;
    quantity: number;
    onRemove: () => void;
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MenuItem = ({ name, image, price, quantity, onRemove }: Props) => {
    const [qty, setQty] = useState(quantity);
    const [isEditorOpen, setEditorOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const animatedPrice = useRef(new Animated.Value(1)).current;

    const handleChange = (change: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        LayoutAnimation.easeInEaseOut();
        const newQty = qty + change;

        if (newQty <= 0) {
            setShowConfirm(true);
            return;
        }

        animatePriceChange();
        setQty(newQty);
    };

    const animatePriceChange = () => {
        animatedPrice.setValue(0.7);
        Animated.spring(animatedPrice, {
            toValue: 1,
            useNativeDriver: true,
            friction: 4,
        }).start();
    };

    const total = price * qty;

    return (
        <>
            <Pressable style={styles.card} onPress={() => setEditorOpen(true)}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.unitLine}>
                        {qty} × ${price.toFixed(2)}
                    </Text>
                    <View style={styles.controls}>
                        <Pressable onPress={() => handleChange(-1)} style={styles.btn} hitSlop={10}>
                            {qty === 1 ? (
                                <Feather name="trash-2" size={16} color="#e74c3c" />
                            ) : (
                                <AntDesign name="minus" size={16} color="#333" />
                            )}
                        </Pressable>
                        <Text style={styles.qty}>{qty}</Text>
                        <Pressable onPress={() => handleChange(1)} style={styles.btn} hitSlop={10}>
                            <AntDesign name="plus" size={16} color="#333" />
                        </Pressable>
                    </View>
                </View>
                <Animated.Text
                    style={[
                        styles.total,
                        {
                            transform: [{ scale: animatedPrice }],
                            opacity: animatedPrice,
                        },
                    ]}
                >
                    ${total.toFixed(2)}
                </Animated.Text>
            </Pressable>

            {/* Confirm delete modal (inline) */}
            <Modal
                isVisible={showConfirm}
                onBackdropPress={() => setShowConfirm(false)}
                onBackButtonPress={() => setShowConfirm(false)}
                style={styles.modal}
            >
                <View style={styles.confirmSheet}>
                    <Text style={styles.confirmTitle}>Remove this item?</Text>
                    <Text style={styles.confirmSubtitle}>This will remove it from your order.</Text>
                    <View style={styles.modalActions}>
                        <Pressable style={styles.cancelBtn} onPress={() => setShowConfirm(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={styles.removeBtn}
                            onPress={() => {
                                setShowConfirm(false);
                                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                                onRemove();
                            }}
                        >
                            <Text style={styles.removeText}>Remove</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Bottom sheet item editor */}
            <ItemEditorModal
                visible={isEditorOpen}
                onClose={() => setEditorOpen(false)}
                onRemove={() => {
                    setEditorOpen(false);
                    onRemove();
                }}
                onApply={(newQty) => {
                    setEditorOpen(false);
                    if (newQty !== qty) {
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        animatePriceChange();
                        setQty(newQty);
                    }
                }}
                itemName={name}
                image={image}
                price={price}
                initialQty={qty}
            />
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 10,
        marginRight: 14,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
        color: '#111',
    },
    unitLine: {
        fontSize: 13,
        color: '#666',
        marginBottom: 6,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        padding: 6,
        backgroundColor: '#eee',
        borderRadius: 6,
    },
    qty: {
        marginHorizontal: 12,
        fontSize: 15,
        fontWeight: '600',
    },
    total: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
        marginLeft: 12,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    confirmSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
    },
    confirmTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 6,
        textAlign: 'center',
        color: '#111',
    },
    confirmSubtitle: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelBtn: {
        flex: 1,
        marginRight: 10,
        paddingVertical: 12,
        backgroundColor: '#eee',
        borderRadius: 10,
        alignItems: 'center',
    },
    removeBtn: {
        flex: 1,
        marginLeft: 10,
        paddingVertical: 12,
        backgroundColor: '#e74c3c',
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelText: {
        fontWeight: '600',
        color: '#333',
    },
    removeText: {
        fontWeight: '600',
        color: '#fff',
    },
});

export default MenuItem;
