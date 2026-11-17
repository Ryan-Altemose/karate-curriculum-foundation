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
      <View style={styles.placeholder}>
        <Ionicons name="play-circle" size={64} color="#fff" />
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
        style={styles.video}
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
  video: { width: "100%", aspectRatio: 16 / 9, backgroundColor: "#000", borderRadius: 12 },
  placeholder: {
    height: 200,
    backgroundColor: "#000",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  message: { color: "#fff", marginTop: 8 },
  error: { color: "#b91c1c", fontSize: 14, lineHeight: 20, marginTop: 8 },
});
