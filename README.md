# React Native Checkout Screen

This is a simple React Native project built with Expo. It shows a restaurant checkout screen with menu items, delivery method selection, a promo code section, and a summary of the order. The goal was to build a clean, responsive UI similar to what you'd see in modern food delivery apps.

---

## 🎥 Demo

You can watch a short screen recording of the app here:  
[Google Drive – Demo Video](https://drive.google.com/file/d/1Dl-FgKvm0923-EojiJIssVJksp4HQv-z/view?usp=sharing)

---

## What's in this project

- A working UI that:
  - Displays restaurant info (name, image, address, hours)
  - Lists cart items with quantity, image, and price
  - Lets users remove items or apply a promo code
  - Shows a price breakdown (subtotal, tax, discount, total)
- Reusable components like `RestaurantHeader`, `MenuItem`, `PriceSummary`, etc.
- Smooth layout animations when removing items or applying promos

---

## Tech stack

- **React Native (via Expo)** – quick setup and testing on mobile
- **TypeScript** – added for type safety and clarity
- **Axios** – to fetch mock API data (cart and working hours)
- **KeyboardAwareScrollView** – to handle form inputs and keyboard overlaps
- **LayoutAnimation** – for subtle UI transitions

---

## Why this setup

Kept the architecture simple and component-based to keep things readable and easy to maintain. Everything’s structured into small parts (like menu item cards or the price summary), and the cart data is managed with React state. LayoutAnimation adds a nice touch when items change, though it can be tricky inside scroll views, that took some trial and error.

---

## How to run it

1. Clone the repo:
   ```bash
   git clone [https://github.com/your-username/checkout-screen-demo.git](https://github.com/EzzatBoukhary/opa-checkout.git)
   cd checkout-screen-demo

2. Install dependencies: npm install
3. Start the app: npx expo start
