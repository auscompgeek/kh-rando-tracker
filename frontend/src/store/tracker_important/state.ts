const CROWNS = ["bronze", "silver", "gold"].map(i => `secondary/crowns/${i}`);
const CHEST = "secondary/chest";
const DONALD = "secondary/duck";

interface BaseItem {
  total?: number;
  data?: string;
  secondary?: string | string[];
  secondaryTotal?: number;
  secondaryMax?: boolean;
  cls?: string;
  group?: string;

  // set in the loop below
  level?: number;
  opaque?: boolean;
  disabled?: boolean;
  secondaryLevel?: number;
  setting?: string;
}

interface BaseLocation extends BaseItem {
  checks?: number;
  totalChecks?: number;
}

interface BaseCheck extends BaseItem {
  levelsImportant?: boolean;
}

interface BaseItems {
  locations: { [key: string]: BaseLocation };
  checks: { [key: string]: BaseCheck };
}

export const items: BaseItems = {
  locations: {
    // Worlds
    "other/sora's_heart": { setting: "Sora's Heart" },
    "other/drive_forms": {},
    "worlds/hollow_bastion": {
      data: "demyx",
      secondary: [
        CHEST,
        ...["depths", "mining", "engine", "transport"].map(i => `secondary/cor/${i}`),
        "secondary/sephiroth",
      ],
    },
    "worlds/twilight_town": { data: "axel", secondary: CHEST },

    "ROW END 1": {},

    "worlds/land_of_dragons": { data: "xigbar", secondary: CHEST },
    "worlds/beast's_castle": { data: "xaldin", secondary: CHEST },
    "worlds/olympus_coliseum": {
      data: "zexion",
      secondary: [
        CHEST,
        ...["pain_panic", "cerberus", "titan", "goddess", "paradox"].map(
          c => `secondary/cups/${c}`
        ),
      ],
    },
    "worlds/space_paranoids": { data: "larxene", secondary: CHEST },

    "ROW END 2": {},

    "worlds/halloween_town": { data: "vexen", secondary: CHEST },
    "worlds/port_royal": { data: "luxord", secondary: CHEST },
    "worlds/agrabah": { data: "lexaeus", secondary: CHEST },
    "worlds/pride_lands": { data: "saix", secondary: CHEST },

    "ROW END 3": {},

    "worlds/disney_castle": { data: "marluxia", secondary: [CHEST, "secondary/lingering_will"] },
    "worlds/100_acre_wood": { setting: "100 Acre Wood" },
    "worlds/simulated_twilight_town": { data: "roxas", setting: "Simulated Twilight Town" },
    "worlds/the_world_that_never_was": {
      data: "xemnas",
      secondary: [
        CHEST,
        ...["roxas", "xigbar", "luxord", "saix", "kingdom_hearts"].map(i => `nobody/${i}`),
      ],
    },
  },

  checks: {
    "other/secret_reports": { total: 13, setting: "Secret Ansem Reports" },
    "other/torn_page": { total: 5, cls: "pages", setting: "Torn Pages" },

    "ROW END 1": {},

    // Magic
    "magic/fire": { total: 3, secondary: DONALD, cls: "magic" },
    "magic/blizzard": { total: 3, secondary: DONALD, cls: "magic" },
    "magic/thunder": { total: 3, secondary: DONALD, cls: "magic" },
    "magic/cure": { total: 3, secondary: DONALD, cls: "magic", setting: "Cure" },
    "magic/reflect": { total: 3 },
    "magic/magnet": { total: 3 },

    "ROW END 2": {},

    // Drives
    "drive/valor": {
      total: 7,
      secondary: "secondary/drive/jump",
      secondaryTotal: 3,
      secondaryMax: true,
      cls: "drive",
      levelsImportant: false,
    },
    "drive/wisdom": {
      total: 7,
      secondary: "secondary/drive/quick",
      secondaryTotal: 3,
      secondaryMax: true,
      cls: "drive",
      levelsImportant: false,
    },
    "drive/limit": {
      total: 7,
      secondary: "secondary/drive/dodge",
      secondaryTotal: 3,
      secondaryMax: true,
      cls: "drive",
      levelsImportant: false,
    },
    "drive/master": {
      total: 7,
      secondary: "secondary/drive/aerial",
      secondaryTotal: 3,
      secondaryMax: true,
      cls: "drive",
      levelsImportant: false,
    },
    "drive/final": {
      total: 7,
      secondary: "secondary/drive/glide",
      secondaryTotal: 3,
      secondaryMax: true,
      cls: "drive",
      levelsImportant: false,
      setting: "Final Form",
    },

    "ROW END 3": {},

    // Summons
    "summons/chicken_little": { total: 7, group: "summon" },
    "summons/genie": { total: 7, group: "summon" },
    "summons/stitch": { total: 7, group: "summon" },
    "summons/peter_pan": { total: 7, group: "summon" },

    "ROW END 4": {},

    // Other
    "other/second_chance": { setting: "Second Chance & Once More" },
    "other/once_more": { setting: "Second Chance & Once More" },
    "other/promise_charm": { setting: "Promise Charm" },
    "other/proof_of_nonexistence": { secondary: CROWNS },
    "other/proof_of_connection": { secondary: CROWNS },
    "other/proof_of_tranquility": { secondary: CROWNS },
  },
};

