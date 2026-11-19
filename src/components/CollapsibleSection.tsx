import { type ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, ui } from "../theme";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  children?: ReactNode;
  initiallyOpen?: boolean;
};

export default function CollapsibleSection({ title, children, initiallyOpen = false }: Props) {
  const [open, setOpen] = useState(initiallyOpen);

  return (
    <View style={styles.container}>
      <Pressable accessibilityRole="button" accessibilityLabel={title} accessibilityState={{ expanded: open }} style={({ pressed }) => [ui.card, styles.header, pressed && styles.pressed]} onPress={() => setOpen((s) => !s)}>
        <View style={styles.headerInner}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.chevron}>
          <Ionicons name={open ? "chevron-up" : "chevron-down"} size={20} color={colors.surface} />
        </View>
      </Pressable>

      {open ? <View style={styles.content}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 4 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 64,
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: colors.ink,
    borderColor: colors.ink,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  headerInner: { flexDirection: "row", alignItems: "center", flex: 1, justifyContent: "flex-start" },
  title: { fontSize: 15, fontWeight: "700", letterSpacing: 1, color: colors.surface },
  chevron: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff1a" },
  pressed: { opacity: 0.85 },
  content: { marginTop: 8, marginLeft: 10, paddingLeft: 10, borderLeftWidth: 2, borderLeftColor: colors.border },
});
