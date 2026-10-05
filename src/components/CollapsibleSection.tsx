import React, { ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
      <Pressable style={styles.header} onPress={() => setOpen((s) => !s)}>
        <View style={styles.headerInner}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={24} color="#333" />
      </Pressable>

      {open ? <View style={styles.content}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10, paddingVertical: 8 },
  headerInner: { flexDirection: "row", alignItems: "center", flex: 1, justifyContent: "center" },
  title: { fontSize: 14, fontWeight: "800", letterSpacing: 1, color: "#444" },
  content: { marginTop: 6 },
});
