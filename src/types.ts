export interface User {
  profileId: string;
  userId: string | null;
  idOnPlatform: string;
  username: string;
  platform: "uplay" | "xbl" | "psn";
  avatars: {
    146: string;
    256: string;
    500: string;
  };
}

export interface ButtonData {
  type: "r6lookup";
  action: "rank" | "casual" | "warmup" | "picture";
  data: {
    user: User;
    platformFamily: "pc" | "console";
  };
}

export interface Progress {
  profileId: string;
  level: number;
  xp: number;
  lootboxProbability: { raw: number; percent: string };
}

export interface ModeData {
  kills: number;
  deaths: number;
  kd: number;
  wins: number;
  losses: number;
  winRate: string;
  matches: number;
  abandons: number;
}

export interface CachedData {
  Profile: Profile;
  Warmup: ModeData;
  Casual: ModeData;
  Ranked: Ranked;
}

export interface Ranked extends ModeData {
  topRankPosition: number;
  rank: {
    id?: number | undefined;
    slug?: import("r6data").RankSlug | undefined;
    name?: string | undefined;
    icon?: import("r6data").SVGandPNG | undefined;
    iconOfficial?: string | null | undefined;
    range?: [number, number] | null | undefined;
    mmr: number;
    rp: number;
  };
  maxRank: {
    id?: number | undefined;
    slug?: import("r6data").RankSlug | undefined;
    name?: string | undefined;
    icon?: import("r6data").SVGandPNG | undefined;
    iconOfficial?: string | null | undefined;
    range?: [number, number] | null | undefined;
    mmr: number;
    rp: number;
  };
}

export interface CacheResponse {
  data: CachedData;
  fromCache: boolean;
}

export interface Profile {
  level: number;
  lootboxProbability: { raw: number; percent: string };
  xp: number;
  platformsFamilies: "pc" | "console";
  season:
    | { id: number; shorthand: string }
    | {
        id: number;
        shorthand: "Y0S0";
        slug: "release";
        name: string;
        hexColorCode: "#656261";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y1S1";
        slug: "black_ice";
        name: string;
        hexColorCode: "#25768f";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y1S2";
        slug: "dust_line";
        name: string;
        hexColorCode: "#997427";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y1S3";
        slug: "skull_rain";
        name: string;
        hexColorCode: "#396e2f";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y1S4";
        slug: "red_crow";
        name: string;
        hexColorCode: "#971823";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y2S1";
        slug: "velvet_shell";
        name: string;
        hexColorCode: "#5b2676";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y2S2";
        slug: "health";
        name: string;
        hexColorCode: "#00408f";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y2S3";
        slug: "blood_orchid";
        name: string;
        hexColorCode: "#a22b16";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y2S4";
        slug: "white_noise";
        name: string;
        hexColorCode: "#005136";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y3S1";
        slug: "chimera";
        name: string;
        hexColorCode: "#c18e00";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y3S2";
        slug: "para_bellum";
        name: string;
        hexColorCode: "#767f2e";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y3S3";
        slug: "grim_sky";
        name: string;
        hexColorCode: "#36526e";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y3S4";
        slug: "wind_bastion";
        name: string;
        hexColorCode: "#886a3f";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y4S1";
        slug: "burnt_horizon";
        name: string;
        hexColorCode: "#a80048";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y4S2";
        slug: "phantom_sight";
        name: string;
        hexColorCode: "#263677";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y4S3";
        slug: "ember_rise";
        name: string;
        hexColorCode: "#114f07";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y4S4";
        slug: "shifting_tides";
        name: string;
        hexColorCode: "#067e8f";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y5S1";
        slug: "void_edge";
        name: string;
        hexColorCode: "#755377";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y5S2";
        slug: "steel_wave";
        name: string;
        hexColorCode: "#22667c";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y5S3";
        slug: "shadow_legacy";
        name: string;
        hexColorCode: "#56840e";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y5S4";
        slug: "neon_dawn";
        name: string;
        hexColorCode: "#a73306";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y6S1";
        slug: "crimson_heist";
        name: string;
        hexColorCode: "#8a0000";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y6S2";
        slug: "north_star";
        name: string;
        hexColorCode: "#007d98";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y6S3";
        slug: "crystal_guard";
        name: string;
        hexColorCode: "#cc8200";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y6S4";
        slug: "high_calibre";
        name: string;
        hexColorCode: "#465e1d";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y7S1";
        slug: "demon_veil";
        name: string;
        hexColorCode: "#b27400";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y7S2";
        slug: "vector_glare";
        name: string;
        hexColorCode: "#60cdb0";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y7S3";
        slug: "brutal_swarm";
        name: string;
        hexColorCode: "#dac925";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y7S4";
        slug: "solar_raid";
        name: string;
        hexColorCode: "#d03314";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y8S1";
        slug: "commanding_force";
        name: string;
        hexColorCode: "#45abf3";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      }
    | {
        id: number;
        shorthand: "Y8S2";
        slug: "dread_factor";
        name: string;
        hexColorCode: "#6432ef";
        thumbnail: string;
        thumbnailOfficial: string;
        releaseDate: string;
      };
}
