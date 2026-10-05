import React from "react";
import { StyleSheet, View, Text, Pressable, Linking } from "react-native";
import { WebView } from "react-native-webview";

function isDirectMedia(url?: string) {
  return !!url && /\.(mp4|m3u8)(\?|$)/i.test(url);
}

function getYoutubeEmbed(url: string) {
  const m = url.match(/(?:v=|youtu\.be\/|\/embed\/)([A-Za-z0-9_-]{6,})/);
  return m ? `https://www.youtube.com/embed/${m[1]}?playsinline=1` : null;
}

export default function InlineVideo({ uri }: { uri?: string | null }) {
  if (!uri) return null;

  if (isDirectMedia(uri)) {
    // Lazy-require expo-av to avoid crashing when native module isn't available
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
      const { Video, ResizeMode } = require("expo-av") as any;
      return (
        <View style={styles.container}>
          <Video source={{ uri }} useNativeControls resizeMode={ResizeMode.CONTAIN} style={styles.video} />
        </View>
      );
    } catch (e) {
      // Native module not available (e.g. running in an environment without a rebuilt native app).
      // Show a safe fallback that lets the user open the URL externally.
      return (
        <View style={[styles.container, styles.fallback]}>
          <Text style={styles.fallbackText}>Video playback not available in this build.</Text>
          <Pressable onPress={() => Linking.openURL(uri)} style={styles.fallbackButton}>
            <Text style={styles.fallbackButtonText}>Open in browser</Text>
          </Pressable>
        </View>
      );
    }
  }

  const yt = getYoutubeEmbed(uri);
  if (yt) {
    return <WebView originWhitelist={["*"]} source={{ uri: yt }} style={styles.webview} />;
  }

  return <WebView originWhitelist={["*"]} source={{ uri }} style={styles.webview} />;
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  video: { width: "100%", height: 220, borderRadius: 12, overflow: "hidden" },
  webview: { width: "100%", height: 220, borderRadius: 12, overflow: "hidden" },
  fallback: { height: 220, borderRadius: 12, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  fallbackText: { color: "#fff", marginBottom: 12 },
  fallbackButton: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "#fff", borderRadius: 8 },
  fallbackButtonText: { color: "#000", fontWeight: "600" },
});
