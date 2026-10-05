import React from "react";
import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import BeltSwatch from "../src/components/BeltSwatch";
import { currentStudent } from "../src/data/student";
import { getRankById } from "../src/data/curriculum";

export default function RootLayout() {
  const HeaderTitle = ({ children }: { children: React.ReactNode }) => {
    const rank = getRankById(currentStudent.currentRankId);

    return (
      React.createElement(View, { style: styles.headerTitle },
        React.createElement(Text, { style: styles.headerTitleText }, children),
        React.createElement(BeltSwatch, {
          rankId: currentStudent.currentRankId,
          degree: rank?.degree,
          width: 72,
          height: 16,
        })
      )
    );
  };

  return React.createElement(
    Stack,
    { screenOptions: { headerBackTitle: "", headerTitle: (props: any) => React.createElement(HeaderTitle, props), headerTitleAlign: "center" } },
    React.createElement(Stack.Screen, {
      name: "index",
      options: { title: "", headerShown: false },
    }),
    React.createElement(Stack.Screen, {
      name: "curriculum",
      options: { title: "Curriculum" },
    }),
    React.createElement(Stack.Screen, {
      name: "kata",
      options: { title: "Kata" },
    }),
    React.createElement(Stack.Screen, {
      name: "partner-drill",
      options: { title: "Partner Drills" },
    }),
    React.createElement(Stack.Screen, {
      name: "weapon-kata",
      options: { title: "Weapon Kata" },
    }),
    React.createElement(Stack.Screen, {
      name: "self-defense",
      options: { title: "Self-Defense" },
    }),
    React.createElement(Stack.Screen, {
      name: "curriculum/[rankId]",
      options: { title: "Rank Requirements" },
    })
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },
});
