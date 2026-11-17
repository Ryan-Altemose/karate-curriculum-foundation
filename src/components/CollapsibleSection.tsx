import React, { ReactNode, useState } from "react";
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
      <Pressable accessibilityRole="button" accessibilityLabel={title} accessibilityState={{ expanded: open }} style={[ui.card, styles.header]} onPress={() => setOpen((s) => !s)}>
        <View style={styles.headerInner}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={24} color={colors.accent} />
      </Pressable>

      {open ? <View style={styles.content}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 4 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", minHeight: 64, paddingHorizontal: 18, paddingVertical: 16 },
  headerInner: { flexDirection: "row", alignItems: "center", flex: 1, justifyContent: "flex-start" },
  title: { fontSize: 14, fontWeight: "700", letterSpacing: 1, color: colors.ink },
  content: { marginTop: 6 },
});