for (const [_, item] of [items.locations, items.checks]
  .map(i => Object.values(i))
  .flat()
  .entries()) {
  item.total = item.total ?? 1;
  item.level = item.level ?? 0;
  item.opaque = Boolean(item.level);
  item.disabled = false;

  item.secondaryLevel = 0;
  item.secondaryTotal = item.secondaryTotal ?? (item.secondary ? 1 : 0);
  item.secondaryMax = item.secondaryMax ?? false;
}

for (const [_, item] of Object.values(items.locations).entries()) {
  item.checks = 0;
  item.totalChecks = -1;
}

for (const [_, item] of Object.values(items.checks).entries()) {
  item.levelsImportant = item.levelsImportant ?? true;
}

export interface Item extends BaseItem {
  total: number;
  level: number;
  opaque: boolean;
  disabled: boolean;

  secondaryLevel: number;
  secondaryTotal: number;
  secondaryMax: boolean;
}

export interface Check extends Item {
  levelsImportant?: boolean;
}

export interface Location extends Item {
  checks: number;
  totalChecks: number;
}

export interface Items {
  locations: { [key: string]: Location };
  checks: { [key: string]: Check };
}

export interface Hint {
  report: string;
  location: string;
  checks: number;
  found: boolean;
  incorrectCounter: number;
}

export type Hints = Array<Hint>;

export interface HintSetting {
  items: string[];
  disable?: boolean;
  check?: boolean;
  value?: number;
  enabled?: boolean;
}

export const state = {
  items: items as Items,
  checks: 0,
  totalChecks: 51,
  currentLocation: "",
  hints: [] as Hints,
  hintsLoaded: false,
  hintSettings: {
    "Promise Charm": { items: ["other/promise_charm"], disable: true, check: true },
    "Second Chance & Once More": {
      items: ["other/second_chance", "other/once_more"],
      check: true,
      value: 2,
    },
    "Torn Pages": { items: ["other/torn_page"], check: true, value: 5 },
    "Secret Ansem Reports": { items: ["other/secret_reports"], check: true, value: 13 },
    Cure: { items: ["magic/cure"], check: true, value: 3 },
    "Final Form": { items: ["drive/final"], check: true },
    "Sora's Heart": { items: ["other/sora's_heart"] },
    "Simulated Twilight Town": { items: ["worlds/simulated_twilight_town"] },
    "100 Acre Wood": { items: ["worlds/100_acre_wood"] },
  } as { [key: string]: HintSetting },
};

for (const key in state.hintSettings) {
  state.hintSettings[key].enabled = true;
  state.hintSettings[key].value = state.hintSettings[key].value ?? 1;
  state.hintSettings[key].check = state.hintSettings[key].check ?? false;
}

export type State = typeof state;

[
  ...[...Array(27).keys()].map(i => `numbers/${i + 1}.png`),
  "numbers/max.png",
  "secondary/page.png",
  ...["jump", "quick", "dodge", "aerial", "glide"].map(g => `secondary/drive/${g}.png`),
  ...["bronze", "silver", "gold"].map(c => `secondary/crowns/${c}.png`),
  ...["pain_panic", "cerberus", "titan", "goddess", "paradox"].map(c => `secondary/cups/${c}.png`),
  ...["roxas", "xigbar", "luxord", "saix", "kingdom_hearts"].map(i => `nobody/${i}.png`),
  ...["depths", "mining", "engine", "transport"].map(i => `secondary/cor/${i}.png`),
  "secondary/lingering_will.png",
  "secondary/sephiroth.png",
  "secondary/triangle.png",
  "secondary/chest.png",
].forEach(src => {
  // Apparently creating an image object like this loads it even if it's not added to the page
  const image = new Image();
  image.src = `img/${src}`;
});