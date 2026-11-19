import { colors } from "../theme";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  source?: number | string;
};

export default function DemonstrationVideo({ source }: Props) {
  if (source === undefined) {
    return (
      <View style={[styles.frame, styles.placeholder]}>
        <View style={styles.playBadge}><Ionicons name="play-outline" size={28} color={colors.muted} /></View>
        <Text style={styles.message}>No video available</Text>
      </View>
    );
  }

  return <Player key={source} source={source} />;
}

function Player({ source }: { source: number | string }) {
  const player = useVideoPlayer(source);
  const { status } = useEvent(player, "statusChange", { status: player.status });

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={[styles.frame, styles.video]}
        nativeControls
        playsInline
        contentFit="contain"
        fullscreenOptions={{ enable: true }}
      />
      {status === "error" && (
        <Text accessibilityRole="alert" style={styles.error}>
          Unable to play this video. Check your connection and try reopening this page.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 18 },
  frame: { width: "100%", aspectRatio: 16 / 9, borderRadius: 20 },
  video: { backgroundColor: "#000" },
  placeholder: {
    backgroundColor: colors.inset,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  playBadge: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  message: { color: colors.muted, fontSize: 14, marginTop: 14 },
  error: { color: "#b91c1c", fontSize: 14, lineHeight: 20, marginTop: 8 },
});
