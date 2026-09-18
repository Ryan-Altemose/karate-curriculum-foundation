import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return React.createElement(
    Stack,
    null,
    React.createElement(Stack.Screen, {
      name: "index",
      options: { title: "Karate Curriculum" },
    }),
    React.createElement(Stack.Screen, {
      name: "curriculum",
      options: { title: "Curriculum" },
    }),
    React.createElement(Stack.Screen, {
      name: "curriculum/[rankId]",
      options: { title: "Rank Requirements" },
    })
  );
}
