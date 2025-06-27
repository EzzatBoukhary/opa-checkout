import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    ActivityIndicator,
    LayoutAnimation,
    Text,
    Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { api } from '../api/opaClient';
import PromoCodeCard from '../components/PromoCodeCard';
import DeliveryMethodCard from '../components/DeliveryMethodCard';
import PaymentCard from '../components/PaymentCard';
import PriceSummary from '../components/PriceSummary';
import { Cart, WorkingHour } from '../types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RestaurantHeader from '../components/RestaurantHeader';
import MenuItem from '../components/MenuItem';

const CheckoutScreen = () => {
    const navigation = useNavigation();
    const [cart, setCart] = useState<Cart | null>(null);
    const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
    const [loading, setLoading] = useState(true);

    const [promo, setPromo] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
    const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cartRes = await api.get('/mobile/api/v2/cart');
                setCart(cartRes.data.data);

                const restId = cartRes.data.data.restaurant_id;
                const hoursRes = await api.get(`/restaurant/api/v1/restaurants/${restId}/working-hours`);
                setWorkingHours(hoursRes.data.data);
            } catch (err) {
                console.error('Error loading data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useLayoutEffect(() => {
        if (cart?.restaurant.name) {
            navigation.setOptions({
                headerTitleAlign: 'center',
                headerTitle: () => (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: '700' }}>Checkout</Text>
                        <Text style={{ fontSize: 13, color: '#777' }}>{cart.restaurant.name}</Text>
                    </View>
                ),
            });
        }
    }, [navigation, cart?.restaurant.name]);

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const hoursToday = workingHours.find(day => day.day === today);
    const isOpen = !!hoursToday;

    const discountAmount = appliedPromo ? 5 : cart?.bill.discount ?? 0;
    const total = cart
        ? cart.bill.gross_amount + cart.bill.tax + (cart.bill.platform_fee ?? 0) - discountAmount
        : 0;

    function handleRemoveItem(id: string) {
        console.log('[handleRemoveItem] Attempting to remove:', id);

        try {
            setCart(prev => {
                if (!prev) {
                    console.warn('[handleRemoveItem] Cart is null');
                    return prev;
                }

                const newItems = prev.menu_items.filter(item => item.id !== id);
                                console.log('[handleRemoveItem] Updated cart:', newItems);

                const updatedCart = { ...prev, menu_items: newItems };

                console.log('[handleRemoveItem] Updated cart:', updatedCart);
                return updatedCart;
            });

            try {
                LayoutAnimation.easeInEaseOut();
            } catch (e) {
                console.warn('[handleRemoveItem] Layout animation error:', e);
            }
        } catch (err) {
            console.error('[handleRemoveItem] Crash during cart update:', err);
        }
    }


    function handleApplyPromo() {
        if (promo.trim()) {
            LayoutAnimation.easeInEaseOut();
            setAppliedPromo(promo.trim());
            setPromo('');
        }
    }

    function handleRemovePromo() {
        LayoutAnimation.easeInEaseOut();
        setAppliedPromo(null);
    }

    if (loading || !cart) {
        return <ActivityIndicator style={{ marginTop: 100 }} size="large" />;
    }

    const { bill, menu_items, restaurant } = cart;
    const address = `${restaurant.address_street_1}, ${restaurant.address_city}, ${restaurant.address_state} ${restaurant.address_postal_code}`;

    return (
        <View style={styles.root}>
            <KeyboardAwareScrollView
                contentContainerStyle={[styles.scroll, { flexGrow: 1 }]}
                keyboardShouldPersistTaps="handled"
                enableResetScrollToCoords={false}
                enableOnAndroid={true}
                extraScrollHeight={80}
            >

                <RestaurantHeader
                    name={restaurant.name}
                    imageUrl={restaurant.profile_image_url}
                    address={address}
                    workingHours={workingHours}
                    isOpen={isOpen}
                />

                <DeliveryMethodCard
                    method={deliveryMethod}
                    setMethod={setDeliveryMethod}
                    address={address}
                />

                {menu_items.length === 0 ? (
                    <Text style={{ textAlign: 'center', color: '#888', marginVertical: 24 }}>
                        Your cart is empty.
                    </Text>
                ) : (
                    menu_items.map(item => (
                        <MenuItem
                            key={item.id}
                            name={item.name}
                            image={item.image_url}
                            price={item.price_per_item}
                            quantity={item.quantity}
                            onRemove={() => handleRemoveItem(item.id)}
                        />
                    ))
                )}

                <PaymentCard />

                <PromoCodeCard
                    promo={promo}
                    setPromo={setPromo}
                    onApply={handleApplyPromo}
                    onRemove={handleRemovePromo}
                    appliedCode={appliedPromo}
                    discountAmount={discountAmount}
                />

                <PriceSummary
                    gross={bill.gross_amount}
                    tax={bill.tax}
                    platformFee={bill.platform_fee ?? 0}
                    discount={discountAmount}
                    net={total}
                />

                <Text style={styles.note}>You’ll be charged once the order is confirmed.</Text>
            </KeyboardAwareScrollView>

            <SafeAreaView edges={['bottom']} style={styles.footerSafeArea}>
                <View style={styles.footer}>
                    <Text style={styles.summaryText}>
                        {deliveryMethod === 'delivery'
                            ? `Your order will be delivered to ${address}`
                            : `You'll pick up your order at ${address}`}
                    </Text>

                    <Pressable style={styles.checkoutBtn}>
                        <Text style={styles.checkoutText}>Place Order – ${total.toFixed(2)}</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    container: {
        paddingHorizontal: 16,
        paddingBottom: 180,
    },
    note: {
        fontSize: 13,
        color: '#888',
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 16,
    },
    footerSafeArea: {
        backgroundColor: '#fff',
    },
    footer: {
        borderTopWidth: 1,
        borderColor: '#eee',
        padding: 16,
        backgroundColor: '#fff',
    },
    summaryText: {
        fontSize: 13,
        color: '#444',
        marginBottom: 6,
        textAlign: 'center',
    },
    checkoutBtn: {
        backgroundColor: '#e74c3c',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    checkoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    scroll: {
        paddingBottom: 100,
    },
});

export default CheckoutScreen;
