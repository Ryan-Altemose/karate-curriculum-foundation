import { StatusBar } from "expo-status-bar";
import { colors } from "../src/theme";
import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import AppBackground from "../src/components/AppBackground";
import PageTransition from "../src/components/PageTransition";

// Screen wrappers also draw the navigation theme's background. Keep those
// transparent so the one shared decoration stays visible on web and native.
const navigationTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "transparent" },
};

export default function RootLayout() {
  return (
    <AppBackground>
      <ThemeProvider value={navigationTheme}>
        <StatusBar style="dark" />
        <PageTransition>
          <Stack
            screenOptions={{
              headerBackTitle: "",
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: colors.background },
              headerTintColor: colors.ink,
              headerTitleStyle: { fontSize: 16, fontWeight: "600" },
              headerShadowVisible: false,
              contentStyle: { backgroundColor: "transparent" },
              // SDK 58 defaults to transparent headers on iOS 26. These screens
              // expect navigation to reserve space above both lists and empty states.
              headerTransparent: false,
            }}
          >
            <Stack.Screen name="index" options={{ title: "ESK Katalog", headerShown: false }} />
            <Stack.Screen name="curriculum" options={{ title: "Curriculum" }} />
            <Stack.Screen name="kata" options={{ title: "Kata" }} />
            <Stack.Screen name="partner-drill" options={{ title: "Partner Drills" }} />
            <Stack.Screen name="weapon-kata" options={{ title: "Weapon Kata" }} />
            <Stack.Screen name="self-defense" options={{ title: "Self-Defense" }} />
            <Stack.Screen name="curriculum/[rankId]" options={{ title: "Rank Requirements" }} />
            <Stack.Screen name="kata/[itemId]" options={{ title: "Kata" }} />
            <Stack.Screen name="weapon-kata/[itemId]" options={{ title: "Weapon Kata" }} />
            <Stack.Screen name="weapon-kata/sai-kihon" options={{ title: "Sai Kihon" }} />
            <Stack.Screen name="weapon-kata/tonfa-kihon" options={{ title: "Tonfa Kihon" }} />
            <Stack.Screen name="weapon-kata/escrima-stick-patterns" options={{ title: "Escrima Stick Patterns" }} />
            <Stack.Screen name="partner-drill/[itemId]" options={{ title: "Partner Drill" }} />
            <Stack.Screen name="partner-drill/conditioning-drills" options={{ title: "Conditioning Drills" }} />
            <Stack.Screen name="partner-drill/fighting-attacks" options={{ title: "Fighting Attacks" }} />
            <Stack.Screen name="partner-drill/uke-waza" options={{ title: "Uke Waza" }} />
            <Stack.Screen name="partner-drill/promise-kumite" options={{ title: "Promise Kumite" }} />
            <Stack.Screen name="self-defense/[itemId]" options={{ title: "Self-Defense" }} />
          </Stack>
        </PageTransition>
      </ThemeProvider>
    </AppBackground>
  );
}
