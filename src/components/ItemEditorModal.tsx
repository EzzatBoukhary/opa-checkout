import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Dimensions,
    LayoutAnimation,
    TextInput,
    Platform,
    UIManager,
} from 'react-native';
import Modal from 'react-native-modal';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const screenHeight = Dimensions.get('window').height;

type Props = {
    visible: boolean;
    onClose: () => void;
    onRemove: () => void;
    onApply: (newQty: number) => void;
    itemName: string;
    image: string;
    price: number;
    initialQty: number;
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ItemEditorModal = ({
    visible,
    onClose,
    onRemove,
    onApply,
    itemName,
    image,
    price,
    initialQty,
}: Props) => {
    const [qty, setQty] = useState(initialQty);
    const [specialInstructions, setInstructions] = useState('');
    const [customizations, setCustomizations] = useState({
        extraSauce: false,
        noOnions: false,
        glutenFree: false,
    });

    const toggleCustomization = (key: keyof typeof customizations) => {
        setCustomizations((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleQtyChange = (delta: number) => {
        LayoutAnimation.easeInEaseOut();
        const newQty = Math.max(1, qty + delta);
        if (newQty !== qty) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setQty(newQty);
        }
    };

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection="down"
            style={styles.modal}
            propagateSwipe
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={styles.sheet}>
                <Pressable onPress={onClose} style={styles.closeBtn}>
                    <AntDesign name="close" size={22} color="#333" />
                </Pressable>

                <KeyboardAwareScrollView
                    contentContainerStyle={[styles.scroll, { flexGrow: 1 }]}
                    keyboardShouldPersistTaps="handled"
                    enableResetScrollToCoords={false}
                    enableOnAndroid={true}
                    extraScrollHeight={80}
                >
                    <Image source={{ uri: image }} style={styles.image} />
                    <Text style={styles.name}>{itemName}</Text>

                    <Text style={styles.details}>Served with fries. Customize below.</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Customizations</Text>
                        {Object.entries(customizations).map(([key, value]) => (
                            <Pressable
                                key={key}
                                style={styles.checkboxRow}
                                onPress={() => toggleCustomization(key as keyof typeof customizations)}
                            >
                                <View style={[styles.checkbox, value && styles.checkedBox]}>
                                    {value && <AntDesign name="check" size={14} color="#fff" />}
                                </View>
                                <Text style={styles.checkboxLabel}>
                                    {key === 'extraSauce' ? 'Extra Sauce' :
                                        key === 'noOnions' ? 'No Onions' :
                                            key === 'glutenFree' ? 'Gluten-Free Bun' : key}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Special Instructions</Text>
                        <TextInput
                            placeholder="e.g. no pickles, sauce on the side"
                            value={specialInstructions}
                            onChangeText={setInstructions}
                            style={styles.instructions}
                            multiline
                        />
                    </View>

                    <View style={styles.qtySection}>
                        <Text style={styles.qtyLabel}>Quantity</Text>
                        <View style={styles.qtyControls}>
                            <Pressable onPress={() => handleQtyChange(-1)} style={styles.qtyBtn}>
                                <AntDesign name="minus" size={16} color="#333" />
                            </Pressable>
                            <Text style={styles.qty}>{qty}</Text>
                            <Pressable onPress={() => handleQtyChange(1)} style={styles.qtyBtn}>
                                <AntDesign name="plus" size={16} color="#333" />
                            </Pressable>
                        </View>
                    </View>

                    <Pressable style={styles.removeBtn} onPress={onRemove}>
                        <Feather name="trash-2" size={16} color="#fff" />
                        <Text style={styles.removeText}>Remove Item</Text>
                    </Pressable>
                </KeyboardAwareScrollView>

                <View style={styles.footer}>
                    <Pressable
                        style={styles.updateBtn}
                        onPress={() => onApply(qty)}
                    >
                        <Text style={styles.updateText}>
                            Update Item – ${(qty * price).toFixed(2)}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    sheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: screenHeight * 0.95,
        paddingBottom: 80,
        overflow: 'hidden',
    },
    closeBtn: {
        position: 'absolute',
        top: 18,
        right: 18,
        zIndex: 10,
    },
    image: {
        width: '100%',
        height: 200,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 16,
        textAlign: 'center',
        color: '#111',
    },
    details: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginTop: 6,
        paddingHorizontal: 20,
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 10,
        color: '#111',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        backgroundColor: '#ddd',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedBox: {
        backgroundColor: '#2ecc71',
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#333',
    },
    instructions: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 10,
        minHeight: 80,
        fontSize: 14,
        color: '#111',
        textAlignVertical: 'top',
    },
    qtySection: {
        marginTop: 30,
        alignItems: 'center',
    },
    qtyLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    qtyControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyBtn: {
        backgroundColor: '#eee',
        padding: 8,
        borderRadius: 8,
    },
    qty: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 16,
    },
    removeBtn: {
        marginTop: 32,
        flexDirection: 'row',
        backgroundColor: '#e74c3c',
        marginHorizontal: 24,
        borderRadius: 12,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    removeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
        padding: 16,
    },
    updateBtn: {
        backgroundColor: '#2ecc71',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    updateText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    scroll: {
        paddingBottom: 100,
    },
});

export default ItemEditorModal;
