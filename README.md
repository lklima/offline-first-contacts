# Offline-First Contact App

This project is a demonstration of a real-world offline-first contact application built with [Expo](https://expo.dev/), [WatermelonDB](https://nozbe.github.io/WatermelonDB/), and [Firebase](https://firebase.google.com/).

<video src="https://github.com/user-attachments/assets/8990245c-4d15-4077-8a4e-9f7cf48be2dc" width="300" height="600"></video>

## Features

- **Offline-first architecture:** Users can create, view, and manage their contacts even when offline. All changes are stored locally using WatermelonDB.
- **Real-time sync:** When connectivity is restored, data is automatically synchronized with Firebase Firestore, ensuring your contacts stay up-to-date across devices.
- **Modern React Native stack:** Developed with Expo for fast development and easy testing on iOS, Android, and Web.
- **Optimized performance:** WatermelonDB provides fast local operations and efficient sync processes, suitable for real-world large datasets.

## Tech Stack

- **Expo**: For developing, building, and deploying the React Native app.
- **WatermelonDB**: As the local database to provide fast, reactive, and persistent data storage on device.
- **Firebase Firestore**: As the backend database for cloud synchronization and real-time updates across users/devices.

## Getting Started

1. **Install dependencies:**

   ```
   npm install
   ```

2. **Configure Firebase:**

   - Add your Firebase config in `config/firebase.ts`.

3. **Run the app:**

   ```
   npm run ios or npm run android
   ```

   Then follow the prompts to run on an emulator, device.

## Purpose

This project showcases best practices for building robust offline-friendly mobile apps. Use it to learn or as a foundation for your own offline-first, real-time applications!

## License

MIT
