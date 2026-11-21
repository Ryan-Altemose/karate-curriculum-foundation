import type { PropsWithChildren } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Svg, { Defs, G, LinearGradient, Path, Pattern, Rect, Stop } from "react-native-svg";
import { colors } from "../theme";

const TILE_WIDTH = 96;
const TILE_HEIGHT = 48;
const RADIUS = TILE_WIDTH / 2;
const RINGS = [48, 38, 28, 18, 8];
const WAVE_COLOR = "#80cff4";

function semicircle(x: number, y: number, radius: number) {
  return `M ${x - radius} ${y} A ${radius} ${radius} 0 0 1 ${x + radius} ${y}`;
}

// Include neighboring fans so overlapping arcs meet seamlessly at tile edges.
const fans = [0, 1, 2, 3, 4].flatMap((row) =>
  [-1, 0, 1].map((column) => ({
    x: column * TILE_WIDTH + (row % 2) * RADIUS,
    y: row * (TILE_HEIGHT / 2),
  }))
);

export default function AppBackground({ children }: PropsWithChildren) {
  const { height } = useWindowDimensions();
  const waveHeight = Math.min(360, Math.max(160, height * 0.44));
  

  return (
    <View testID="app-background" style={styles.container}>
      <View
        testID="seigaiha-background"
        pointerEvents="none"
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[styles.waves, { height: waveHeight }]}
      >
        <Svg width="100%" height="100%">
          <Defs>
            <Pattern id="seigaiha" width={TILE_WIDTH} height={TILE_HEIGHT} patternUnits="userSpaceOnUse">
              {fans.map(({ x, y }) => (
                <G key={`${x}-${y}`}>
                  <Path d={`${semicircle(x, y, RADIUS)} Z`} fill={colors.background} />
                  {RINGS.map((radius) => (
                    <Path key={radius} d={semicircle(x, y, radius)} fill="none" stroke={WAVE_COLOR} strokeWidth={1.25} />
                  ))}
                </G>
              ))}
            </Pattern>
            <LinearGradient id="waveFade" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={colors.background} stopOpacity={1} />
              <Stop offset="10%" stopColor={colors.background} stopOpacity={1} />
              <Stop offset="100%" stopColor={colors.background} stopOpacity={0} />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#seigaiha)"  />
          <Rect width="100%" height="100%" fill="url(#waveFade)" />
        </Svg>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  waves: { position: "absolute", left: 0, right: 0, bottom: 0, overflow: "hidden" },
});
