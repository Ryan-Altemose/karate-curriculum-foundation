import { StyleSheet, View, ViewStyle } from "react-native";
import { fullBlackBeltIds, getBeltVisual } from "../data/rank";

type Props = {
  rankId: string;
  degree?: number;
  width?: number;
  height?: number;
  style?: ViewStyle;
};

export default function BeltSwatch({ rankId, degree, width = 64, height = 14, style }: Props) {
  const isBlack = rankId.endsWith("-ho") || fullBlackBeltIds.includes(rankId);
  const visual = getBeltVisual(rankId, degree);

  return (
    <View
      style={[
        { width, height, overflow: "hidden", borderWidth: 1, borderColor: "#777" },
        // Black belts should run horizontally across the swatch; non-black vertical
        isBlack ? styles.row : styles.column,
        style,
      ]}
    >
      {visual.segments.map((segment, i) => (
        <View
          key={`${rankId}-${i}`}
          style={{ flex: segment.weight, backgroundColor: segment.color, width: isBlack ? undefined : "100%" }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  column: { flexDirection: "column" },
});
