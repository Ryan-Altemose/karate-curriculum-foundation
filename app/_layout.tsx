import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "", headerTitleAlign: "center" }}>
      <Stack.Screen name="index" options={{ title: "Curriculum Reference", headerShown: false }} />
      <Stack.Screen name="curriculum" options={{ title: "Curriculum" }} />
      <Stack.Screen name="kata" options={{ title: "Kata" }} />
      <Stack.Screen name="partner-drill" options={{ title: "Partner Drills" }} />
      <Stack.Screen name="weapon-kata" options={{ title: "Weapon Kata" }} />
      <Stack.Screen name="self-defense" options={{ title: "Self-Defense" }} />
      <Stack.Screen name="curriculum/[rankId]" options={{ title: "Rank Requirements" }} />
      <Stack.Screen name="kata/[itemId]" options={{ title: "Kata" }} />
      <Stack.Screen name="weapon-kata/[itemId]" options={{ title: "Weapon Kata" }} />
      <Stack.Screen name="partner-drill/[itemId]" options={{ title: "Partner Drill" }} />
      <Stack.Screen name="self-defense/[itemId]" options={{ title: "Self-Defense" }} />
    </Stack>
  );
}
