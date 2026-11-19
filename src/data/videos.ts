import type { RequirementCategory } from "./rank";

type VideoSource = number | string;

// Add optimized MP4s here, keyed by the item's existing catalog ID.
// Metro needs literal require paths to include files in native and web builds.
const videos: Record<RequirementCategory, Partial<Record<string, VideoSource>>> = {
  kata: {
    gojushiho: require("../../assets/videos/first_test_gojushiho.mp4"),
  },
  weaponKata: {},
  partnerDrill: {},
  selfDefense: {},
};

export function getVideoSource(category: RequirementCategory, itemId: string): VideoSource | undefined {
  return videos[category][itemId];
}
