# BeautiClinicPortfolio

**BeautiClinicPortfolio** is a mobile application project built for learning and practicing mobile app development using **React Native** and **Supabase**.
As part of the learning process, the project also includes practice in designing responsive layouts suitable for mobile and Tablet devices.

## Preview

- ▶️ [Demo 1 - Home / course / category / search / filter](https://drive.google.com/file/d/1THw_yyg10vYO-Vqogjb_PleS09byzvJK/view?usp=sharing)
- ▶️ [Demo 2 - Changing theme color](https://drive.google.com/file/d/1QX1-57-1EZXK3vDzd0EZIwxamMF-Ge14/view?usp=drive_link)
- ▶️ [Demo 3 - Signin / create, update and cancel booking](https://drive.google.com/file/d/1QYNz0MLuREpr76Z_NyNPCVzgBXtoxTdw/view?usp=drive_link)
- ▶️ [Demo 4 - Purchase course / payment / order history](https://drive.google.com/file/d/1QZmXoo5coMxdQXaY7m-DmbCoifo-ZFcs/view?usp=drive_link)
- ▶️ [Demo 5 - Backoffice](https://drive.google.com/file/d/1QHNlarl3EjnlnQoQOhtXG-b0Y102Nj8r/view?usp=drive_link)
- ▶️ [Demo 6 - push notification for upcoming appointment](https://drive.google.com/file/d/1THsZCav4wW_F4oix3dFV3llBaCmUIVCP/view?usp=drive_link)

- [Conceptual design on Figma](https://www.figma.com/design/LclVuFlU6b8HWD7l7pJJU2/Beauty-Clinic?node-id=2655-1438&t=UpdKB8rpiLU3rhd7-0)

---

<br>

This project simulates a beauty clinic platform with two main sections:

## 🏬 Store (Customer Side)

This section is designed for **customers**. Users can:

- Browse and purchase beauty treatment **courses**
- **Book appointments** with the clinic
- View their course, booking and order history
- Use authentication features such as sign in, sign up, forgot password and password reset
- Change the app's theme color

## 🛠️ Backoffice (Admin Side)

This section is restricted to **admin users only**. Admins can:

- Manage available courses, category and blackout period
- View and update customer bookings and customer course
- Control access to administrative features

## 🔧 Technologies Used

- **React Native** — for building the cross-platform mobile application
- **TypeScript** — for static typing and improved developer experience
- **React Native Paper** — for ready-to-use UI components
- **React Navigation** — for handling screen navigation (Stack, Bottom Tabs, Drawer)
- **Redux Toolkit** — for local state management
- **React Query** — for server state and API data caching
- **Supabase** — used for authentication, database, file storage, and Edge Functions
- **Firebase** — used for FCM (push notification) and optional authentication
- **Omise** — for payment gateway integration

## 📱 Platform

- Android (primary target)
- iOS (not tested yet – currently no iOS devices)
