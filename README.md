# Karate Curriculum

Foundation for a student-facing karate curriculum app built with React Native and Expo.

## Current foundation

- Expo + React Native + TypeScript
- Expo Router
- Home screen
- Curriculum screen
- Rank-based locked/unlocked UI using mock data
- No backend, authentication, or real curriculum data yet

## Run locally

1. Install Node.js (LTS).
2. From this directory, run:

```bash
npm install
npm start
```

3. Install Expo Go on your phone and scan the QR code shown by Expo.

## Planned architecture

```text
Student Mobile App
        |
        v
     Backend API
        |
        v
      Database
        ^
        |
Instructor/Admin Web App
```

The first implementation intentionally uses local mock data. Backend/authentication should be added after the basic student experience is working.
