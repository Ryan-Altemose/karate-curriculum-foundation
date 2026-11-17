import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ContentAccessRowProps = {
  label: string;
  onPress?: () => void;
};

export default function ContentAccessRow({ label, onPress }: ContentAccessRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => [
        styles.row,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}> 
        <Text style={styles.label}>{label}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={22}
        color="#222"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 76,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  pressed: {
    opacity: 0.7,
  },
});
