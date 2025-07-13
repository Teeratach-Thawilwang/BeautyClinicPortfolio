# BeautiClinicPortfolio

**BeautiClinicPortfolio** is a mobile application project built for learning and practicing mobile app development using **React Native** and **Supabase**.
As part of the learning process, the project also includes practice in designing responsive layouts suitable for mobile and Tablet devices.

**Figma** : https://www.figma.com/design/LclVuFlU6b8HWD7l7pJJU2/Beauty-Clinic?node-id=2-3&t=mwLgLOYju5BHOhsH-1

This project simulates a beauty clinic platform with two main sections:

## 🏬 Store (Customer Side)

This section is designed for **customers**. Users can:

- Browse and purchase beauty treatment **courses**
- **Book appointments** with the clinic
- View their booking history and course details

## 🛠️ Backoffice (Admin Side)

This section is restricted to **admin users only**. Admins can:

- Manage available courses and pricing
- View and update customer bookings
- Control access to administrative features

## 🔧 Technologies Used

- **React Native** — for building the mobile UI
- **React Native Paper** — for UI components
- **Supabase** — used for authentication, database, storage, and edge functions
- **TypeScript** — for type safety and better developer experience
- **React Navigation** — for navigation between screens (Stack, BottomTab, Drawer)
- **Redux Toolkit** for state management
- **React Query** for state management of APIs
- **Firebase** for authentication and FCM

## 📦 Features in Progress

- [Store] Push notification when appointment incoming (using cron + edge function + FCM).

## 📱 Platform

- Android (primary target)
- iOS (not tested yet – currently no iOS devices)
