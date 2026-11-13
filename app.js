(() => {
  "use strict";

  // ---------------------------------------------------------------------------
  // Data
  // ---------------------------------------------------------------------------

  const SHARP_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
  const FLAT_NAMES = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];

  const QUALITY_INTERVALS = {
    maj: [0, 4, 7],
    min: [0, 3, 7],
    maj7: [0, 4, 7, 11],
    min7: [0, 3, 7, 10],
    dom7: [0, 4, 7, 10],
    add9: [0, 4, 7, 14],
    sus2: [0, 2, 7],
    sus4: [0, 5, 7],
    "7sus4": [0, 5, 7, 10],
  };

  const QUALITY_LABELS = {
    maj: "",
    min: "m",
    maj7: "maj7",
    min7: "m7",
    dom7: "7",
    add9: "add9",
    sus2: "sus2",
    sus4: "sus4",
    "7sus4": "7sus4",
  };

  const STYLES = [
    {
      id: "morning",
      name: "清晨咖啡",
      mood: "松弛 · 温暖",
      bpm: 92,
      key: 5,
      keyFlat: true,
      mode: "major",
      description: "像窗边第一缕光，落在还没写完的日记上。",
      titles: ["午后三点", "窗边的风", "第一杯", "慢慢醒来", "橘子汽水"],
      hero: ["#f7da98", "#e7a257"],
      heroInk: "#30251a",
      heroBg: "#f1cd8b",
      accent: "#d86a3b",
      swatch: "#e7a23f",
      chordColors: ["#efb65a", "#e58b6c", "#a7c59b", "#d9c37e"],
      brightness: 0.48,
      swing: 0.07,
      space: 0.18,
      sparkle: true,
      texture: null,
      lead: "soft",
      center: 69,
      progressions: [
        [
          { root: 0, q: "maj7" },
          { root: 9, q: "min7" },
          { root: 5, q: "maj7" },
          { root: 7, q: "dom7" },
        ],
        [
          { root: 0, q: "maj7" },
          { root: 5, q: "maj7" },
          { root: 9, q: "min7" },
          { root: 7, q: "dom7" },
        ],
      ],
      drums: {
        kick: "x.....x...x.....",
        snare: "....x.......x...",
        hat: "x.x.x.x.x.x.x.x.",
        shaker: "..x...x...x...x.",
        rim: "...x......x.....",
      },
      chords: { pad: true, stabs: [6, 10] },
      bassPattern: [0, 6, 8, 12],
      sparklePattern: [0, 2, 4, 6, 8, 10, 12, 14],
      melodyRhythms: [
        [0, 4, 6, 8, 11, 14],
        [0, 3, 6, 8, 12, 14],
        [0, 2, 4, 7, 8, 11, 14],
      ],
    },
    {
      id: "rainy",
      name: "雨夜房间",
      mood: "安静 · 微醺",
      bpm: 74,
      key: 2,
      keyFlat: true,
      mode: "minor",
      description: "雨把城市调成静音，只剩杯子和低低的鼓点。",
      titles: ["雨停之前", "第三杯茶", "屋檐下", "晚一点睡", "潮湿的灯"],
      hero: ["#88a5b7", "#4c6678"],
      heroInk: "#f5f0e2",
      heroBg: "#657f90",
      accent: "#f0a47d",
      swatch: "#7895a4",
      chordColors: ["#88a5b5", "#b89aa5", "#7e9889", "#bcc7b2"],
      brightness: 0.32,
      swing: 0.1,
      space: 0.32,
      sparkle: false,
      texture: "vinyl",
      lead: "air",
      center: 67,
      progressions: [
        [
          { root: 0, q: "min7" },
          { root: 8, q: "maj7" },
          { root: 3, q: "maj7" },
          { root: 10, q: "dom7" },
        ],
        [
          { root: 0, q: "min7" },
          { root: 3, q: "maj7" },
          { root: 8, q: "maj7" },
          { root: 10, q: "dom7" },
        ],
      ],
      drums: {
        kick: "x.......x.x.....",
        snare: "....x.......x...",
        hat: "..x...x...x...x.",
        rim: "...x......x.....",
        shaker: ".......x........",
      },
      chords: { pad: true, stabs: [] },
      bassPattern: [0, 8, 12],
      sparklePattern: [0, 4, 8, 12],
      melodyRhythms: [
        [0, 4, 8, 12],
        [0, 3, 7, 10, 14],
        [0, 6, 8, 12, 14],
      ],
    },
    {
      id: "city",
      name: "城市夜风",
      mood: "清醒 · 闪烁",
      bpm: 108,
      key: 9,
      keyFlat: false,
      mode: "minor",
      description: "晚高峰之后，霓虹还亮着，心跳开始接管节拍。",
      titles: ["晚风第七码", "霓虹以下", "凌晨两点", "玻璃倒影", "不睡的人"],
      hero: ["#c7b1e4", "#6e609d"],
      heroInk: "#fbf3e3",
      heroBg: "#9180b8",
      accent: "#e9c05c",
      swatch: "#8e79b9",
      chordColors: ["#b79cd8", "#84b2c7", "#e1b46c", "#d79bb0"],
      brightness: 0.82,
      swing: 0,
      space: 0.15,
      sparkle: true,
      texture: null,
      lead: "saw",
      center: 72,
      progressions: [
        [
          { root: 0, q: "min7" },
          { root: 8, q: "maj7" },
          { root: 3, q: "maj7" },
          { root: 10, q: "dom7" },
        ],
        [
          { root: 0, q: "min7" },
          { root: 5, q: "min7" },
          { root: 8, q: "maj7" },
          { root: 10, q: "dom7" },
        ],
      ],
      drums: {
        kick: "x...x...x...x...",
        clap: "....x.......x...",
        hat: "..x...x...x...x.",
        openhat: "......x.......x.",
      },
      chords: { pad: false, stabs: [0, 3, 6, 10, 12] },
      bassPattern: [0, 2, 4, 6, 8, 10, 12, 14],
      sparklePattern: [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 13, 14],
      melodyRhythms: [
        [0, 2, 4, 6, 8, 10, 12, 14],
        [0, 2, 3, 6, 8, 10, 13, 14],
        [0, 2, 4, 7, 8, 11, 12, 14],
      ],
    },
    {
      id: "sunny",
      name: "晴天散步",
      mood: "轻快 · 明亮",
      bpm: 118,
      key: 7,
      keyFlat: false,
      mode: "major",
      description: "出门走走的天气，鞋底和旋律都轻一点。",
      titles: ["星期天的风", "走到路口", "口袋里的太阳", "九点十分", "草地回声"],
      hero: ["#c4e4d2", "#efc97c"],
      heroInk: "#25382b",
      heroBg: "#d5e2b9",
      accent: "#ef7b51",
      swatch: "#8cb56f",
      chordColors: ["#efc35a", "#9cc8a8", "#8fb9d7", "#f0a078"],
      brightness: 0.7,
      swing: 0.02,
      space: 0.16,
      sparkle: true,
      texture: null,
      lead: "bell",
      center: 71,
      progressions: [
        [
          { root: 0, q: "maj" },
          { root: 7, q: "maj" },
          { root: 4, q: "min7" },
          { root: 5, q: "maj7" },
        ],
        [
          { root: 0, q: "maj" },
          { root: 4, q: "min7" },
          { root: 5, q: "maj7" },
          { root: 7, q: "maj" },
        ],
      ],
      drums: {
        kick: "x.....x...x.....",
        snare: "....x.......x...",
        hat: "x.x.x.x.x.x.x.x.",
        clap: "....x.......x...",
        shaker: "..x...x...x...x.",
      },
      chords: { pad: true, stabs: [2, 6, 10, 14] },
      bassPattern: [0, 4, 7, 10, 12, 14],
      sparklePattern: [0, 2, 4, 6, 8, 10, 12, 14],
      melodyRhythms: [
        [0, 2, 4, 6, 8, 10, 12, 14],
        [0, 3, 4, 7, 8, 11, 14],
        [0, 2, 4, 6, 7, 9, 11, 14],
      ],
    },
  ];

  const STYLES_BY_ID = Object.fromEntries(STYLES.map((style) => [style.id, style]));
  const STORAGE_KEY = "shengya-studio-state-v1";
  const LEGACY_STORAGE_KEY = "sprout-studio-state-v1";
  const TRACK_DEFS = [
    { id: "melody", name: "主旋律", color: "#d9f26b", sub: "LEAD" },
    { id: "chords", name: "和声", color: "#f47a5b", sub: "CHORDS" },
    { id: "bass", name: "贝斯", color: "#9acfe0", sub: "BASS" },
    { id: "drums", name: "鼓点", color: "#e9d4a0", sub: "DRUMS" },
    { id: "sparkle", name: "星光", color: "#f7e2a1", sub: "SPARKLE" },
  ];

  // ---------------------------------------------------------------------------
  // Utilities
  // ---------------------------------------------------------------------------

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const mod = (value, n) => ((value % n) + n) % n;
  const midiToFreq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);
  const barDuration = () => 240 / state.bpm;
  const totalDuration = () => barDuration() * 8;
  const nowIso = () => new Date().toISOString();

  function randomSeed() {
    return (Math.random() * 0xffffffff) >>> 0;
  }

  function randomFactory(seed) {
    let a = seed >>> 0;
    return () => {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pick(rng, arr) {
    return arr[Math.floor(rng() * arr.length) % arr.length];
  }

  function midiToName(midi, useFlats = false) {
    const names = useFlats ? FLAT_NAMES : SHARP_NAMES;
    return `${names[mod(Math.round(midi), 12)]}${Math.floor(Math.round(midi) / 12) - 1}`;
  }

  function noteNameOnly(midi, useFlats = false) {
    return (useFlats ? FLAT_NAMES : SHARP_NAMES)[mod(Math.round(midi), 12)];
  }

  function formatTime(seconds) {
    const safe = Math.max(0, Math.floor(seconds || 0));
    return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
  }

  function setRangeFill(input) {
    const min = Number(input.min || 0);
    const max = Number(input.max || 100);
    const pct = ((Number(input.value) - min) / (max - min)) * 100;
    input.style.setProperty("--fill", `${pct}%`);
  }

  function uid(prefix) {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
  }

  function median(values) {
    if (!values.length) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  // ---------------------------------------------------------------------------
  // Music theory helpers
  // ---------------------------------------------------------------------------

  function currentStyle() {
    return STYLES_BY_ID[state.styleId] || STYLES[0];
  }

  function getProgression(style = currentStyle(), index = state.progressionIndex) {
    if (state.customProgression) return state.customProgression;
    const list = style.progressions;
    return list[mod(index, list.length)];
  }

  function scalePcs(style) {
    const intervals = style.mode === "major" ? [0, 2, 4, 5, 7, 9, 11] : [0, 2, 3, 5, 7, 8, 10];
    return intervals.map((interval) => mod(style.key + interval, 12));
  }

  function scalePitches(style, low = 48, high = 88) {
    const pcs = new Set(scalePcs(style));
    const pitches = [];
    for (let midi = low; midi <= high; midi += 1) {
      if (pcs.has(mod(midi, 12))) pitches.push(midi);
    }
    return pitches;
  }

  function nearestOf(midi, pool) {
    if (!pool.length) return midi;
    return pool.reduce((best, next) => (Math.abs(next - midi) < Math.abs(best - midi) ? next : best), pool[0]);
  }

  function snapToScale(midi, style) {
    const pcs = new Set(scalePcs(style));
    const rounded = Math.round(midi);
    if (pcs.has(mod(rounded, 12))) return rounded;
    for (let distance = 1; distance <= 7; distance += 1) {
      if (pcs.has(mod(rounded - distance, 12))) return rounded - distance;
      if (pcs.has(mod(rounded + distance, 12))) return rounded + distance;
    }
    return rounded;
  }

  function moveInScale(midi, steps, style) {
    const pitches = scalePitches(style, 45, 91);
    let index = 0;
    pitches.forEach((pitch, i) => {
      if (Math.abs(pitch - midi) < Math.abs(pitches[index] - midi)) index = i;
    });
    return pitches[clamp(index + steps, 2, pitches.length - 3)];
  }

  function chordInfo(style, chord) {
    const rootPc = mod(style.key + chord.root, 12);
    const names = style.keyFlat ? FLAT_NAMES : SHARP_NAMES;
    const quality = QUALITY_LABELS[chord.q] ?? chord.q;
    return {
      rootPc,
      root: names[rootPc],
      quality,
      label: `${names[rootPc]}${quality}`,
    };
  }

  function chordMidis(style, chord, octave = 4) {
    const intervals = QUALITY_INTERVALS[chord.q] || QUALITY_INTERVALS.maj;
    const rootMidi = 12 * octave + mod(style.key + chord.root, 12);
    return intervals.map((interval) => rootMidi + interval);
  }

  function chordPitches(style, chord, low = 55, high = 84) {
    const pcs = new Set(chordMidis(style, chord, 4).map((midi) => mod(midi, 12)));
    const pitches = [];
    for (let midi = low; midi <= high; midi += 1) {
      if (pcs.has(mod(midi, 12))) pitches.push(midi);
    }
    return pitches;
  }

  function chordRootNear(style, chord, midi) {
    return nearestOf(midi, chordPitches(style, chord, 48, 84));
  }

  function keyLabel(style) {
    const names = style.keyFlat ? FLAT_NAMES : SHARP_NAMES;
    return `${names[mod(style.key, 12)]} ${style.mode === "major" ? "大调" : "小调"}`;
  }

  // ---------------------------------------------------------------------------
  // Arrangement generation
  // ---------------------------------------------------------------------------

  function generateMelody(style, seed, progression) {
    const rng = randomFactory((seed ^ 0x85ebca6b) >>> 0);
    const notes = [];
    const chordList = progression || getProgression(style, 0);
    let previous = nearestOf(style.center, chordPitches(style, chordList[0], 60, 82));
    let repeated = 0;

    for (let segment = 0; segment < 4; segment += 1) {
      const chord = chordList[segment];
      const firstRhythm = pick(rng, style.melodyRhythms);
      const secondRhythm = pick(rng, style.melodyRhythms);
      const rhythm = [
        ...firstRhythm,
        ...secondRhythm.map((step) => step + 16),
      ].filter((step, index, list) => index === 0 || step > list[index - 1]);

      for (let i = 0; i < rhythm.length; i += 1) {
        const local = rhythm[i];
        const position = segment * 32 + local;
        if (position >= 128) break;

        const strong = local % 4 === 0;
        const motionTable = [-2, -1, -1, 0, 1, 1, 2, 3];
        let candidate = moveInScale(previous, motionTable[Math.floor(rng() * motionTable.length)], style);

        if (strong || i === 0) {
          candidate = nearestOf(candidate, chordPitches(style, chord, 57, 84));
        }

        while (candidate < 60) candidate += 12;
        while (candidate > 82) candidate -= 12;

        if (candidate === previous && rng() < 0.55) {
          candidate = moveInScale(previous, rng() < 0.5 ? -1 : 1, style);
          if (strong) candidate = nearestOf(candidate, chordPitches(style, chord, 57, 84));
          while (candidate < 60) candidate += 12;
          while (candidate > 82) candidate -= 12;
        }

        repeated = candidate === previous ? repeated + 1 : 0;
        if (repeated >= 3) {
          candidate = moveInScale(candidate, rng() < 0.5 ? -2 : 2, style);
          repeated = 0;
        }

        const nextOnset = i + 1 < rhythm.length ? rhythm[i + 1] : 32;
        let duration = nextOnset - local;
        duration = clamp(duration, 2, 8);
        if (duration > 3 && rng() < 0.18) duration -= 1;

        notes.push({
          start: position,
          dur: Math.max(1, duration),
          midi: candidate,
          vel: 0.66 + rng() * 0.18,
        });

        previous = candidate;
      }
    }

    if (notes.length) {
      const last = notes[notes.length - 1];
      last.midi = chordRootNear(style, chordList[3], last.midi);
      while (last.midi > 82) last.midi -= 12;
      while (last.midi < 60) last.midi += 12;
    }

    return notes;
  }

  function generateBass(style, progression) {
    const notes = [];
    for (let bar = 0; bar < 8; bar += 1) {
      const chord = progression[Math.floor(bar / 2)];
      const rootMidi = 36 + mod(style.key + chord.root, 12);
      const pattern = style.bassPattern;

      for (let i = 0; i < pattern.length; i += 1) {
        const local = pattern[i];
        const next = i + 1 < pattern.length ? pattern[i + 1] : 16;
        let midi = rootMidi;
        if (i === pattern.length - 1 && bar % 2 === 1 && style.id !== "rainy") {
          midi += 12;
        }
        notes.push({
          start: bar * 16 + local,
          dur: Math.max(2, next - local - 1),
          midi,
          vel: i === 0 ? 0.86 : 0.68,
        });
      }
    }
    return notes;
  }

  function generateSparkle(style, progression, seed) {
    const rng = randomFactory((seed ^ 0x27d4eb2d) >>> 0);
    const notes = [];
    for (let bar = 0; bar < 8; bar += 1) {
      const chord = progression[Math.floor(bar / 2)];
      const tones = chordMidis(style, chord, 5);
      const pattern = style.sparklePattern;

      for (let i = 0; i < pattern.length; i += 1) {
        const local = pattern[i];
        let midi = tones[(i + (bar % 2)) % tones.length];
        if (rng() < 0.18) midi += 12;
        while (midi > 88) midi -= 12;
        notes.push({
          start: bar * 16 + local,
          dur: 2,
          midi,
          vel: 0.3 + rng() * 0.18,
        });
      }
    }
    return notes;
  }

  function normalizeMelody(notes) {
    if (!Array.isArray(notes)) return [];
    return notes
      .filter((note) => note && Number.isFinite(note.start) && Number.isFinite(note.midi))
      .map((note) => ({
        start: clamp(Math.round(note.start), 0, 127),
        dur: clamp(Math.round(note.dur || 2), 1, 32),
        midi: clamp(Math.round(note.midi), 36, 96),
        vel: clamp(Number(note.vel) || 0.72, 0.1, 1),
      }))
      .sort((a, b) => a.start - b.start);
  }

  function transposeCustomMelody(notes, oldStyle, newStyle) {
    let delta = mod(newStyle.key - oldStyle.key, 12);
    if (delta > 6) delta -= 12;
    return normalizeMelody(notes).map((note) => {
      let midi = note.midi + delta;
      while (midi < 48) midi += 12;
      while (midi > 88) midi -= 12;
      return { ...note, midi: snapToScale(midi, newStyle) };
    });
  }

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  function defaultLayers(style) {
    return {
      melody: true,
      chords: true,
      bass: true,
      drums: true,
      sparkle: Boolean(style.sparkle),
    };
  }

  function defaultLevels() {
    return {
      melody: 1,
      chords: 1,
      bass: 1,
      drums: 1,
      sparkle: 1,
    };
  }

  function createInitialState() {
    const style = STYLES[0];
    return {
      styleId: style.id,
      title: "午后三点",
      bpm: style.bpm,
      seed: 1365872862,
      progressionIndex: 0,
      customMelody: null,
      customBass: null,
      customSparkle: null,
      customProgression: null,
      drumPattern: null,
      layers: defaultLayers(style),
      levels: defaultLevels(),
      solo: null,
      metronome: false,
      volume: 0.8,
      space: style.space,
      fills: true,
      loop: true,
      titleTouched: false,
      parts: { melody: [], bass: [], sparkle: [] },
    };
  }

  function normalizeProgression(progression) {
    if (!Array.isArray(progression) || progression.length !== 4) return null;
    return progression.map((chord) => {
      const root = clamp(Math.round(Number(chord.root) || 0), 0, 11);
      const quality = QUALITY_INTERVALS[chord.q] ? chord.q : "maj";
      return { root, q: quality };
    });
  }

  function normalizeDrumPattern(pattern, fallback) {
    if (!pattern || typeof pattern !== "object") return null;
    const result = {};
    Object.keys(fallback).forEach((key) => {
      const source = String(pattern[key] || fallback[key] || "");
      result[key] = source.padEnd(16, ".").slice(0, 16).replace(/[^xX.]/g, ".");
    });
    return result;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !STYLES_BY_ID[data.styleId]) return null;
      const style = STYLES_BY_ID[data.styleId];
      const merged = {
        ...createInitialState(),
        ...data,
        styleId: style.id,
        bpm: clamp(Number(data.bpm) || style.bpm, 62, 136),
        seed: Number.isFinite(Number(data.seed)) ? Number(data.seed) >>> 0 : randomSeed(),
        progressionIndex: mod(Number(data.progressionIndex) || 0, style.progressions.length),
        layers: { ...defaultLayers(style), ...(data.layers || {}) },
        levels: { ...defaultLevels(), ...(data.levels || {}) },
        volume: clamp(Number(data.volume) || 0.8, 0, 1),
        space: clamp(Number(data.space) || style.space, 0, 0.6),
        customMelody: Array.isArray(data.customMelody) ? normalizeMelody(data.customMelody) : null,
        customBass: Array.isArray(data.customBass) ? normalizeMelody(data.customBass) : null,
        customSparkle: Array.isArray(data.customSparkle) ? normalizeMelody(data.customSparkle) : null,
        customProgression: normalizeProgression(data.customProgression),
        drumPattern: normalizeDrumPattern(data.drumPattern, style.drums),
        solo: typeof data.solo === "string" && TRACK_DEFS.some((track) => track.id === data.solo) ? data.solo : null,
        metronome: Boolean(data.metronome),
        parts: { melody: [], bass: [], sparkle: [] },
      };
      if (!merged.title || typeof merged.title !== "string") merged.title = style.titles[0];
      return merged;
    } catch (error) {
      return null;
    }
  }

  let state = loadState() || createInitialState();

  function rebuildParts() {
    const style = currentStyle();
    const progression = getProgression(style);
    if (state.customMelody) state.customMelody = normalizeMelody(state.customMelody);
    if (state.customBass) state.customBass = normalizeMelody(state.customBass);
    if (state.customSparkle) state.customSparkle = normalizeMelody(state.customSparkle);
    state.parts = {
      melody: state.customMelody
        ? state.customMelody.map((note) => ({ ...note }))
        : generateMelody(style, state.seed, progression),
      bass: state.customBass
        ? state.customBass.map((note) => ({ ...note }))
        : generateBass(style, progression),
      sparkle: state.customSparkle
        ? state.customSparkle.map((note) => ({ ...note }))
        : generateSparkle(style, progression, state.seed),
    };
  }

  function serializeState() {
    return {
      styleId: state.styleId,
      title: state.title,
      bpm: state.bpm,
      seed: state.seed,
      progressionIndex: state.progressionIndex,
      customMelody: state.customMelody,
      customBass: state.customBass,
      customSparkle: state.customSparkle,
      customProgression: state.customProgression,
      drumPattern: state.drumPattern,
      layers: state.layers,
      levels: state.levels,
      solo: state.solo,
      metronome: state.metronome,
      volume: state.volume,
      space: state.space,
      fills: state.fills,
      loop: state.loop,
      titleTouched: state.titleTouched,
    };
  }

  // ---------------------------------------------------------------------------
  // Audio engine
  // ---------------------------------------------------------------------------

  function makeNoiseBuffer(ctx) {
    const length = Math.floor(ctx.sampleRate * 2);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  class AudioEngine {
    constructor(ctx, destination, options = {}) {
      this.ctx = ctx;
      this.trackSources = Boolean(options.track);
      this.sources = new Set();
      this.brightness = 0.5;
      this.noiseBuffer = null;

      this.master = ctx.createGain();
      this.master.gain.value = 0.78;

      this.limiter = null;
      if (options.compressor === false) {
        this.master.connect(destination);
      } else {
        this.limiter = ctx.createDynamicsCompressor();
        this.limiter.threshold.value = -10;
        this.limiter.knee.value = 16;
        this.limiter.ratio.value = 5;
        this.limiter.attack.value = 0.004;
        this.limiter.release.value = 0.24;
        this.master.connect(this.limiter);
        this.limiter.connect(destination);
      }

      this.reverbIn = ctx.createGain();
      this.reverbOut = ctx.createGain();
      this.reverbOut.gain.value = 0.9;
      this.reverbWet = ctx.createGain();
      this.reverbWet.gain.value = 0.18;
      this.reverbEnabled = options.reverb !== false;

      if (this.reverbEnabled) {
        const preDelay = ctx.createDelay(0.2);
        const damp = ctx.createBiquadFilter();
        preDelay.delayTime.value = 0.017;
        damp.type = "lowpass";
        damp.frequency.value = 4600;
        this.reverbIn.connect(preDelay);
        preDelay.connect(damp);

        const taps = [
          [0.029, 0.22, -0.45],
          [0.037, 0.2, 0.4],
          [0.043, 0.17, -0.2],
          [0.053, 0.15, 0.3],
          [0.071, 0.12, 0.55],
          [0.089, 0.1, -0.55],
          [0.113, 0.075, 0.25],
          [0.151, 0.055, -0.3],
          [0.211, 0.04, 0.45],
          [0.277, 0.028, -0.4],
        ];

        taps.forEach(([time, level]) => {
          const delay = ctx.createDelay(0.5);
          const gain = ctx.createGain();
          delay.delayTime.value = time;
          gain.gain.value = level;
          damp.connect(delay);
          delay.connect(gain);
          gain.connect(this.reverbOut);
        });

        this.reverbOut.connect(this.reverbWet);
        this.reverbWet.connect(this.master);
      }

      this.delayIn = null;
      this.delay = null;
      this.delayFeedback = null;
      this.delayFilter = null;
      this.delayWet = null;
      if (options.delay !== false) {
        this.delayIn = ctx.createGain();
        this.delay = ctx.createDelay(1.5);
        this.delay.delayTime.value = 0.36;
        this.delayFeedback = ctx.createGain();
        this.delayFeedback.gain.value = 0.27;
        this.delayFilter = ctx.createBiquadFilter();
        this.delayFilter.type = "lowpass";
        this.delayFilter.frequency.value = 2500;
        this.delayWet = ctx.createGain();
        this.delayWet.gain.value = 0.13;
        this.delayIn.connect(this.delay);
        this.delay.connect(this.delayFilter);
        this.delayFilter.connect(this.delayWet);
        this.delayWet.connect(this.master);
        this.delayFilter.connect(this.delayFeedback);
        this.delayFeedback.connect(this.delay);
      }
    }

    register(source) {
      if (!this.trackSources) return;
      this.sources.add(source);
      source.addEventListener("ended", () => this.sources.delete(source), { once: true });
    }

    setVolume(value) {
      const v = clamp(Number(value) || 0, 0, 1);
      if (this.trackSources) {
        this.master.gain.setTargetAtTime(v * 0.9, this.ctx.currentTime, 0.02);
      } else {
        this.master.gain.value = v * 0.9;
      }
    }

    setSpace(value) {
      const amount = clamp(Number(value) || 0, 0, 0.6);
      if (this.trackSources) {
        this.reverbWet.gain.setTargetAtTime(amount * 0.9, this.ctx.currentTime, 0.03);
      } else {
        this.reverbWet.gain.value = amount * 0.9;
      }
    }

    setTempo(bpm) {
      if (!this.delay) return;
      const dotted = (60 / clamp(Number(bpm) || 92, 40, 200)) * 0.72;
      if (this.trackSources) {
        this.delay.delayTime.setTargetAtTime(dotted, this.ctx.currentTime, 0.04);
      } else {
        this.delay.delayTime.value = dotted;
      }
    }

    setBrightness(value) {
      this.brightness = clamp(Number(value) || 0.5, 0, 1);
    }

    out(node, reverbSend = 0, delaySend = 0) {
      node.connect(this.master);
      if (reverbSend > 0 && this.reverbEnabled) {
        const send = this.ctx.createGain();
        send.gain.value = reverbSend;
        node.connect(send);
        send.connect(this.reverbIn);
      }
      if (delaySend > 0 && this.delayIn) {
        const send = this.ctx.createGain();
        send.gain.value = delaySend;
        node.connect(send);
        send.connect(this.delayIn);
      }
    }

    getNoiseBuffer() {
      if (!this.noiseBuffer) this.noiseBuffer = makeNoiseBuffer(this.ctx);
      return this.noiseBuffer;
    }

    noise(at, duration, loop = false) {
      const source = this.ctx.createBufferSource();
      source.buffer = this.getNoiseBuffer();
      source.loop = loop;
      this.register(source);
      source.start(at);
      if (!loop) source.stop(at + duration + 0.02);
      return source;
    }

    stopAll() {
      for (const source of Array.from(this.sources)) {
        try {
          source.stop();
        } catch (error) {
          // already stopped
        }
      }
      this.sources.clear();
    }

    click(at, accent = false) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = accent ? 1480 : 1120;
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.linearRampToValueAtTime(0.055, at + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.055);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(at);
      osc.stop(at + 0.07);
      this.register(osc);
    }

    kick(at, velocity = 1) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(155, at);
      osc.frequency.exponentialRampToValueAtTime(43, at + 0.13);
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.linearRampToValueAtTime(0.86 * velocity, at + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.34);
      osc.connect(gain);
      this.out(gain, 0.02, 0);
      osc.start(at);
      osc.stop(at + 0.37);
      this.register(osc);

      const clickSource = this.noise(at, 0.03);
      const hp = this.ctx.createBiquadFilter();
      const clickGain = this.ctx.createGain();
      hp.type = "highpass";
      hp.frequency.value = 1800;
      clickGain.gain.setValueAtTime(0.12 * velocity, at);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, at + 0.024);
      clickSource.connect(hp);
      hp.connect(clickGain);
      clickGain.connect(this.master);
    }

    snare(at, velocity = 0.8) {
      const source = this.noise(at, 0.2);
      const bp = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      bp.type = "bandpass";
      bp.frequency.value = 1850;
      bp.Q.value = 0.8;
      gain.gain.setValueAtTime(0.24 * velocity, at);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.18);
      source.connect(bp);
      bp.connect(gain);
      this.out(gain, 0.12, 0);

      const tone = this.ctx.createOscillator();
      const toneGain = this.ctx.createGain();
      tone.type = "triangle";
      tone.frequency.setValueAtTime(190, at);
      tone.frequency.exponentialRampToValueAtTime(130, at + 0.08);
      toneGain.gain.setValueAtTime(0.11 * velocity, at);
      toneGain.gain.exponentialRampToValueAtTime(0.0001, at + 0.1);
      tone.connect(toneGain);
      this.out(toneGain, 0.08, 0);
      tone.start(at);
      tone.stop(at + 0.12);
      this.register(tone);
    }

    hat(at, velocity = 0.55, open = false) {
      const duration = open ? 0.24 : 0.045;
      const source = this.noise(at, duration);
      const hp = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      hp.type = "highpass";
      hp.frequency.value = open ? 7000 : 8200;
      gain.gain.setValueAtTime(0.12 * velocity, at);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
      source.connect(hp);
      hp.connect(gain);
      this.out(gain, 0.04, 0);
    }

    shaker(at, velocity = 0.45) {
      const source = this.noise(at, 0.06);
      const hp = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      hp.type = "highpass";
      hp.frequency.value = 5200;
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.linearRampToValueAtTime(0.05 * velocity, at + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.058);
      source.connect(hp);
      hp.connect(gain);
      this.out(gain, 0.04, 0);
    }

    rim(at, velocity = 0.5) {
      const osc = this.ctx.createOscillator();
      const bp = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 1180;
      bp.type = "bandpass";
      bp.frequency.value = 950;
      bp.Q.value = 2.2;
      gain.gain.setValueAtTime(0.055 * velocity, at);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.032);
      osc.connect(bp);
      bp.connect(gain);
      this.out(gain, 0.03, 0);
      osc.start(at);
      osc.stop(at + 0.05);
      this.register(osc);
    }

    clap(at, velocity = 0.7) {
      for (let i = 0; i < 3; i += 1) {
        const source = this.noise(at + i * 0.012, 0.07);
        const bp = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();
        bp.type = "bandpass";
        bp.frequency.value = 1250;
        bp.Q.value = 0.9;
        gain.gain.setValueAtTime(0.12 * velocity * (1 - i * 0.18), at + i * 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, at + i * 0.012 + 0.065);
        source.connect(bp);
        bp.connect(gain);
        this.out(gain, 0.14, 0);
      }
    }

    tom(at, midi = 48, velocity = 0.55) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(midiToFreq(midi + 12), at);
      osc.frequency.exponentialRampToValueAtTime(midiToFreq(midi), at + 0.16);
      gain.gain.setValueAtTime(0.13 * velocity, at);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.22);
      osc.connect(gain);
      this.out(gain, 0.08, 0);
      osc.start(at);
      osc.stop(at + 0.24);
      this.register(osc);
    }

    drum(type, at, velocity) {
      switch (type) {
        case "kick":
          this.kick(at, velocity);
          break;
        case "snare":
          this.snare(at, velocity);
          break;
        case "hat":
          this.hat(at, velocity);
          break;
        case "openhat":
          this.hat(at, velocity * 0.8, true);
          break;
        case "shaker":
          this.shaker(at, velocity);
          break;
        case "rim":
          this.rim(at, velocity);
          break;
        case "clap":
          this.clap(at, velocity);
          break;
        default:
          break;
      }
    }

    bass(midi, at, duration, velocity = 0.75) {
      const freq = midiToFreq(midi);
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      filter.type = "lowpass";
      filter.Q.value = 0.8;
      filter.frequency.setValueAtTime(720 + this.brightness * 1600, at);
      filter.frequency.exponentialRampToValueAtTime(280, at + Math.min(duration, 0.4));

      const osc = this.ctx.createOscillator();
      const sub = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      const subGain = this.ctx.createGain();
      osc.type = "triangle";
      sub.type = "sine";
      osc.frequency.value = freq;
      sub.frequency.value = freq / 2;
      osc.detune.value = 4;
      sub.detune.value = -4;
      oscGain.gain.value = 0.72;
      subGain.gain.value = 0.46;
      osc.connect(oscGain);
      sub.connect(subGain);
      oscGain.connect(filter);
      subGain.connect(filter);

      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.linearRampToValueAtTime(0.2 * velocity, at + 0.012);
      gain.gain.setValueAtTime(0.17 * velocity, at + Math.max(0.03, duration - 0.12));
      gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
      filter.connect(gain);
      this.out(gain, 0.02, 0);

      osc.start(at);
      sub.start(at);
      osc.stop(at + duration + 0.03);
      sub.stop(at + duration + 0.03);
      this.register(osc);
      this.register(sub);
    }

    pad(midis, at, duration, velocity = 0.7) {
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      filter.type = "lowpass";
      filter.Q.value = 0.55;
      filter.frequency.setValueAtTime(900 + this.brightness * 1500, at);
      filter.frequency.linearRampToValueAtTime(600 + this.brightness * 600, at + duration);

      midis.forEach((midi, index) => {
        const make = (type, detune, level, octave = 0) => {
          const osc = this.ctx.createOscillator();
          const oscGain = this.ctx.createGain();
          osc.type = type;
          osc.frequency.value = midiToFreq(midi + octave);
          osc.detune.value = detune;
          oscGain.gain.value = level;
          osc.connect(oscGain);
          oscGain.connect(filter);
          osc.start(at);
          osc.stop(at + duration + 0.1);
          this.register(osc);
        };
        make("triangle", index % 2 ? 4 : -4, 0.1);
        make("sawtooth", index % 2 ? -7 : 7, 0.035);
      });

      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.linearRampToValueAtTime(velocity * 0.24, at + 0.22);
      gain.gain.setValueAtTime(velocity * 0.22, at + Math.max(0.25, duration - 0.45));
      gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
      filter.connect(gain);
      this.out(gain, 0.3, 0.04);
    }

    stab(midis, at, duration = 0.45, velocity = 0.55) {
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      filter.type = "lowpass";
      filter.Q.value = 0.9;
      filter.frequency.setValueAtTime(1100 + this.brightness * 2600, at);
      filter.frequency.exponentialRampToValueAtTime(650, at + duration);

      midis.forEach((midi, index) => {
        const osc = this.ctx.createOscillator();
        const level = this.ctx.createGain();
        osc.type = index % 2 ? "triangle" : "sawtooth";
        osc.frequency.value = midiToFreq(midi);
        osc.detune.value = index % 2 ? 5 : -5;
        level.gain.value = index % 2 ? 0.08 : 0.055;
        osc.connect(level);
        level.connect(filter);
        osc.start(at);
        osc.stop(at + duration + 0.04);
        this.register(osc);
      });

      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.linearRampToValueAtTime(0.23 * velocity, at + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
      filter.connect(gain);
      this.out(gain, 0.16, 0.12);
    }

    pluck(midi, at, velocity = 0.45, delaySend = 0.18) {
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2600 + this.brightness * 3200, at);
      filter.frequency.exponentialRampToValueAtTime(1100, at + 0.22);

      const a = this.ctx.createOscillator();
      const b = this.ctx.createOscillator();
      const aGain = this.ctx.createGain();
      const bGain = this.ctx.createGain();
      a.type = "triangle";
      b.type = "sine";
      a.frequency.value = midiToFreq(midi);
      b.frequency.value = midiToFreq(midi + 12);
      aGain.gain.value = 0.16;
      bGain.gain.value = 0.035;
      a.connect(aGain);
      b.connect(bGain);
      aGain.connect(filter);
      bGain.connect(filter);

      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.linearRampToValueAtTime(velocity * 0.4, at + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.3);
      filter.connect(gain);
      this.out(gain, 0.2, delaySend);

      a.start(at);
      b.start(at);
      a.stop(at + 0.34);
      b.stop(at + 0.34);
      this.register(a);
      this.register(b);
    }

    lead(midi, at, duration, velocity = 0.7, style) {
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      filter.type = "lowpass";
      filter.Q.value = 0.7;
      filter.frequency.setValueAtTime(1500 + this.brightness * 2400, at);
      filter.frequency.linearRampToValueAtTime(1000 + this.brightness * 800, at + duration);

      const oscA = this.ctx.createOscillator();
      const oscB = this.ctx.createOscillator();
      const aGain = this.ctx.createGain();
      const bGain = this.ctx.createGain();

      if (style.lead === "saw") {
        oscA.type = "sawtooth";
        oscB.type = "square";
        aGain.gain.value = 0.09;
        bGain.gain.value = 0.035;
      } else if (style.lead === "bell") {
        oscA.type = "sine";
        oscB.type = "sine";
        aGain.gain.value = 0.16;
        bGain.gain.value = 0.055;
      } else {
        oscA.type = "sine";
        oscB.type = "triangle";
        aGain.gain.value = 0.16;
        bGain.gain.value = 0.07;
      }

      oscA.frequency.value = midiToFreq(midi);
      oscB.frequency.value = midiToFreq(midi + (style.lead === "bell" ? 12 : 0));
      oscA.detune.value = -3;
      oscB.detune.value = 4;
      oscA.connect(aGain);
      oscB.connect(bGain);
      aGain.connect(filter);
      bGain.connect(filter);

      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.linearRampToValueAtTime(velocity * 0.23, at + 0.025);
      gain.gain.linearRampToValueAtTime(velocity * 0.18, at + Math.max(0.05, Math.min(duration * 0.6, 0.6)));
      gain.gain.setValueAtTime(velocity * 0.16, at + Math.max(0.06, duration - 0.12));
      gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
      filter.connect(gain);
      this.out(gain, 0.22, 0.11);

      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.type = "sine";
      lfo.frequency.value = 5.1;
      lfoGain.gain.value = 5;
      lfo.connect(lfoGain);
      lfoGain.connect(oscA.detune);
      lfoGain.connect(oscB.detune);
      lfo.start(at + 0.08);
      lfo.stop(at + duration + 0.05);
      this.register(lfo);

      oscA.start(at);
      oscB.start(at);
      oscA.stop(at + duration + 0.05);
      oscB.stop(at + duration + 0.05);
      this.register(oscA);
      this.register(oscB);
    }

    texture(at, duration, style) {
      if (style.texture !== "vinyl") return;
      const source = this.ctx.createBufferSource();
      const hp = this.ctx.createBiquadFilter();
      const lp = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      source.buffer = this.getNoiseBuffer();
      source.loop = true;
      hp.type = "highpass";
      hp.frequency.value = 520;
      lp.type = "lowpass";
      lp.frequency.value = 4400;
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.linearRampToValueAtTime(0.022, at + 0.4);
      gain.gain.setValueAtTime(0.018, at + Math.max(0.5, duration - 0.6));
      gain.gain.linearRampToValueAtTime(0.0001, at + duration);
      source.connect(hp);
      hp.connect(lp);
      lp.connect(gain);
      gain.connect(this.master);
      source.start(at);
      source.stop(at + duration + 0.05);
      this.register(source);
    }

    swell(at) {
      const source = this.noise(at, 1.25);
      const band = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      band.type = "bandpass";
      band.Q.value = 0.8;
      band.frequency.setValueAtTime(360, at);
      band.frequency.exponentialRampToValueAtTime(3300, at + 0.85);
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.linearRampToValueAtTime(0.035, at + 0.75);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 1.15);
      source.connect(band);
      band.connect(gain);
      this.out(gain, 0.25, 0);
    }

    scheduleBar(bar, when, liveState) {
      const style = STYLES_BY_ID[liveState.styleId];
      if (!style || !liveState.parts) return;
      this.setBrightness(style.brightness);

      const progression = getProgression(style, liveState.progressionIndex);
      const duration = 240 / liveState.bpm;
      const stepDuration = duration / 16;
      const progressionChord = progression[Math.floor(bar / 2)];
      const atStep = (step) => when + step * stepDuration + (style.swing && step % 2 ? style.swing * stepDuration * 0.3 : 0);
      const layers = liveState.layers;
      const levels = liveState.levels || defaultLevels();
      const isActive = (id) => (liveState.solo ? liveState.solo === id : Boolean(layers[id]));
      const levelOf = (id) => clamp(Number(levels[id]) || 0, 0, 1.5);

      if (liveState.metronome) {
        for (let beat = 0; beat < 4; beat += 1) {
          this.click(when + beat * stepDuration * 4, beat === 0);
        }
      }

      if (isActive("drums")) {
        const drumPattern = liveState.drumPattern || style.drums;
        Object.entries(drumPattern).forEach(([type, pattern]) => {
          for (let step = 0; step < Math.min(16, pattern.length); step += 1) {
            const hit = pattern[step];
            if (hit !== "x" && hit !== "X") continue;
            const humanize = (((bar * 17 + step * 7) % 5) - 2) * 0.0013;
            const velocity = (hit === "X" ? 1 : 0.74) * (type === "hat" ? 0.9 : 1) * levelOf("drums");
            this.drum(type, Math.max(0, atStep(step) + humanize), velocity);
          }
        });

        if (liveState.fills && bar === 7) {
          this.tom(atStep(13), 43, 0.65 * levelOf("drums"));
          this.tom(atStep(14), 40, 0.75 * levelOf("drums"));
          this.snare(atStep(15), 0.9 * levelOf("drums"));
          this.snare(atStep(15.5), 0.6 * levelOf("drums"));
        }
      }

      if (isActive("chords")) {
        if (bar % 2 === 0 && style.chords.pad) {
          this.pad(chordMidis(style, progressionChord, 4), when, duration * 2 * 0.96, 0.76 * levelOf("chords"));
        }
        style.chords.stabs.forEach((step) => {
          const notes = chordMidis(style, progressionChord, 4).map((midi) => midi + 12);
          this.stab(notes, atStep(step), stepDuration * 2.2, 0.5 * levelOf("chords"));
        });
      }

      if (isActive("bass")) {
        liveState.parts.bass.forEach((note) => {
          if (Math.floor(note.start / 16) !== bar) return;
          const local = note.start - bar * 16;
          this.bass(note.midi, atStep(local), Math.max(0.12, note.dur * stepDuration * 0.94), note.vel * levelOf("bass"));
        });
      }

      if (isActive("melody")) {
        liveState.parts.melody.forEach((note) => {
          if (Math.floor(note.start / 16) !== bar) return;
          const local = note.start - bar * 16;
          this.lead(note.midi, atStep(local), Math.max(0.14, note.dur * stepDuration * 0.92), note.vel * levelOf("melody"), style);
        });
      }

      if (isActive("sparkle")) {
        liveState.parts.sparkle.forEach((note) => {
          if (Math.floor(note.start / 16) !== bar) return;
          const local = note.start - bar * 16;
          this.pluck(note.midi, atStep(local), note.vel * levelOf("sparkle"), 0.24);
        });
      }

      if (bar === 0) {
        this.texture(when, duration * 8, style);
        this.swell(when);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Runtime / audio transport
  // ---------------------------------------------------------------------------

  let audioCtx = null;
  let engine = null;
  let audioReady = false;
  let saveTimer = 0;
  let toastTimer = 0;
  let lastRenderedBar = -1;
  let helpPreviousFocus = null;
  let captureMode = false;

  const transport = {
    playing: false,
    pausedBar: 0,
    startBar: 0,
    startCtx: 0,
    nextBar: 0,
    nextTime: 0,
    timer: 0,
    raf: 0,
    token: 0,
  };

  const hum = {
    open: false,
    stage: "ready",
    stream: null,
    source: null,
    analyser: null,
    buffer: null,
    raf: 0,
    recordStart: 0,
    recordDuration: 0,
    beatDuration: 0,
    segments: [],
    current: null,
    pendingMidi: null,
    pendingCount: 0,
    lastDetect: 0,
    pitchHistory: [],
    level: 0,
    silentFrames: 0,
    token: 0,
  };

  const el = {
    app: $("#app"),
    hero: $("#hero"),
    heroTitle: $("#heroTitle"),
    heroDesc: $("#heroDesc"),
    heroPlay: $("#heroPlay"),
    heroPlayText: $("#heroPlayText"),
    moodText: $("#moodText"),
    keyBadge: $("#keyBadge"),
    bpmBadge: $("#bpmBadge"),
    labelTitle: $("#labelTitle"),
    stickerText: $("#stickerText"),
    titleInput: $("#titleInput"),
    saveState: $("#saveState"),
    styleList: $("#styleList"),
    bpmRange: $("#bpmRange"),
    bpmOut: $("#bpmOut"),
    spaceRange: $("#spaceRange"),
    spaceOut: $("#spaceOut"),
    fillsToggle: $("#fillsToggle"),
    volumeRange: $("#volumeRange"),
    ruler: $("#ruler"),
    tracks: $("#tracks"),
    timeline: $("#timeline"),
    playheadLine: $("#playheadLine"),
    chordCards: $("#chordCards"),
    chordShuffleBtn: $("#chordShuffleBtn"),
    playBtn: $("#playBtn"),
    stopBtn: $("#stopBtn"),
    loopBtn: $("#loopBtn"),
    timeNow: $("#timeNow"),
    timeTotal: $("#timeTotal"),
    statusText: $("#statusText"),
    miniWave: $("#miniWave"),
    heroPlayRound: $(".play-cta-round", $("#heroPlay")),
    humBtn: $("#humBtn"),
    humBtn2: $("#humBtn2"),
    diceBtn: $("#diceBtn"),
    listenBtn: $("#listenBtn"),
    shuffleBtn: $("#shuffleBtn"),
    exportBtn: $("#exportBtn"),
    helpBtn: $("#helpBtn"),
    helpModal: $("#helpModal"),
    helpClose: $("#helpClose"),
    helpDone: $("#helpDone"),
    humModal: $("#humModal"),
    humCard: $("#humCard"),
    humClose: $("#humClose"),
    humStart: $("#humStart"),
    humStop: $("#humStop"),
    humRetry: $("#humRetry"),
    humFallback: $("#humFallback"),
    humFallback2: $("#humFallback2"),
    humNote: $("#humNote"),
    humNoteHint: $("#humNoteHint"),
    humStateLabel: $("#humStateLabel"),
    humBarLabel: $("#humBarLabel"),
    humLiveHint: $("#humLiveHint"),
    humProgressBar: $("#humProgressBar"),
    humBars: $("#humBars"),
    humOrbit: $("#humOrbit"),
    humErrorTitle: $("#humErrorTitle"),
    humErrorText: $("#humErrorText"),
    processText: $("#processText"),
    toast: $("#toast"),
    toastText: $("#toastText"),
    exportLayer: $("#exportLayer"),
    exportText: $("#exportText"),
  };

  function ensureAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) throw new Error("这个浏览器不支持 Web Audio。");
      audioCtx = new AudioContextClass();
      engine = new AudioEngine(audioCtx, audioCtx.destination, { track: true });
      engine.setVolume(state.volume);
      engine.setSpace(state.space);
      engine.setTempo(state.bpm);
    }
    if (audioCtx.state === "suspended") {
      return audioCtx.resume().then(() => {
        audioReady = true;
      });
    }
    audioReady = true;
    return Promise.resolve();
  }

  function getRawBar() {
    if (!transport.playing || !audioCtx) return transport.pausedBar;
    const elapsed = (audioCtx.currentTime - transport.startCtx) / barDuration();
    if (elapsed <= 0) return transport.startBar;
    return transport.startBar + elapsed;
  }

  function getPlayhead() {
    if (!transport.playing) return transport.pausedBar;
    return mod(getRawBar(), 8);
  }

  function scheduleAhead() {
    if (!transport.playing || !audioCtx || !engine) return;
    const horizon = audioCtx.currentTime + 0.28;
    let guard = 0;
    while (transport.nextTime < horizon && guard < 18) {
      if (!state.loop && transport.nextBar >= 8) return;
      const bar = mod(transport.nextBar, 8);
      engine.scheduleBar(bar, transport.nextTime, state);
      transport.nextBar += 1;
      transport.nextTime += barDuration();
      guard += 1;
    }
  }

  function stopInternal() {
    transport.token += 1;
    transport.playing = false;
    if (transport.timer) {
      clearInterval(transport.timer);
      transport.timer = 0;
    }
    if (transport.raf) {
      cancelAnimationFrame(transport.raf);
      transport.raf = 0;
    }
    if (engine) engine.stopAll();
  }

  async function startPlayback(fromBar = null) {
    const requested = fromBar === null || fromBar === undefined ? transport.pausedBar : fromBar;
    const bar = mod(Math.floor(Number(requested) || 0), 8);
    stopInternal();
    const token = transport.token;

    try {
      await ensureAudio();
    } catch (error) {
      toast(error.message || "音频启动失败，请刷新页面再试。");
      return;
    }
    if (token !== transport.token) return;

    engine.setVolume(state.volume);
    engine.setSpace(state.space);
    engine.setTempo(state.bpm);

    transport.playing = true;
    transport.startBar = bar;
    transport.startCtx = audioCtx.currentTime + 0.07;
    transport.nextBar = bar;
    transport.nextTime = transport.startCtx;
    transport.pausedBar = bar;
    transport.timer = window.setInterval(scheduleAhead, 50);
    transport.raf = requestAnimationFrame(tick);
    lastRenderedBar = -1;
    scheduleAhead();
    updatePlayhead(bar);
    refreshTransport();
  }

  function pausePlayback() {
    if (!transport.playing) return;
    const position = getPlayhead();
    const bar = Math.min(7, Math.floor(position));
    stopInternal();
    transport.pausedBar = bar;
    updatePlayhead(bar);
    refreshTransport();
  }

  function stopPlayback() {
    stopInternal();
    transport.pausedBar = 0;
    updatePlayhead(0);
    refreshTransport();
  }

  async function togglePlayback() {
    if (transport.playing) {
      pausePlayback();
    } else {
      await startPlayback(transport.pausedBar || 0);
    }
  }

  function seek(bar) {
    const target = clamp(Math.floor(bar), 0, 7);
    if (transport.playing) {
      startPlayback(target);
    } else {
      transport.pausedBar = target;
      updatePlayhead(target);
      refreshTransport();
    }
  }

  function tick() {
    if (!transport.playing) return;
    const raw = getRawBar();
    if (!state.loop && raw >= 7.999) {
      if (captureMode) {
        updatePlayhead(8);
        updateStatus(7);
        transport.raf = requestAnimationFrame(tick);
        return;
      }
      stopPlayback();
      return;
    }
    const position = mod(raw, 8);
    updatePlayhead(position);
    const bar = Math.min(7, Math.floor(position));
    if (bar !== lastRenderedBar) {
      updateRulerCurrent(bar);
      updateStatus(bar);
      lastRenderedBar = bar;
    }
    transport.raf = requestAnimationFrame(tick);
  }

  // ---------------------------------------------------------------------------
  // UI rendering
  // ---------------------------------------------------------------------------

  function setIcon(target, name) {
    const use = target && target.querySelector("use");
    if (use) use.setAttribute("href", `#i-${name}`);
  }

  function renderStyleCards() {
    el.styleList.innerHTML = STYLES.map(
      (style) => `
      <button class="style-card${style.id === state.styleId ? " is-active" : ""}" type="button"
        data-style="${style.id}" role="option" aria-selected="${style.id === state.styleId}">
        <span class="style-art" aria-hidden="true"></span>
        <strong>${style.name}</strong>
        <small>${style.mood}</small>
        <span class="check" aria-hidden="true"><svg class="icon"><use href="#i-check"></use></svg></span>
      </button>`,
    ).join("");
  }

  function updateStyleCards() {
    $$(".style-card", el.styleList).forEach((card) => {
      const active = card.dataset.style === state.styleId;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-selected", String(active));
    });
  }

  function updateHero() {
    const style = currentStyle();
    el.app.dataset.style = style.id;
    el.hero.style.setProperty("--hero-a", style.hero[0]);
    el.hero.style.setProperty("--hero-b", style.hero[1]);
    el.hero.style.setProperty("--hero-ink", style.heroInk);
    el.hero.style.setProperty("--hero-bg", style.heroBg);
    el.hero.style.setProperty("--hero-accent", style.accent);
    el.heroTitle.textContent = state.title;
    el.heroTitle.classList.toggle("is-long", state.title.length > 8);
    el.heroDesc.textContent = style.description;
    el.moodText.textContent = `${state.customMelody ? "你的旋律" : "正在生长"} · ${style.name}`;
    el.keyBadge.textContent = keyLabel(style);
    el.bpmBadge.textContent = `${state.bpm} BPM`;
    el.labelTitle.textContent = state.title;
    el.stickerText.textContent = state.customMelody ? "YOUR HUMMING" : "MADE BY HUMMING";
    document.title = `${state.title} · 生芽`;
    if (document.activeElement !== el.titleInput) el.titleInput.value = state.title;
  }

  function updateControls() {
    el.bpmRange.value = String(state.bpm);
    el.bpmOut.textContent = `${state.bpm} BPM`;
    el.spaceRange.value = String(Math.round(state.space * 100));
    el.spaceOut.textContent = `${Math.round(state.space * 100)}%`;
    el.fillsToggle.checked = Boolean(state.fills);
    el.volumeRange.value = String(Math.round(state.volume * 100));
    setRangeFill(el.bpmRange);
    setRangeFill(el.spaceRange);
    setRangeFill(el.volumeRange);
    el.timeTotal.textContent = formatTime(totalDuration());
  }

  function renderRuler() {
    el.ruler.innerHTML = Array.from({ length: 8 }, (_, index) => (
      `<button class="bar-tick" type="button" data-bar="${index}" aria-label="跳到第 ${index + 1} 小节">${index + 1}</button>`
    )).join("");
  }

  function updateRulerCurrent(bar) {
    $$(".bar-tick", el.ruler).forEach((tickEl, index) => {
      tickEl.classList.toggle("is-current", index === bar && transport.playing);
    });
  }

  function noteBlock(note, style) {
    const left = (note.start / 128) * 100;
    const width = (note.dur / 128) * 100;
    const pitch = clamp((note.midi - 60) / 22, 0, 1);
    const top = 18 + (1 - pitch) * 60;
    const label = `${midiToName(note.midi, style.keyFlat)} · ${note.dur} 格`;
    return `<span class="note-block" style="left:${left}%;width:${Math.max(width * 0.88, 0.55)}%;top:${top}%"
      title="${label}"></span>`;
  }

  function renderTracks() {
    const style = currentStyle();
    const progression = getProgression(style);

    el.tracks.innerHTML = TRACK_DEFS.map((track) => {
      const muted = state.solo ? state.solo !== track.id : !state.layers[track.id];
      let content = "";

      if (track.id === "melody") {
        content = state.parts.melody.map((note) => noteBlock(note, style)).join("");
      } else if (track.id === "chords") {
        content = progression.map((chord, index) => {
          const info = chordInfo(style, chord);
          const color = style.chordColors[index % style.chordColors.length];
          return `<span class="chord-block" style="left:${index * 25}%;width:25%;--chord-color:${color}"
            title="${info.label} · 2 小节">${info.root}${info.quality ? `<small>${info.quality}</small>` : ""}</span>`;
        }).join("");
      } else if (track.id === "bass") {
        content = state.parts.bass.map((note) => {
          const left = (note.start / 128) * 100;
          const width = (note.dur / 128) * 100;
          const top = 24 + (1 - clamp((note.midi - 34) / 16, 0, 1)) * 54;
          return `<span class="bass-block" style="left:${left}%;width:${Math.max(width * 0.9, 0.45)}%;top:${top}%"
            title="${midiToName(note.midi, style.keyFlat)}"></span>`;
        }).join("");
      } else if (track.id === "drums") {
        const hits = [];
        const drumPattern = state.drumPattern || style.drums;
        for (let bar = 0; bar < 8; bar += 1) {
          Object.entries(drumPattern).forEach(([type, pattern]) => {
            pattern.split("").forEach((hit, step) => {
              if (hit !== "x" && hit !== "X") return;
              const left = ((bar * 16 + step) / 128) * 100;
              hits.push(`<span class="drum-hit hit-${type}" style="left:${left}%"></span>`);
            });
          });
        }
        if (state.fills) {
          [13, 14, 15].forEach((step, index) => {
            const left = ((7 * 16 + step) / 128) * 100;
            hits.push(`<span class="drum-hit hit-snare" style="left:${left}%;height:${8 + index * 2}px"></span>`);
          });
        }
        content = hits.join("");
      } else if (track.id === "sparkle") {
        content = state.parts.sparkle.map((note) => {
          const left = (note.start / 128) * 100;
          const top = 18 + (1 - clamp((note.midi - 60) / 30, 0, 1)) * 62;
          return `<span class="spark-block" style="left:${left}%;top:${top}%"
            title="${midiToName(note.midi, style.keyFlat)}"></span>`;
        }).join("");
      }

      return `
        <div class="track${muted ? " is-muted" : ""}" data-layer="${track.id}">
          <div class="track-head">
            <span class="track-dot" style="--track-color:${track.color}"></span>
            <span class="track-name">
              <strong>${track.name}</strong>
              <small>${track.id === "melody" && state.customMelody ? "你的哼唱" : track.sub}</small>
            </span>
            <button class="track-mute" type="button" data-layer="${track.id}"
              aria-label="${muted ? "打开" : "静音"}${track.name}" aria-pressed="${muted}">
              <svg class="icon"><use href="#i-${muted ? "mute" : "volume"}"></use></svg>
            </button>
          </div>
          <div class="track-lane">${content}</div>
        </div>`;
    }).join("");
  }

  function renderChords() {
    const style = currentStyle();
    const progression = getProgression(style);
    el.chordCards.innerHTML = progression.map((chord, index) => {
      const info = chordInfo(style, chord);
      const color = style.chordColors[index % style.chordColors.length];
      return `
        <button class="chord-card" type="button" data-chord="${index}" style="--chord-color:${color}"
          aria-label="试听和弦 ${info.label}">
          <strong>${info.root}${info.quality ? `<span>${info.quality}</span>` : ""}</strong>
          <small>2 小节 · 试听</small>
        </button>`;
    }).join("");
  }

  function updatePlayhead(position) {
    const clamped = clamp(position, 0, 8);
    el.playheadLine.style.left = `${(clamped / 8) * 100}%`;
    const current = (clamped / 8) * totalDuration();
    el.timeNow.textContent = formatTime(current);
  }

  function updateStatus(bar = null) {
    if (transport.playing) {
      const currentBar = bar === null ? clamp(Math.floor(getPlayhead()), 0, 7) : bar;
      el.statusText.textContent = `正在播放 · 第 ${currentBar + 1} 小节`;
      return;
    }
    if (transport.pausedBar > 0) {
      el.statusText.textContent = "已暂停 · 按空格继续";
    } else {
      el.statusText.textContent = "按空格，听听看";
    }
  }

  function refreshTransport() {
    const playing = transport.playing;
    el.app.classList.toggle("is-playing", playing);
    setIcon(el.playBtn, playing ? "pause" : "play");
    setIcon(el.heroPlayRound, playing ? "pause" : "play");
    el.playBtn.setAttribute("aria-label", playing ? "暂停" : "播放");
    el.heroPlayText.textContent = playing ? "暂停播放" : "试听这一版";
    el.loopBtn.classList.toggle("is-on", Boolean(state.loop));
    el.loopBtn.setAttribute("aria-pressed", String(Boolean(state.loop)));
    updateStatus();
    updateRulerCurrent(Math.min(7, Math.floor(getPlayhead())));
  }

  function refreshTimeline() {
    renderTracks();
  }

  function refreshChords() {
    renderChords();
  }

  function refreshAll() {
    updateHero();
    updateControls();
    updateStyleCards();
    refreshTimeline();
    refreshChords();
    refreshTransport();
    updatePlayhead(getPlayhead());
    el.timeTotal.textContent = formatTime(totalDuration());
  }

  function buildMiniWave() {
    const heights = [4, 7, 12, 6, 15, 9, 5, 13, 18, 8, 4, 11, 16, 7, 3, 10, 14, 6, 9, 17, 5, 12, 8, 4, 15, 10, 6, 13, 7, 3, 9, 16, 11, 5, 8, 14, 6, 12, 4, 7];
    el.miniWave.innerHTML = heights.map((height, index) => (
      `<span style="height:${height}px;--d:${index}"></span>`
    )).join("");
  }

  // ---------------------------------------------------------------------------
  // State mutations
  // ---------------------------------------------------------------------------

  function saveSoon() {
    clearTimeout(saveTimer);
    el.saveState.textContent = "正在保存…";
    saveTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeState()));
        el.saveState.textContent = "已保存到本机";
      } catch (error) {
        el.saveState.textContent = "本机存储不可用";
      }
    }, 420);
  }

  function saveNow() {
    clearTimeout(saveTimer);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeState()));
      el.saveState.textContent = "已保存到本机";
    } catch (error) {
      el.saveState.textContent = "本机存储不可用";
    }
  }

  function toast(message) {
    el.toastText.textContent = message;
    el.toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => el.toast.classList.remove("is-visible"), 2600);
  }

  function restartIfPlaying() {
    if (transport.playing) {
      startPlayback(0);
    } else {
      updatePlayhead(transport.pausedBar);
      refreshTransport();
    }
  }

  function setStyle(styleId, options = {}) {
    if (!STYLES_BY_ID[styleId]) return;
    const oldStyle = currentStyle();
    const style = STYLES_BY_ID[styleId];
    if (oldStyle.id === style.id && !options.force) return;

    if (state.customMelody) {
      state.customMelody = transposeCustomMelody(state.customMelody, oldStyle, style);
    }

    state.styleId = style.id;
    state.bpm = style.bpm;
    state.progressionIndex = 0;
    state.space = style.space;
    state.customBass = null;
    state.customSparkle = null;
    state.customProgression = null;
    state.drumPattern = null;
    state.solo = null;
    state.layers = {
      ...state.layers,
      sparkle: Boolean(style.sparkle),
    };
    if (!state.titleTouched) {
      const rng = randomFactory(randomSeed());
      state.title = pick(rng, style.titles);
    }
    rebuildParts();
    refreshAll();
    saveSoon();
    restartIfPlaying();
    if (options.announce !== false) toast(`${style.name} · 换上了`);
  }

  function randomizeAll() {
    const rng = randomFactory(randomSeed());
    let style = pick(rng, STYLES);
    if (style.id === state.styleId && STYLES.length > 1) {
      style = STYLES[(STYLES.indexOf(style) + 1 + Math.floor(rng() * (STYLES.length - 1))) % STYLES.length];
    }
    state.styleId = style.id;
    state.seed = randomSeed();
    state.bpm = style.bpm;
    state.space = style.space;
    state.progressionIndex = Math.floor(rng() * style.progressions.length);
    state.customMelody = null;
    state.customBass = null;
    state.customSparkle = null;
    state.customProgression = null;
    state.drumPattern = null;
    state.solo = null;
    state.levels = defaultLevels();
    state.title = pick(rng, style.titles);
    state.titleTouched = false;
    state.layers = defaultLayers(style);
    rebuildParts();
    refreshAll();
    saveSoon();
    startPlayback(0);
    toast(`摇到了「${style.name}」，听听看`);
  }

  function shuffleMelody() {
    state.seed = randomSeed();
    state.customMelody = null;
    rebuildParts();
    refreshTimeline();
    updateHero();
    saveSoon();
    startPlayback(0);
    toast("换了一段新旋律");
  }

  function shuffleChords() {
    const style = currentStyle();
    state.customProgression = null;
    state.progressionIndex = (state.progressionIndex + 1) % style.progressions.length;
    rebuildParts();
    refreshTimeline();
    refreshChords();
    updateHero();
    saveSoon();
    restartIfPlaying();
    if (transport.playing) {
      startPlayback(0);
    }
    toast("换了一组和弦");
  }

  function toggleLayer(layer) {
    if (!(layer in state.layers)) return;
    state.layers[layer] = !state.layers[layer];
    refreshTimeline();
    saveSoon();
    const name = TRACK_DEFS.find((track) => track.id === layer)?.name || "轨道";
    toast(`${name}${state.layers[layer] ? "已打开" : "已静音"}`);
  }

  function previewChord(index) {
    const style = currentStyle();
    const progression = getProgression(style);
    const chord = progression[index];
    if (!chord) return;
    ensureAudio()
      .then(() => {
        const notes = chordMidis(style, chord, 4).map((midi) => midi + 12);
        engine.stab(notes, audioCtx.currentTime + 0.02, 0.8, 0.45);
        engine.pluck(notes[0], audioCtx.currentTime + 0.02, 0.35, 0.2);
      })
      .catch(() => {});
  }

  function updateTitle(value) {
    const next = String(value || "").trim().slice(0, 18);
    state.title = next || "未命名的小曲";
    state.titleTouched = true;
    el.heroTitle.textContent = state.title;
    el.heroTitle.classList.toggle("is-long", state.title.length > 8);
    el.labelTitle.textContent = state.title;
    document.title = `${state.title} · 生芽`;
    saveSoon();
  }

  // ---------------------------------------------------------------------------
  // Humming / pitch capture
  // ---------------------------------------------------------------------------

  function detectPitch(buffer, sampleRate) {
    const size = buffer.length;
    let rms = 0;
    for (let i = 0; i < size; i += 1) rms += buffer[i] * buffer[i];
    rms = Math.sqrt(rms / size);
    if (rms < 0.009) return { frequency: 0, rms };

    const minLag = Math.max(20, Math.floor(sampleRate / 900));
    const maxLag = Math.min(size - 2, Math.floor(sampleRate / 65));
    const yin = new Float32Array(maxLag + 1);
    let runningSum = 0;

    for (let tau = 1; tau <= maxLag; tau += 1) {
      let delta = 0;
      for (let i = 0; i < size - tau; i += 2) {
        const diff = buffer[i] - buffer[i + tau];
        delta += diff * diff;
      }
      runningSum += delta;
      yin[tau] = (delta * tau) / (runningSum + 1e-9);
    }

    let tau = -1;
    for (let candidate = minLag; candidate <= maxLag; candidate += 1) {
      if (yin[candidate] < 0.2) {
        while (candidate + 1 <= maxLag && yin[candidate + 1] < yin[candidate]) candidate += 1;
        tau = candidate;
        break;
      }
    }

    if (tau < 0) {
      let best = Infinity;
      for (let candidate = minLag; candidate <= maxLag; candidate += 1) {
        if (yin[candidate] < best) {
          best = yin[candidate];
          tau = candidate;
        }
      }
      if (best > 0.52) return { frequency: 0, rms };
    }

    let period = tau;
    if (tau > minLag && tau < maxLag) {
      const s0 = yin[tau - 1];
      const s1 = yin[tau];
      const s2 = yin[tau + 1];
      const denominator = s0 + s2 - 2 * s1;
      if (Math.abs(denominator) > 1e-9) {
        period = tau + (0.5 * (s0 - s2)) / denominator;
      }
    }

    if (period <= 0) return { frequency: 0, rms };
    const frequency = sampleRate / period;
    if (frequency < 65 || frequency > 900) return { frequency: 0, rms };
    return { frequency, rms };
  }

  function setHumStage(stage) {
    hum.stage = stage;
    el.humCard.dataset.stage = stage;
  }

  function resetHumCapture() {
    hum.segments = [];
    hum.current = null;
    hum.pendingMidi = null;
    hum.pendingCount = 0;
    hum.lastDetect = 0;
    hum.pitchHistory = [];
    hum.level = 0;
    hum.silentFrames = 0;
    hum.recordStart = 0;
    hum.recordDuration = 0;
    hum.beatDuration = 0;
    hum.buffer = null;
    el.humNote.textContent = "—";
    el.humNoteHint.textContent = "等待声音";
    el.humProgressBar.style.width = "0%";
    el.humOrbit.style.setProperty("--level", "0");
    $$("span", el.humBars).forEach((bar) => bar.classList.remove("is-on"));
    el.humBarLabel.textContent = "4 小节";
    el.humLiveHint.textContent = "听到「嘀」声后开始哼";
  }

  function openHum() {
    if (hum.open) return;
    hum.open = true;
    hum.token += 1;
    resetHumCapture();
    setHumStage("ready");
    el.humModal.hidden = false;
    window.setTimeout(() => el.humStart.focus(), 50);
  }

  function stopMicrophone() {
    if (hum.stream) {
      hum.stream.getTracks().forEach((track) => track.stop());
      hum.stream = null;
    }
    if (hum.source) {
      try {
        hum.source.disconnect();
      } catch (error) {
        // already disconnected
      }
      hum.source = null;
    }
    hum.analyser = null;
  }

  function closeHum() {
    hum.open = false;
    hum.token += 1;
    if (hum.raf) {
      cancelAnimationFrame(hum.raf);
      hum.raf = 0;
    }
    stopMicrophone();
    el.humModal.hidden = true;
    el.humCard.dataset.stage = "ready";
    hum.stage = "ready";
  }

  function showHumError(title, message) {
    stopMicrophone();
    if (hum.raf) {
      cancelAnimationFrame(hum.raf);
      hum.raf = 0;
    }
    el.humErrorTitle.textContent = title;
    el.humErrorText.textContent = message;
    setHumStage("error");
  }

  function micErrorMessage(error) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (location.protocol === "file:") {
        return "直接双击打开网页时，浏览器会关闭麦克风。请运行 start.ps1 启动本地预览，再从网页里试。";
      }
      return "这个浏览器没有开放麦克风接口。换用 Chrome 或 Edge 试试。";
    }
    if (error && error.name === "NotAllowedError") {
      return "麦克风权限被拒绝了。点地址栏左侧的麦克风图标允许访问，然后再试一次。";
    }
    if (error && error.name === "NotFoundError") {
      return "没有找到麦克风。插上耳机麦克风，或者用下面的灵感骰子。";
    }
    if (error && error.name === "NotReadableError") {
      return "麦克风被另一个程序占用了。关掉会议或录音软件后再试。";
    }
    return "没能打开麦克风。检查系统权限后再试，或者让灵感骰子先帮你起个头。";
  }

  async function beginHum() {
    const token = ++hum.token;
    resetHumCapture();
    setHumStage("countdown");
    el.humStateLabel.textContent = "连接麦克风";
    el.humLiveHint.textContent = "正在打开麦克风…";
    el.humNote.textContent = "…";
    el.humStop.textContent = "取消";

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const unavailable = new Error(micErrorMessage());
        unavailable.humMessage = unavailable.message;
        throw unavailable;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        },
      });
      if (token !== hum.token || !hum.open) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      await ensureAudio();
      if (token !== hum.token || !hum.open) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      hum.stream = stream;
      hum.source = audioCtx.createMediaStreamSource(stream);
      hum.analyser = audioCtx.createAnalyser();
      hum.analyser.fftSize = 2048;
      hum.analyser.smoothingTimeConstant = 0.12;
      hum.buffer = new Float32Array(hum.analyser.fftSize);
      hum.source.connect(hum.analyser);

      const beat = 60 / state.bpm;
      const start = audioCtx.currentTime + 0.18;
      hum.beatDuration = beat;
      hum.recordStart = start + beat * 4;
      hum.recordDuration = barDuration() * 4;
      hum.stage = "countdown";
      el.humNote.textContent = "4";
      el.humNoteHint.textContent = "跟着节拍";
      el.humLiveHint.textContent = "听到「嘀」声后开始哼";
      el.humStop.textContent = "取消";
      el.humStateLabel.textContent = "准备";

      for (let i = 0; i < 4; i += 1) {
        engine.click(start + i * beat, i === 0);
      }
      engine.click(hum.recordStart, true);
      el.humModal.hidden = false;
      requestAnimationFrame(humTick);
    } catch (error) {
      if (token === hum.token) {
        const message = (error && error.humMessage)
          || (error && error.name && error.name !== "Error" ? micErrorMessage(error) : "")
          || (error && error.message)
          || micErrorMessage(error);
        showHumError("麦克风没有打开", message);
      }
    }
  }

  function closeCurrentHumNote(endTime) {
    if (!hum.current) return;
    const duration = endTime - hum.current.start;
    if (duration >= 0.075) {
      hum.segments.push({
        midi: hum.current.midi,
        start: hum.current.start,
        end: endTime,
      });
    }
    hum.current = null;
  }

  function humTick() {
    if (!hum.open || hum.stage === "processing" || hum.stage === "error") return;
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    if (hum.stage === "countdown") {
      const remaining = hum.recordStart - now;
      const count = Math.max(1, Math.ceil(remaining / hum.beatDuration));
      el.humNote.textContent = String(count);
      el.humNoteHint.textContent = "准备好";
      if (remaining <= 0) {
        hum.stage = "recording";
        el.humStateLabel.textContent = "正在听";
        el.humNote.textContent = "—";
        el.humNoteHint.textContent = "开始哼吧";
        el.humLiveHint.textContent = "用「哒」或「嗯」随意哼，像说话一样";
        el.humStop.textContent = "就哼到这里";
        el.humBarLabel.textContent = "第 1 / 4 小节";
      }
    }

    if (hum.stage === "recording") {
      const elapsed = Math.max(0, now - hum.recordStart);
      const progress = clamp(elapsed / hum.recordDuration, 0, 1);
      el.humProgressBar.style.width = `${progress * 100}%`;
      const barIndex = Math.min(3, Math.floor(elapsed / barDuration()));
      el.humBarLabel.textContent = `第 ${barIndex + 1} / 4 小节`;
      $$("span", el.humBars).forEach((bar, index) => bar.classList.toggle("is-on", index <= barIndex));

      if (now - hum.lastDetect >= 0.045 && hum.analyser && hum.buffer) {
        hum.lastDetect = now;
        hum.analyser.getFloatTimeDomainData(hum.buffer);
        const result = detectPitch(hum.buffer, audioCtx.sampleRate);
        const level = clamp((result.rms - 0.006) * 11, 0, 1);
        hum.level = hum.level * 0.55 + level * 0.45;
        el.humOrbit.style.setProperty("--level", hum.level.toFixed(3));

        if (!result.frequency || result.rms < 0.01) {
          hum.silentFrames += 1;
          if (hum.silentFrames > 2) {
            closeCurrentHumNote(now - 0.04);
            hum.pendingMidi = null;
            hum.pendingCount = 0;
          }
          el.humNote.textContent = "—";
          el.humNoteHint.textContent = "再靠近一点";
          hum.pitchHistory = [];
        } else {
          hum.silentFrames = 0;
          const midiFloat = 69 + 12 * Math.log2(result.frequency / 440);
          hum.pitchHistory.push(midiFloat);
          if (hum.pitchHistory.length > 5) hum.pitchHistory.shift();
          const rounded = Math.round(median(hum.pitchHistory));
          const display = clamp(rounded, 36, 96);

          if (!hum.current) {
            hum.current = { midi: display, start: now };
            hum.pendingMidi = null;
            hum.pendingCount = 0;
          } else if (display !== hum.current.midi) {
            if (hum.pendingMidi === display) {
              hum.pendingCount += 1;
            } else {
              hum.pendingMidi = display;
              hum.pendingCount = 1;
            }
            if (hum.pendingCount >= 2) {
              closeCurrentHumNote(now - 0.015);
              hum.current = { midi: display, start: now - 0.015 };
              hum.pendingMidi = null;
              hum.pendingCount = 0;
            }
          } else {
            hum.pendingMidi = null;
            hum.pendingCount = 0;
          }

          const shown = hum.current ? hum.current.midi : display;
          el.humNote.textContent = noteNameOnly(shown, currentStyle().keyFlat);
          el.humNoteHint.textContent = `${midiToName(shown, currentStyle().keyFlat)} · 听起来不错`;
        }
      }

      if (progress >= 1) {
        finishHum(false);
        return;
      }
    }

    hum.raf = requestAnimationFrame(humTick);
  }

  function stopHumEarly() {
    if (hum.stage === "countdown") {
      closeHum();
      return;
    }
    if (hum.stage === "recording") {
      finishHum(true);
    }
  }

  function buildHummedMelody() {
    if (!hum.segments.length) {
      return { error: "我好像没有听到旋律。对着麦克风再哼一次，稍微大声一点。" };
    }

    const style = currentStyle();
    const progression = getProgression(style);
    const stepDuration = barDuration() / 16;
    const notes = [];

    hum.segments.forEach((segment) => {
      const relativeStart = Math.max(0, segment.start - hum.recordStart);
      const relativeEnd = Math.max(0, segment.end - hum.recordStart);
      let start = Math.round(relativeStart / stepDuration / 2) * 2;
      let end = Math.round(relativeEnd / stepDuration / 2) * 2;
      if (end <= start) end = start + 2;
      if (start >= 64) return;
      start = clamp(start, 0, 62);
      end = clamp(end, start + 2, 64);
      notes.push({
        start,
        dur: Math.max(2, end - start),
        midi: Math.round(segment.midi),
        vel: 0.78,
      });
    });

    if (notes.length < 2) {
      return { error: "这次只抓到一个音。试着连续哼一小句，不用好听，只要连着就行。" };
    }

    notes.sort((a, b) => a.start - b.start);

    let totalWeight = 0;
    let weightedMidi = 0;
    notes.forEach((note) => {
      totalWeight += note.dur;
      weightedMidi += note.midi * note.dur;
    });
    const average = weightedMidi / totalWeight;

    let octaveShift = 0;
    while (average + octaveShift < 60) octaveShift += 12;
    while (average + octaveShift > 80) octaveShift -= 12;

    notes.forEach((note) => {
      let midi = note.midi + octaveShift;
      while (midi < 48) midi += 12;
      while (midi > 84) midi -= 12;
      note.midi = snapToScale(midi, style);
    });

    const merged = [];
    notes.forEach((note) => {
      const previous = merged[merged.length - 1];
      if (previous && note.start <= previous.start + previous.dur + 2 && note.midi === previous.midi) {
        previous.dur = Math.max(previous.dur, note.start + note.dur - previous.start);
      } else {
        merged.push(note);
      }
    });

    if (merged.length < 2) {
      return { error: "旋律有点太短了。再多哼两个音，就能长成一首歌。" };
    }

    const span = Math.max(...merged.map((note) => note.start + note.dur));
    const phraseLength = clamp(Math.ceil(span / 8) * 8, 8, 64);
    const phrase = [];

    for (let offset = 0; offset < 64; offset += phraseLength) {
      merged.forEach((note) => {
        const start = note.start + offset;
        if (start >= 64) return;
        phrase.push({
          ...note,
          start,
          dur: Math.min(note.dur, 64 - start),
        });
      });
    }

    const firstHalf = phrase
      .filter((note) => note.start < 64 && note.dur > 0)
      .sort((a, b) => a.start - b.start);
    const secondHalf = firstHalf.map((note) => ({
      ...note,
      start: note.start + 64,
      dur: Math.min(note.dur, 64 - note.start),
      vel: note.vel * 0.97,
    }));
    const last = secondHalf[secondHalf.length - 1];
    if (last) {
      last.midi = chordRootNear(style, progression[3], last.midi);
    }

    return {
      notes: [...firstHalf, ...secondHalf].filter((note) => note.start < 128),
      count: firstHalf.length,
    };
  }

  function finishHum(early) {
    if (hum.stage !== "recording" && hum.stage !== "countdown") return;
    if (hum.raf) {
      cancelAnimationFrame(hum.raf);
      hum.raf = 0;
    }
    const end = audioCtx ? audioCtx.currentTime : hum.recordStart;
    closeCurrentHumNote(Math.min(end, hum.recordStart + hum.recordDuration));
    stopMicrophone();
    setHumStage("processing");
    el.processText.textContent = "正在听清每一个音，校准节拍和音高。";
    el.humProgressBar.style.width = "100%";
    const session = hum.token;

    window.setTimeout(() => {
      if (!hum.open || session !== hum.token) return;
      const result = buildHummedMelody();
      if (result.error) {
        showHumError(early ? "再哼长一点" : "没有听清旋律", result.error);
        return;
      }
      el.processText.textContent = "正在配上和弦、贝斯和鼓点…";
      state.customMelody = normalizeMelody(result.notes);
      rebuildParts();
      refreshTimeline();
      updateHero();
      saveSoon();
      window.setTimeout(() => {
        if (!hum.open || session !== hum.token) return;
        closeHum();
        toast(`抓到 ${result.count} 个音，已经种进歌里了`);
        startPlayback(0);
      }, 720);
    }, 620);
  }

  function fallbackFromHum() {
    closeHum();
    randomizeAll();
  }

  // ---------------------------------------------------------------------------
  // WAV export
  // ---------------------------------------------------------------------------

  function encodeChannelsToWav(channels, sampleRate, ceiling = 0.95) {
    const numberOfChannels = Math.min(2, channels.length);
    const frames = channels[0].length;
    let peak = 0;

    for (let channel = 0; channel < numberOfChannels; channel += 1) {
      const data = channels[channel];
      for (let i = 0; i < frames; i += 1) {
        const value = Math.abs(data[i]);
        if (value > peak) peak = value;
      }
    }

    const gain = peak > ceiling ? ceiling / peak : 1;
    const bytesPerSample = 2;
    const blockAlign = numberOfChannels * bytesPerSample;
    const dataSize = frames * blockAlign;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i += 1) view.setUint8(offset + i, string.charCodeAt(i));
    };

    writeString(0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, dataSize, true);

    let offset = 44;
    for (let frame = 0; frame < frames; frame += 1) {
      for (let channel = 0; channel < numberOfChannels; channel += 1) {
        const sample = Math.max(-1, Math.min(1, (channels[channel][frame] || 0) * gain));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
        offset += 2;
      }
    }
    return buffer;
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  function mergeCaptureChunks(chunks, sampleRate, totalSeconds) {
    const available = chunks.reduce((sum, chunk) => sum + chunk[0].length, 0);
    const limit = Math.min(available, Math.floor((totalSeconds + 2.2) * sampleRate));
    if (!limit) throw new Error("没有录到声音");

    const allLeft = new Float32Array(limit);
    const allRight = new Float32Array(limit);
    let written = 0;
    for (const chunk of chunks) {
      for (let i = 0; i < chunk[0].length && written < limit; i += 1) {
        allLeft[written] = chunk[0][i];
        allRight[written] = chunk[1][i];
        written += 1;
      }
      if (written >= limit) break;
    }

    const scanLimit = Math.min(limit, Math.floor(sampleRate * 0.6));
    let firstAudible = 0;
    while (
      firstAudible < scanLimit
      && Math.abs(allLeft[firstAudible]) < 0.0005
      && Math.abs(allRight[firstAudible]) < 0.0005
    ) {
      firstAudible += 1;
    }

    const start = Math.max(0, firstAudible - Math.floor(sampleRate * 0.01));
    const frames = Math.min(
      Math.floor((totalSeconds + 1.8) * sampleRate),
      Math.max(0, limit - start),
    );
    if (!frames) throw new Error("没有录到声音");

    const left = allLeft.subarray(start, start + frames);
    const right = allRight.subarray(start, start + frames);
    const fadeFrames = Math.min(frames, Math.floor(sampleRate * 1.15));
    for (let i = 0; i < fadeFrames; i += 1) {
      const gain = i / fadeFrames;
      const index = frames - 1 - i;
      left[index] *= gain;
      right[index] *= gain;
    }

    return [left, right];
  }

  async function exportWav() {
    if (el.exportBtn.disabled) return;

    const originalLabel = el.exportBtn.innerHTML;
    el.exportBtn.disabled = true;
    el.exportBtn.textContent = "正在录制…";
    el.exportText.textContent = "正在打开输出通道…";
    el.exportLayer.hidden = false;

    let processor = null;
    let sink = null;
    let sourceNode = null;
    let capturing = false;
    const previousLoop = state.loop;
    const previousMetronome = state.metronome;
    const previousPlayhead = transport.pausedBar;

    try {
      await ensureAudio();
      if (transport.playing) pausePlayback();
      await audioCtx.resume();

      if (typeof audioCtx.createScriptProcessor !== "function") {
        throw new Error("这个浏览器不支持实时导出");
      }

      const sampleRate = audioCtx.sampleRate;
      const chunks = [];
      processor = audioCtx.createScriptProcessor(4096, 2, 2);
      sink = audioCtx.createGain();
      sink.gain.value = 0;
      capturing = true;

      processor.onaudioprocess = (event) => {
        if (!capturing) return;
        const input = event.inputBuffer;
        const left = new Float32Array(input.getChannelData(0));
        const right = input.numberOfChannels > 1
          ? new Float32Array(input.getChannelData(1))
          : new Float32Array(left);
        chunks.push([left, right]);
      };

      sourceNode = engine.limiter || engine.master;
      sourceNode.connect(processor);
      processor.connect(sink);
      sink.connect(audioCtx.destination);

      state.loop = false;
      state.metronome = false;
      captureMode = true;
      await startPlayback(0);

      const startAt = transport.startCtx;
      const total = totalDuration();
      const tail = 1.6;
      let lastShown = -1;

      await new Promise((resolve) => {
        const watch = () => {
          const elapsed = Math.max(0, audioCtx.currentTime - startAt);
          const shown = Math.min(total, elapsed);
          if (Math.floor(shown * 2) !== lastShown) {
            lastShown = Math.floor(shown * 2);
            el.exportText.textContent = `正在实时录制 WAV · ${formatTime(shown)} / ${formatTime(total)}`;
          }
          if (elapsed >= total + tail) {
            resolve();
          } else {
            requestAnimationFrame(watch);
          }
        };
        watch();
      });

      capturing = false;
      await new Promise((resolve) => window.setTimeout(resolve, 160));
      processor.onaudioprocess = null;
      try {
        sourceNode.disconnect(processor);
      } catch (error) {
        // already disconnected
      }
      try {
        processor.disconnect();
        sink.disconnect();
      } catch (error) {
        // already disconnected
      }
      processor = null;
      sink = null;
      sourceNode = null;

      stopPlayback();
      state.loop = previousLoop;
      state.metronome = previousMetronome;
      captureMode = false;

      el.exportText.textContent = "正在写入 WAV…";
      const channels = mergeCaptureChunks(chunks, sampleRate, total);
      const wav = encodeChannelsToWav(channels, sampleRate);
      const safeTitle = state.title.replace(/[\\/:*?"<>|]/g, "-").trim() || "生芽";
      downloadBlob(new Blob([wav], { type: "audio/wav" }), `${safeTitle}-生芽.wav`);
      el.exportLayer.hidden = true;
      toast("WAV 已导出，去听听吧");
    } catch (error) {
      console.error(error);
      el.exportLayer.hidden = true;
      toast("导出失败了，再试一次？");
    } finally {
      capturing = false;
      captureMode = false;
      state.loop = previousLoop;
      state.metronome = previousMetronome;
      if (processor) {
        processor.onaudioprocess = null;
        try {
          sourceNode?.disconnect(processor);
          processor.disconnect();
          sink?.disconnect();
        } catch (error) {
          // already disconnected
        }
      }
      if (transport.playing) stopPlayback();
      else {
        transport.pausedBar = previousPlayhead;
        updatePlayhead(previousPlayhead);
        refreshTransport();
      }
      el.exportBtn.disabled = false;
      el.exportBtn.innerHTML = originalLabel;
    }
  }

  // ---------------------------------------------------------------------------
  // Modal + events
  // ---------------------------------------------------------------------------

  function openHelp() {
    helpPreviousFocus = document.activeElement;
    el.helpModal.hidden = false;
    window.setTimeout(() => el.helpClose.focus(), 40);
  }

  function closeHelp() {
    el.helpModal.hidden = true;
    if (helpPreviousFocus && helpPreviousFocus.focus) helpPreviousFocus.focus();
  }

  function bindEvents() {
    el.heroPlay.addEventListener("click", togglePlayback);
    el.playBtn.addEventListener("click", togglePlayback);
    el.listenBtn.addEventListener("click", () => startPlayback(0));
    el.stopBtn.addEventListener("click", stopPlayback);

    el.loopBtn.addEventListener("click", () => {
      state.loop = !state.loop;
      saveSoon();
      refreshTransport();
      toast(state.loop ? "循环播放已打开" : "循环播放已关闭");
    });

    el.ruler.addEventListener("click", (event) => {
      const tick = event.target.closest(".bar-tick");
      if (!tick) return;
      seek(Number(tick.dataset.bar));
    });

    el.tracks.addEventListener("click", (event) => {
      const button = event.target.closest(".track-mute");
      if (!button) return;
      toggleLayer(button.dataset.layer);
    });

    el.chordCards.addEventListener("click", (event) => {
      const card = event.target.closest(".chord-card");
      if (!card) return;
      card.classList.remove("is-hit");
      void card.offsetWidth;
      card.classList.add("is-hit");
      window.setTimeout(() => card.classList.remove("is-hit"), 320);
      previewChord(Number(card.dataset.chord));
    });

    el.styleList.addEventListener("click", (event) => {
      const card = event.target.closest(".style-card");
      if (!card) return;
      setStyle(card.dataset.style);
    });

    el.bpmRange.addEventListener("input", () => {
      state.bpm = clamp(Number(el.bpmRange.value), 62, 136);
      el.bpmOut.textContent = `${state.bpm} BPM`;
      el.bpmBadge.textContent = `${state.bpm} BPM`;
      el.timeTotal.textContent = formatTime(totalDuration());
      setRangeFill(el.bpmRange);
      if (engine) engine.setTempo(state.bpm);
      saveSoon();
    });

    el.bpmRange.addEventListener("change", () => {
      if (transport.playing) startPlayback(0);
      else updatePlayhead(transport.pausedBar);
    });

    el.spaceRange.addEventListener("input", () => {
      state.space = clamp(Number(el.spaceRange.value) / 100, 0, 0.6);
      el.spaceOut.textContent = `${Math.round(state.space * 100)}%`;
      setRangeFill(el.spaceRange);
      if (engine) engine.setSpace(state.space);
      saveSoon();
    });

    el.volumeRange.addEventListener("input", () => {
      state.volume = clamp(Number(el.volumeRange.value) / 100, 0, 1);
      setRangeFill(el.volumeRange);
      if (engine) engine.setVolume(state.volume);
      saveSoon();
    });

    el.fillsToggle.addEventListener("change", () => {
      state.fills = el.fillsToggle.checked;
      saveSoon();
      refreshTimeline();
      toast(state.fills ? "自动加花已打开" : "自动加花已关闭");
    });

    el.titleInput.addEventListener("input", () => updateTitle(el.titleInput.value));
    el.titleInput.addEventListener("blur", () => {
      if (!el.titleInput.value.trim()) {
        el.titleInput.value = state.title;
      }
    });
    el.titleInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") el.titleInput.blur();
    });

    el.diceBtn.addEventListener("click", randomizeAll);
    el.shuffleBtn.addEventListener("click", shuffleMelody);
    el.chordShuffleBtn.addEventListener("click", shuffleChords);
    el.humBtn.addEventListener("click", openHum);
    el.humBtn2.addEventListener("click", openHum);

    el.helpBtn.addEventListener("click", openHelp);
    el.helpClose.addEventListener("click", closeHelp);
    el.helpDone.addEventListener("click", closeHelp);
    el.helpModal.addEventListener("click", (event) => {
      if (event.target.matches("[data-close-help]")) closeHelp();
    });

    el.humClose.addEventListener("click", closeHum);
    el.humModal.addEventListener("click", (event) => {
      if (event.target.matches("[data-close-hum]")) closeHum();
    });
    el.humStart.addEventListener("click", beginHum);
    el.humRetry.addEventListener("click", beginHum);
    el.humStop.addEventListener("click", stopHumEarly);
    el.humFallback.addEventListener("click", fallbackFromHum);
    el.humFallback2.addEventListener("click", fallbackFromHum);
    el.exportBtn.addEventListener("click", exportWav);

    document.addEventListener("keydown", (event) => {
      if (document.body.classList.contains("expert-open")) return;
      const target = event.target;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (event.key === "Escape") {
        if (!el.humModal.hidden) {
          closeHum();
          return;
        }
        if (!el.helpModal.hidden) {
          closeHelp();
          return;
        }
      }
      if (typing) return;
      if (event.code === "Space" && !target.closest("button")) {
        event.preventDefault();
        togglePlayback();
      } else if (event.key === "r" || event.key === "R") {
        if (el.humModal.hidden) openHum();
      }
    });

    window.addEventListener("beforeunload", saveNow);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && transport.playing) {
        pausePlayback();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // Self test (only with ?selftest=1)
  // ---------------------------------------------------------------------------

  async function runSelfTest() {
    const results = [];
    const fail = [];
    const pre = document.createElement("pre");
    pre.id = "selftest-output";
    pre.textContent = "SELFTEST RUNNING";
    pre.style.cssText = "position:fixed;left:8px;bottom:8px;z-index:999;max-width:560px;padding:10px;background:#111;color:#df7;font:11px/1.5 monospace;border-radius:8px;white-space:pre-wrap;";
    document.body.appendChild(pre);

    const paint = () => {
      pre.textContent = `${fail.length ? "SELFTEST FAIL" : "SELFTEST PASS"}\n${results.join("\n")}`;
      document.title = fail.length ? "SELFTEST FAIL" : "SELFTEST PASS";
    };

    const check = (name, fn) => {
      try {
        const value = fn();
        results.push(`ok   ${name}${value === undefined ? "" : ` :: ${value}`}`);
      } catch (error) {
        fail.push(name);
        results.push(`FAIL ${name} :: ${error.message}`);
      }
    };

    check("styles", () => {
      if (STYLES.length !== 4) throw new Error("expected 4 styles");
      return STYLES.map((style) => style.name).join(", ");
    });

    check("chord names", () => {
      const style = STYLES[0];
      const names = style.progressions[0].map((chord) => chordInfo(style, chord).label);
      if (names[0] !== "Fmaj7") throw new Error(`unexpected chord ${names[0]}`);
      return names.join(" → ");
    });

    check("melody generation", () => {
      const style = STYLES[2];
      const melody = generateMelody(style, 123456, style.progressions[0]);
      if (melody.length < 8) throw new Error("melody too short");
      if (melody.some((note) => note.midi < 48 || note.midi > 90)) throw new Error("melody out of range");
      return `${melody.length} notes`;
    });

    check("bass generation", () => {
      const style = STYLES[3];
      const bass = generateBass(style, style.progressions[0]);
      if (bass.length < 16) throw new Error("bass too short");
      return `${bass.length} notes`;
    });

    check("parts cached", () => {
      if (!state.parts.melody.length) throw new Error("no melody parts");
      if (!state.parts.bass.length) throw new Error("no bass parts");
      return `${state.parts.melody.length} melody / ${state.parts.bass.length} bass`;
    });

    check("wav encoder", () => {
      const frames = 4410;
      const left = new Float32Array(frames);
      const right = new Float32Array(frames);
      for (let i = 0; i < frames; i += 1) {
        left[i] = Math.sin((i / 44100) * Math.PI * 2 * 440) * 0.2;
        right[i] = left[i] * 0.9;
      }
      const wav = encodeChannelsToWav([left, right], 44100);
      if (new DataView(wav).getUint32(0, false) !== 0x52494646) throw new Error("not a RIFF file");
      if (wav.byteLength !== 44 + frames * 4) throw new Error("unexpected wav size");
      return `${wav.byteLength} bytes`;
    });

    paint();
  }

  // ---------------------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------------------

  function init() {
    rebuildParts();
    renderStyleCards();
    renderRuler();
    buildMiniWave();
    bindEvents();
    refreshAll();
    updatePlayhead(0);
    updateStatus();

    const params = new URLSearchParams(location.search);
    const previewStyle = params.get("style");
    if (previewStyle && STYLES_BY_ID[previewStyle]) {
      setStyle(previewStyle, { announce: false, force: true });
    }

    if (params.has("selftest")) {
      window.addEventListener("error", (event) => {
        const pre = $("#selftest-output");
        if (pre) pre.textContent += `\nERROR ${event.message}`;
      });
      window.addEventListener("unhandledrejection", (event) => {
        const pre = $("#selftest-output");
        if (pre) pre.textContent += `\nREJECTION ${event.reason && (event.reason.message || event.reason)}`;
      });
      window.setTimeout(runSelfTest, 220);
      return;
    }

    const previewModal = params.get("modal");
    if (previewModal === "help") window.setTimeout(openHelp, 120);
    if (previewModal === "hum") window.setTimeout(openHum, 120);
  }

  function setBpmValue(value) {
    state.bpm = clamp(Math.round(Number(value) || state.bpm), 62, 136);
    updateControls();
    el.bpmBadge.textContent = `${state.bpm} BPM`;
    el.timeTotal.textContent = formatTime(totalDuration());
    if (engine) engine.setTempo(state.bpm);
    saveSoon();
    if (transport.playing) startPlayback(0);
  }

  function setLoopValue(value) {
    state.loop = Boolean(value);
    refreshTransport();
    saveSoon();
  }

  function setSpaceValue(value) {
    state.space = clamp(Number(value), 0, 0.6);
    el.spaceRange.value = String(Math.round(state.space * 100));
    el.spaceOut.textContent = `${Math.round(state.space * 100)}%`;
    setRangeFill(el.spaceRange);
    if (engine) engine.setSpace(state.space);
    saveSoon();
  }

  function setFillsValue(value) {
    state.fills = Boolean(value);
    el.fillsToggle.checked = state.fills;
    refreshTimeline();
    saveSoon();
  }

  function setMetronomeValue(value) {
    state.metronome = Boolean(value);
    saveSoon();
  }

  function setSoloValue(layer) {
    if (!TRACK_DEFS.some((track) => track.id === layer)) return;
    state.solo = state.solo === layer ? null : layer;
    refreshTimeline();
    saveSoon();
  }

  function setLevelValue(layer, value) {
    if (!(layer in state.levels)) return;
    state.levels[layer] = clamp(Number(value), 0, 1.5);
    saveSoon();
  }

  function setLayerValue(layer, value) {
    if (!(layer in state.layers)) return;
    state.layers[layer] = Boolean(value);
    refreshTimeline();
    saveSoon();
  }

  window.__sprout = {
    get state() {
      return state;
    },
    get style() {
      return currentStyle();
    },
    get progression() {
      return getProgression();
    },
    get audio() {
      return { audioCtx, engine, transport };
    },
    get isPlaying() {
      return transport.playing;
    },
    startPlayback,
    pausePlayback,
    stopPlayback,
    togglePlayback,
    seek,
    getPlayhead,
    exportWav,
    randomizeAll,
    setStyle,
    runSelfTest,
    refreshAll,
    refreshTimeline,
    refreshChords,
    updateHero,
    updateControls,
    saveSoon,
    toast,
    rebuildParts,
    ensureAudio,
    setBpm: setBpmValue,
    setLoop: setLoopValue,
    setSpace: setSpaceValue,
    setFills: setFillsValue,
    setMetronome: setMetronomeValue,
    setSolo: setSoloValue,
    setLevel: setLevelValue,
    setLayer: setLayerValue,
    chordInfo,
    chordMidis,
    midiToName,
    keyLabel,
    normalizeMelody,
    getProgression,
    currentStyle,
    updateTitle,
  };

  init();
})();
