import { StyleSheet } from "react-native";
import type { RequirementCategory } from "./data/rank";

export const colors = {
  background: "#FAFAFA",
  surface: "#ffffff",
  ink: "#24272d",
  muted: "#686c74",
  border: "#e6e4df",
  accent: "#ad2939",
  accentSoft: "#f7e9eb",
  inset: "#eeede9",
  test: "#f0eaf3",
};

export const categoryColors: Record<RequirementCategory, { accent: string; text: string }> = {
  kata: { accent: colors.accent, text: colors.accent },
  weaponKata: { accent: colors.ink, text: colors.ink },
  partnerDrill: { accent: "#bf6f24", text: "#955018" },
  selfDefense: { accent: "#714da2", text: "#714da2" },
};

export const ui = StyleSheet.create({
  screen: { width: "100%", maxWidth: 720, alignSelf: "center" },
  title: { color: colors.ink, fontSize: 28, fontWeight: "700", letterSpacing: -0.6 },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    boxShadow: "0px 2px 6px rgba(36, 39, 45, 0.03)",
  },
});
