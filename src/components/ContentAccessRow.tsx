import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ContentAccessRowProps = {
  label: string;
  locked: boolean;
  onPress?: () => void;
};

export default function ContentAccessRow({ label, locked, onPress }: ContentAccessRowProps) {
  return (
    <Pressable
      disabled={locked}
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => [
        styles.row,
        locked && styles.lockedRow,
        pressed && !locked && styles.pressed,
      ]}
    >
      <View style={styles.content}> 
        <Text style={[styles.label, locked && styles.lockedText]}>{label}</Text>
        <Text style={[styles.status, locked && styles.lockedText]}>
          {locked ? "Unavailable" : "Available"}
        </Text>
      </View>
      <Ionicons
        name={locked ? "lock-closed-outline" : "chevron-forward"}
        size={22}
        color={locked ? "#999" : "#222"}
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
  lockedRow: {
    backgroundColor: "#e9e9e9",
    borderColor: "#ddd",
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
  status: {
    marginTop: 4,
    fontSize: 13,
    color: "#777",
  },
  lockedText: {
    color: "#999",
  },
  pressed: {
    opacity: 0.7,
  },
});
