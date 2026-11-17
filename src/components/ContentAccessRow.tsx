import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, ui } from "../theme";
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
        ui.card,
        styles.row,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}> 
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.chevron}>
        <Ionicons
          name="chevron-forward"
          size={18}
          color={colors.muted}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 72,
    paddingHorizontal: 18,
    paddingVertical: 14,
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
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "600",
    color: colors.ink,
  },
  chevron: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" },
  pressed: {
    opacity: 0.75,
  },
});
