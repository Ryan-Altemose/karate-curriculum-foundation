import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, ui } from "../theme";
import { Ionicons } from "@expo/vector-icons";

type ContentAccessRowProps = {
  label: string;
  onPress: () => void;
  variant?: "solid" | "outline";
  tone?: { accent: string; text: string };
};

export default function ContentAccessRow({ label, onPress, variant = "solid", tone }: ContentAccessRowProps) {
  const outlineTone = variant === "outline" ? tone : undefined;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => [
        ui.card,
        styles.row,
        variant === "outline" && styles.outline,
        outlineTone && {
          backgroundColor: `${outlineTone.accent}0D`,
          borderColor: `${outlineTone.accent}66`,
          borderLeftWidth: 3,
          borderLeftColor: outlineTone.accent,
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.label, outlineTone && { color: outlineTone.text }]}>{label}</Text>
      </View>
      <View style={[styles.chevron, outlineTone && { backgroundColor: `${outlineTone.accent}14` }]}>
        <Ionicons
          name="chevron-forward"
          size={18}
          color={outlineTone?.text ?? colors.muted}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outline: {
    backgroundColor: "transparent",
    borderColor: "#d4d4d4",
    boxShadow: "none",
  },
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
