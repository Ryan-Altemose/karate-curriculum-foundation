import React from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getKataById } from "../../src/data/kata";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

export default function KataItemPage() {
  const params = useLocalSearchParams();
  const { itemId } = params as { itemId?: string };
  const kata = itemId ? getKataById(itemId) : undefined;

  if (!kata) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Item not found</Text>
      </View>
    );
  }

  const maybeUrl = kata.notes?.trim();
  const videoUrl = maybeUrl && (maybeUrl.startsWith("http://") || maybeUrl.startsWith("https://")) ? maybeUrl : undefined;

  const localVideoUri = kata.videoAsset ? Image.resolveAssetSource(kata.videoAsset).uri : undefined;
  const localVideoHtml = localVideoUri
    ? `<!doctype html><html><head><meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" /><style>html,body{height:100%;margin:0;background:#000}video{width:100%;height:100%;background:#000;object-fit:contain}</style></head><body><video controls playsinline webkit-playsinline src="${localVideoUri}"></video></body></html>`
    : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{kata.name}</Text>

      {localVideoHtml ? (
        <WebView
          source={{ html: localVideoHtml }}
          style={styles.video}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
        />
      ) : videoUrl ? (
        <WebView
          source={{ uri: videoUrl }}
          style={styles.video}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
        />
      ) : (
        <View style={styles.videoContainer}>
          <Ionicons name="play-circle" size={64} color="#fff" />
          <Text style={styles.videoHint}>{kata.notes ? "Open video / resource" : "No video available"}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{kata.notes ?? "No description yet."}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    paddingBottom: 60,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 16, color: "#111" },
  videoContainer: {
    height: 200,
    backgroundColor: "#000",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  videoHint: { color: "#fff", marginTop: 8 },
  section: { marginTop: 6 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  description: { fontSize: 15, lineHeight: 22, color: "#333" },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 18,
  },
});
