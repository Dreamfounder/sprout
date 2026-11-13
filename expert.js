(() => {
  "use strict";

  const api = window.__sprout;
  if (!api) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const pad2 = (value) => String(value).padStart(2, "0");
  const mod = (value, n) => ((value % n) + n) % n;

  const TRACKS = [
    { id: "melody", name: "主旋律", short: "LEAD", color: "#c9ee82", kind: "piano", low: 60, high: 84 },
    { id: "chords", name: "和声", short: "CHORDS", color: "#ff8d73", kind: "chords" },
    { id: "bass", name: "贝斯", short: "BASS", color: "#9fd4e2", kind: "piano", low: 36, high: 52 },
    { id: "drums", name: "鼓点", short: "DRUMS", color: "#f0c96a", kind: "drums" },
    { id: "sparkle", name: "星光", short: "SPARKLE", color: "#c7b7e8", kind: "piano", low: 60, high: 88 },
  ];

  const DRUM_LABELS = {
    kick: "底鼓",
    snare: "军鼓",
    hat: "闭镲",
    openhat: "开镲",
    clap: "拍手",
    shaker: "沙锤",
    rim: "边击",
  };

  const DRUM_COLORS = {
    kick: "#f0c96a",
    snare: "#ff9d7f",
    hat: "#b9d88d",
    openhat: "#86c9b0",
    clap: "#e6a8bc",
    shaker: "#c7b7e8",
    rim: "#9fd4e2",
  };

  const QUALITY_OPTIONS = [
    ["maj", "大三和弦"],
    ["min", "小三和弦"],
    ["maj7", "大七和弦"],
    ["min7", "小七和弦"],
    ["dom7", "属七和弦"],
    ["sus4", "挂四和弦"],
    ["add9", "加九和弦"],
  ];

  const el = {
    section: $("#expertMode"),
    openBtn: $("#expertBtn"),
    exitBtn: $("#expertExit"),
    title: $("#expertTitle"),
    save: $("#expertSave"),
    undo: $("#expertUndo"),
    redo: $("#expertRedo"),
    exportBtn: $("#expertExport"),
    play: $("#expertPlay"),
    stop: $("#expertStop"),
    loop: $("#expertLoop"),
    time: $("#expertTime"),
    bpm: $("#expertBpm"),
    key: $("#expertKey"),
    quantize: $("#expertQuantize"),
    metro: $("#expertMetro"),
    zoom: $("#expertZoom"),
    reset: $("#expertReset"),
    trackList: $("#expertTrackList"),
    ruler: $("#expertRuler"),
    lanes: $("#expertLanes"),
    arranger: $("#expertArranger"),
    arrangerScroll: $("#expertArrangerScroll"),
    playhead: $("#expertPlayhead"),
    editorDot: $("#expertEditorDot"),
    editorName: $("#expertEditorName"),
    editorSub: $("#expertEditorSub"),
    toolDraw: $("#expertToolDraw"),
    toolErase: $("#expertToolErase"),
    generate: $("#expertGenerate"),
    clear: $("#expertClear"),
    piano: $("#expertPiano"),
    drums: $("#expertDrums"),
    chords: $("#expertChords"),
    inspector: $("#expertInspector"),
    status: $("#expertStatusText"),
  };

  const state = api.state;
  let open = false;
  let currentTrack = "melody";
  let selectedSegment = 0;
  let selectedNote = null;
  let tool = "draw";
  let snap = 2;
  let stepW = 11;
  let rowH = 19;
  let pendingScroll = null;
  let drag = null;
  let undoStack = [];
  let redoStack = [];
  let raf = 0;
  let lastBar = -1;
  let lastPlaying = null;

  const trackDef = (id = currentTrack) => TRACKS.find((track) => track.id === id) || TRACKS[0];
  const customKey = (id) => (id === "melody" ? "customMelody" : id === "bass" ? "customBass" : "customSparkle");

  function noteName(midi) {
    return api.midiToName(midi, api.style.keyFlat);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function capture() {
    return JSON.stringify({
      customMelody: state.customMelody,
      customBass: state.customBass,
      customSparkle: state.customSparkle,
      customProgression: state.customProgression,
      drumPattern: state.drumPattern,
      levels: state.levels,
      solo: state.solo,
      bpm: state.bpm,
      seed: state.seed,
      fills: state.fills,
      space: state.space,
    });
  }

  function pushUndo(before = capture()) {
    undoStack.push(before);
    if (undoStack.length > 60) undoStack.shift();
    redoStack = [];
    updateUndoButtons();
  }

  function restore(snapshot) {
    const data = JSON.parse(snapshot);
    state.customMelody = data.customMelody;
    state.customBass = data.customBass;
    state.customSparkle = data.customSparkle;
    state.customProgression = data.customProgression;
    state.drumPattern = data.drumPattern;
    state.levels = data.levels || state.levels;
    state.solo = data.solo || null;
    state.bpm = data.bpm || state.bpm;
    state.seed = data.seed ?? state.seed;
    state.fills = data.fills ?? state.fills;
    state.space = data.space ?? state.space;
    api.rebuildParts();
    const { engine } = api.audio;
    if (engine) {
      engine.setTempo(state.bpm);
      engine.setSpace(state.space);
    }
    api.refreshAll();
    renderAll();
  }

  function undo() {
    if (!undoStack.length) return;
    const snapshot = undoStack.pop();
    redoStack.push(capture());
    restore(snapshot);
    updateUndoButtons();
    api.toast("已撤销");
  }

  function redo() {
    if (!redoStack.length) return;
    const snapshot = redoStack.pop();
    undoStack.push(capture());
    restore(snapshot);
    updateUndoButtons();
    api.toast("已重做");
  }

  function updateUndoButtons() {
    el.undo.disabled = !undoStack.length;
    el.redo.disabled = !redoStack.length;
  }

  function ensureEditableNotes(trackId) {
    const key = customKey(trackId);
    if (!state[key]) {
      state[key] = (state.parts[trackId] || []).map((note) => ({ ...note }));
    }
    return state[key];
  }

  function ensureDrumPattern() {
    if (!state.drumPattern) {
      state.drumPattern = {};
      Object.entries(api.style.drums).forEach(([key, value]) => {
        state.drumPattern[key] = value;
      });
    }
    return state.drumPattern;
  }

  function currentProgression() {
    return (state.customProgression || api.progression).map((chord) => ({ ...chord }));
  }

  function ensureCustomProgression() {
    if (!state.customProgression) state.customProgression = currentProgression();
    return state.customProgression;
  }

  function syncTitle() {
    if (document.activeElement !== el.title) el.title.value = state.title;
  }

  function syncControls() {
    syncTitle();
    el.bpm.value = String(state.bpm);
    el.key.textContent = api.keyLabel(api.style);
    el.loop.classList.toggle("is-on", Boolean(state.loop));
    el.loop.setAttribute("aria-pressed", String(Boolean(state.loop)));
    el.metro.classList.toggle("is-on", Boolean(state.metronome));
    el.metro.setAttribute("aria-pressed", String(Boolean(state.metronome)));
    el.quantize.value = String(snap);
    el.zoom.value = String(stepW);
    const def = trackDef();
    el.editorDot.style.background = def.color;
    el.editorDot.style.boxShadow = `0 0 0 3px ${def.color}42`;
    el.editorName.textContent = def.name;
    el.editorSub.textContent = def.kind === "piano"
      ? `PIANO ROLL · ${noteName(def.low)}–${noteName(def.high)}`
      : def.kind === "drums"
        ? "STEP SEQUENCER"
        : "CHORD TRACK";
    el.toolDraw.disabled = def.kind !== "piano";
    el.toolErase.disabled = def.kind !== "piano";
    el.toolDraw.classList.toggle("is-on", tool === "draw" && def.kind === "piano");
    el.toolErase.classList.toggle("is-on", tool === "erase" && def.kind === "piano");
    el.generate.textContent = def.id === "melody" || def.id === "sparkle" ? "重新生成" : "还原预设";
    el.status.textContent = api.isPlaying
      ? `正在播放 · ${api.style.name} · ${state.bpm} BPM`
      : `专家模式 · ${api.style.name} · ${state.bpm} BPM`;
  }

  function renderTracks() {
    el.trackList.innerHTML = TRACKS.map((track) => {
      const muted = state.solo ? state.solo !== track.id : !state.layers[track.id];
      const selected = currentTrack === track.id;
      return `
        <div class="ex-track${selected ? " is-selected" : ""}${muted ? " is-muted" : ""}"
          data-track="${track.id}" role="button" tabindex="0" aria-label="${track.name}">
          <span class="ex-track-color" style="--track-color:${track.color}"></span>
          <span class="ex-track-info">
            <strong>${track.name}</strong>
            <small>${track.short}</small>
          </span>
          <span class="ex-track-btns">
            <button class="ex-track-btn${!state.layers[track.id] ? " is-on" : ""}" data-act="mute"
              data-track="${track.id}" title="静音" aria-label="静音 ${track.name}">M</button>
            <button class="ex-track-btn${state.solo === track.id ? " is-solo" : ""}" data-act="solo"
              data-track="${track.id}" title="独奏" aria-label="独奏 ${track.name}">S</button>
          </span>
        </div>`;
    }).join("");
  }

  function renderRuler() {
    el.ruler.innerHTML = Array.from({ length: 8 }, (_, index) => (
      `<button class="ex-bar-btn" type="button" data-bar="${index}" aria-label="跳到第 ${index + 1} 小节">${index + 1}</button>`
    )).join("");
  }

  function notesFor(trackId) {
    if (trackId === "melody") return state.parts.melody || [];
    if (trackId === "bass") return state.parts.bass || [];
    if (trackId === "sparkle") return state.parts.sparkle || [];
    return [];
  }

  function clipMiniNotes(track, segment) {
    const def = trackDef(track.id);
    const notes = notesFor(track.id);
    const startStep = segment * 32;
    const endStep = startStep + 32;
    const inSegment = notes.filter((note) => note.start >= startStep && note.start < endStep);
    const low = def.low ?? 48;
    const high = def.high ?? 84;

    if (track.kind === "chords") return "";

    if (track.kind === "drums") {
      const pattern = state.drumPattern || api.style.drums;
      const dots = [];
      const startBar = segment * 2;
      Object.entries(pattern).forEach(([type, hits]) => {
        hits.split("").forEach((hit, step) => {
          if (hit !== "x" && hit !== "X") return;
          const absolute = (startBar % 8) * 16 + step;
          const local = absolute - segment * 32;
          if (local < 0 || local >= 32) return;
          dots.push(`<i class="ex-mini-dot" style="left:${(local / 32) * 100}%;top:${18 + (Object.keys(pattern).indexOf(type) * 9)}%"></i>`);
        });
      });
      return dots.join("");
    }

    return inSegment.map((note) => {
      const left = ((note.start - startStep) / 32) * 100;
      const width = Math.max((note.dur / 32) * 100, 1.6);
      const top = 12 + (1 - clamp((note.midi - low) / Math.max(1, high - low), 0, 1)) * 70;
      return `<i class="ex-mini-note" style="left:${left}%;width:${width}%;top:${top}%"></i>`;
    }).join("");
  }

  function renderArrangement() {
    el.lanes.innerHTML = TRACKS.map((track) => {
      const muted = state.solo ? state.solo !== track.id : !state.layers[track.id];
      const clips = Array.from({ length: 4 }, (_, segment) => {
        const selected = currentTrack === track.id && selectedSegment === segment;
        let label;
        if (track.id === "chords") {
          const chord = currentProgression()[segment];
          const info = api.chordInfo(api.style, chord);
          label = `<b>${info.root}${info.quality}</b><span>2 BARS</span>`;
        } else {
          const letter = ["A", "B", "C", "D"][segment];
          label = `<b>${letter}${segment + 1}</b><span>${track.short}</span>`;
        }
        return `
          <div class="ex-clip${selected ? " is-selected" : ""}" data-track="${track.id}"
            data-segment="${segment}" style="left:${segment * 25}%;--clip-color:${track.color}"
            title="${track.name} · 第 ${segment * 2 + 1}–${segment * 2 + 2} 小节">
            <span class="ex-clip-label">${label}</span>
            <span class="ex-clip-notes">${clipMiniNotes(track, segment)}</span>
          </div>`;
      }).join("");
      return `
        <div class="ex-lane${currentTrack === track.id ? " is-selected" : ""}${muted ? " is-muted" : ""}"
          data-track="${track.id}">${clips}</div>`;
    }).join("");
  }

  function renderPiano() {
    const def = trackDef();
    const low = def.low;
    const high = def.high;
    const rows = high - low + 1;
    const width = 128 * stepW;
    const height = rows * rowH;
    const notes = notesFor(def.id);

    const keys = [];
    for (let midi = high; midi >= low; midi -= 1) {
      const pc = ((midi % 12) + 12) % 12;
      const isBlack = [1, 3, 6, 8, 10].includes(pc);
      const isC = pc === 0;
      keys.push(`<span class="ex-key${isBlack ? " is-black" : ""}${isC ? " is-c" : ""}">${isC || stepW >= 14 ? noteName(midi) : ""}</span>`);
    }

    const noteHtml = notes.map((note, index) => {
      const left = note.start * stepW;
      const top = (high - note.midi) * rowH + 1;
      const noteWidth = Math.max(note.dur * stepW - 2, 4);
      return `<span class="ex-note${selectedNote === index ? " is-selected" : ""}" data-index="${index}"
        style="left:${left}px;top:${top}px;width:${noteWidth}px;--note-color:${def.color}"
        title="${noteName(note.midi)} · ${note.dur} 格">
        <span class="ex-note-handle"></span>
      </span>`;
    }).join("");

    const previousScroll = $("#exPianoScroll", el.piano);
    const scrollLeft = pendingScroll !== null ? pendingScroll : (previousScroll ? previousScroll.scrollLeft : 0);
    const scrollTop = previousScroll ? previousScroll.scrollTop : 0;
    pendingScroll = null;

    el.piano.innerHTML = `
      <div class="ex-piano-scroll" id="exPianoScroll">
        <div class="ex-piano-inner">
          <div class="ex-keys" style="--row-h:${rowH}px">${keys.join("")}</div>
          <div class="ex-canvas${tool === "erase" ? " is-erase" : ""}" id="exPianoCanvas"
            style="width:${width}px;height:${height}px;--row-h:${rowH}px;
              background-size:${stepW * 16}px 100%,${stepW}px 100%,100% ${rowH}px">
            ${noteHtml}
          </div>
        </div>
      </div>`;

    const scroll = $("#exPianoScroll", el.piano);
    scroll.scrollLeft = scrollLeft;
    scroll.scrollTop = scrollTop;
    $("#exPianoCanvas", el.piano).addEventListener("pointerdown", onPianoPointerDown);
    $("#exPianoCanvas", el.piano).addEventListener("contextmenu", (event) => event.preventDefault());
  }

  function pianoTarget(event) {
    const canvas = $("#exPianoCanvas", el.piano);
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      canvas,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function addNoteAt(event) {
    if (tool === "erase") return;
    const def = trackDef();
    const target = pianoTarget(event);
    if (!target) return;
    const step = clamp(Math.round(Math.floor(target.x / stepW) / snap) * snap, 0, 128 - snap);
    const midi = clamp(def.high - Math.floor(target.y / rowH), def.low, def.high);
    pushUndo();
    const notes = ensureEditableNotes(def.id);
    notes.push({ start: step, dur: snap, midi, vel: 0.8 });
    selectedNote = notes.length - 1;
    applyNoteChange(false);
    renderPiano();
  }

  function deleteNote(index, trackId = currentTrack) {
    const key = customKey(trackId);
    const notes = ensureEditableNotes(trackId);
    if (!notes[index]) return;
    pushUndo();
    notes.splice(index, 1);
    selectedNote = null;
    applyNoteChange(false);
    renderPiano();
  }

  function applyNoteChange(render = true) {
    api.rebuildParts();
    api.refreshAll();
    renderArrangement();
    if (render) renderPiano();
    renderInspector();
    api.saveSoon();
  }

  function onPianoPointerDown(event) {
    const def = trackDef();
    const noteEl = event.target.closest(".ex-note");
    if (noteEl) {
      const index = Number(noteEl.dataset.index);
      const note = notesFor(def.id)[index];
      if (!note) return;
      if (event.button === 2 || tool === "erase") {
        event.preventDefault();
        deleteNote(index);
        return;
      }
      selectedNote = index;
      const handle = event.target.closest(".ex-note-handle");
      drag = {
        index,
        handle: Boolean(handle),
        startX: event.clientX,
        startY: event.clientY,
        origStart: note.start,
        origDur: note.dur,
        origMidi: note.midi,
        before: capture(),
        moved: false,
      };
      const canvas = noteEl.closest(".ex-canvas");
      if (canvas) canvas.setPointerCapture?.(event.pointerId);
      event.preventDefault();
      renderPiano();
      window.addEventListener("pointermove", onPianoPointerMove);
      window.addEventListener("pointerup", onPianoPointerUp, { once: true });
      return;
    }
    if (event.button !== 0) return;
    addNoteAt(event);
  }

  function onPianoPointerMove(event) {
    if (!drag) return;
    const def = trackDef();
    const note = ensureEditableNotes(def.id)[drag.index];
    if (!note) return;
    const dx = Math.round((event.clientX - drag.startX) / stepW);
    const dy = Math.round((event.clientY - drag.startY) / rowH);

    if (!drag.moved && (dx !== 0 || dy !== 0)) {
      pushUndo(drag.before);
      drag.moved = true;
    }
    if (!drag.moved) return;

    if (drag.handle) {
      const raw = drag.origDur + Math.round(dx / snap) * snap;
      note.dur = clamp(raw, snap, 128 - note.start);
    } else {
      const rawStart = Math.round((drag.origStart + dx) / snap) * snap;
      note.start = clamp(rawStart, 0, 128 - note.dur);
      note.midi = clamp(drag.origMidi - dy, def.low, def.high);
    }

    const noteEl = $(`.ex-note[data-index="${drag.index}"]`, el.piano);
    if (noteEl) {
      noteEl.style.left = `${note.start * stepW}px`;
      noteEl.style.top = `${(def.high - note.midi) * rowH + 1}px`;
      noteEl.style.width = `${Math.max(note.dur * stepW - 2, 4)}px`;
      noteEl.title = `${noteName(note.midi)} · ${note.dur} 格`;
    }
  }

  function onPianoPointerUp() {
    if (!drag) return;
    const changed = drag.moved;
    drag = null;
    window.removeEventListener("pointermove", onPianoPointerMove);
    if (changed) {
      api.rebuildParts();
      api.refreshAll();
      renderArrangement();
      renderInspector();
      api.saveSoon();
      api.toast("音符已更新");
    } else {
      renderPiano();
    }
  }

  function renderDrums() {
    const pattern = state.drumPattern || api.style.drums;
    const types = Object.keys(pattern);
    const barHead = `<div class="ex-drum-bar-head"><span>STEP</span>${Array.from({ length: 8 }, (_, index) => `<span>${index + 1}</span>`).join("")}</div>`;
    const rows = types.map((type) => {
      const cells = [];
      for (let step = 0; step < 128; step += 1) {
        const active = pattern[type][step % 16] === "x" || pattern[type][step % 16] === "X";
        cells.push(`<button class="ex-step${active ? " is-on" : ""}"
          data-type="${type}" data-step="${step}" aria-label="${DRUM_LABELS[type] || type} 第 ${step + 1} 格"></button>`);
      }
      return `
        <div class="ex-drum-row">
          <span class="ex-drum-name"><i style="--drum-color:${DRUM_COLORS[type] || "#c9ee82"}"></i>${DRUM_LABELS[type] || type}</span>
          <div class="ex-steps" style="--drum-color:${DRUM_COLORS[type] || "#c9ee82"}">${cells.join("")}</div>
        </div>`;
    }).join("");
    el.drums.innerHTML = `<div class="ex-drum-hint">8 小节共用一条 16 步鼓型 · 点格子开关</div><div class="ex-drum-grid">${barHead}${rows}</div>`;
    el.drums.querySelectorAll(".ex-step").forEach((cell) => {
      cell.addEventListener("click", () => {
        const patternNow = ensureDrumPattern();
        const type = cell.dataset.type;
        const step = Number(cell.dataset.step) % 16;
        pushUndo();
        const chars = patternNow[type].split("");
        chars[step] = chars[step] === "x" || chars[step] === "X" ? "." : "x";
        patternNow[type] = chars.join("");
        renderDrums();
        api.refreshTimeline();
        renderArrangement();
        api.saveSoon();
      });
    });
  }

  function renderChords() {
    const progression = currentProgression();
    const names = api.style.keyFlat
      ? ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"]
      : ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
    el.chords.innerHTML = `
      <div class="ex-chord-intro"><span>四个和弦，每个持续 2 小节。改动会立即进入播放。</span></div>
      <div class="ex-chord-cards">
        ${progression.map((chord, index) => {
          const info = api.chordInfo(api.style, chord);
          return `
            <div class="ex-chord-card${selectedSegment === index ? " is-selected" : ""}" data-chord-index="${index}">
              <span class="ex-chord-index">CHORD ${pad2(index + 1)} · BARS ${index * 2 + 1}–${index * 2 + 2}</span>
              <strong class="ex-chord-name">${info.root}<small>${info.quality || "maj"}</small></strong>
              <label>根音</label>
              <select data-chord-field="root" data-chord-index="${index}">
                ${names.map((name, root) => `<option value="${root}"${root === info.rootPc ? " selected" : ""}>${name}</option>`).join("")}
              </select>
              <label>和弦性质</label>
              <select data-chord-field="q" data-chord-index="${index}">
                ${QUALITY_OPTIONS.map(([value, label]) => `<option value="${value}"${value === chord.q ? " selected" : ""}>${label}</option>`).join("")}
              </select>
              <button class="ex-chord-preview" type="button" data-preview="${index}">试听这个和弦</button>
            </div>`;
        }).join("")}
      </div>`;
    el.chords.querySelectorAll("select").forEach((select) => {
      select.addEventListener("change", () => {
        pushUndo();
        const index = Number(select.dataset.chordIndex);
        const field = select.dataset.chordField;
        const progressionNow = ensureCustomProgression();
        progressionNow[index][field] = field === "root"
          ? mod(Number(select.value) - api.style.key, 12)
          : select.value;
        state.customProgression = progressionNow;
        api.rebuildParts();
        api.refreshAll();
        renderArrangement();
        renderChords();
        api.saveSoon();
      });
    });
    el.chords.querySelectorAll("[data-preview]").forEach((button) => {
      button.addEventListener("click", () => {
        const chord = currentProgression()[Number(button.dataset.preview)];
        api.ensureAudio().then(() => {
          const { audioCtx, engine } = api.audio;
          if (!audioCtx || !engine) return;
          const notes = api.chordMidis(api.style, chord, 4).map((midi) => midi + 12);
          engine.stab(notes, audioCtx.currentTime + 0.02, 0.8, 0.45);
          engine.pluck(notes[0], audioCtx.currentTime + 0.02, 0.3, 0.15);
        });
      });
    });
  }

  function renderEditor() {
    const def = trackDef();
    el.piano.hidden = def.kind !== "piano";
    el.drums.hidden = def.kind !== "drums";
    el.chords.hidden = def.kind !== "chords";
    if (def.kind === "piano") renderPiano();
    if (def.kind === "drums") renderDrums();
    if (def.kind === "chords") renderChords();
  }

  function renderInspector() {
    const def = trackDef();
    const notes = def.kind === "piano" ? notesFor(def.id).length : null;
    const custom = def.id === "chords"
      ? Boolean(state.customProgression)
      : def.id === "drums"
        ? Boolean(state.drumPattern)
        : Boolean(state[customKey(def.id)]);
    el.inspector.innerHTML = `
      <div class="ex-inspector-track">
        <span class="ex-inspector-swatch" style="--track-color:${def.color}"></span>
        <span><strong>${def.name}</strong><small>${def.short} · ${custom ? "自定义" : "自动生成"}</small></span>
      </div>
      <div class="ex-inspector-block">
        <div class="ex-inspector-label"><span>轨道音量</span><output id="exLevelOut">${Math.round((state.levels[def.id] || 1) * 100)}%</output></div>
        <input class="ex-inspector-range" id="exLevel" type="range" min="0" max="150" step="1"
          value="${Math.round((state.levels[def.id] || 1) * 100)}" aria-label="${def.name}音量">
      </div>
      <div class="ex-inspector-block">
        <div class="ex-inspector-label"><span>状态</span><span>${notes === null ? "—" : `${notes} 个音符`}</span></div>
        <div class="ex-inspector-row">
          <button class="ex-inspector-btn${!state.layers[def.id] ? " is-on" : ""}" type="button" data-inspector="mute">静音</button>
          <button class="ex-inspector-btn${state.solo === def.id ? " is-solo" : ""}" type="button" data-inspector="solo">独奏</button>
        </div>
        <p class="ex-inspector-note">${def.kind === "piano" ? "双击空白处画音符，拖动音符改位置，拖右侧改长度。右键删除。" : def.kind === "drums" ? "点格子打开或关闭鼓点，蓝色线是小节线。" : "四个和弦各管 2 小节，点试听确认颜色。"}</p>
      </div>
      <div class="ex-inspector-block">
        <div class="ex-inspector-label"><span>空间感</span><output id="exSpaceOut">${Math.round(state.space * 100)}%</output></div>
        <input class="ex-inspector-range" id="exSpace" type="range" min="0" max="60" step="1"
          value="${Math.round(state.space * 100)}" aria-label="空间感">
      </div>
      <div class="ex-inspector-block">
        <div class="ex-inspector-label"><span>演奏细节</span><span>${state.fills ? "开" : "关"}</span></div>
        <button class="ex-inspector-btn${state.fills ? " is-on" : ""}" style="width:100%" type="button" data-inspector="fills">
          自动加花
        </button>
      </div>
      <div class="ex-inspector-block">
        <div class="ex-inspector-label"><span>组织方式</span><span>${custom ? "已编辑" : "预设"}</span></div>
        <button class="ex-inspector-btn" style="width:100%" type="button" data-inspector="reset">${def.id === "melody" || def.id === "sparkle" ? "重新生成" : "还原预设"}</button>
      </div>`;

    const level = $("#exLevel", el.inspector);
    if (level) {
      level.addEventListener("input", () => {
        const value = Number(level.value) / 100;
        api.setLevel(def.id, value);
        $("#exLevelOut", el.inspector).textContent = `${level.value}%`;
      });
    }
    const space = $("#exSpace", el.inspector);
    if (space) {
      space.addEventListener("input", () => {
        api.setSpace(Number(space.value) / 100);
        $("#exSpaceOut", el.inspector).textContent = `${space.value}%`;
      });
    }
    el.inspector.querySelectorAll("[data-inspector]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.inspector;
        if (action === "mute") {
          api.setLayer(def.id, !state.layers[def.id]);
          renderTracks();
          renderArrangement();
          renderInspector();
        } else if (action === "solo") {
          api.setSolo(def.id);
          renderTracks();
          renderArrangement();
          renderInspector();
        } else if (action === "fills") {
          api.setFills(!state.fills);
          renderInspector();
        } else if (action === "reset") {
          resetTrack();
        }
      });
    });
  }

  function resetTrack() {
    const def = trackDef();
    pushUndo();
    if (def.id === "melody") {
      state.seed = (Math.random() * 0xffffffff) >>> 0;
      state.customMelody = null;
    } else if (def.id === "bass") {
      state.customBass = null;
    } else if (def.id === "sparkle") {
      state.seed = (Math.random() * 0xffffffff) >>> 0;
      state.customSparkle = null;
    } else if (def.id === "drums") {
      state.drumPattern = null;
    } else if (def.id === "chords") {
      state.customProgression = null;
    }
    api.rebuildParts();
    api.refreshAll();
    renderAll();
    api.saveSoon();
    api.toast("已还原这一轨");
  }

  function clearTrack() {
    const def = trackDef();
    pushUndo();
    if (def.kind === "piano") {
      state[customKey(def.id)] = [];
      selectedNote = null;
    } else if (def.kind === "drums") {
      const pattern = ensureDrumPattern();
      Object.keys(pattern).forEach((key) => {
        pattern[key] = "................";
      });
    } else if (def.kind === "chords") {
      const first = currentProgression()[0] || { root: 0, q: "maj" };
      state.customProgression = [0, 1, 2, 3].map(() => ({ ...first }));
    }
    api.rebuildParts();
    api.refreshAll();
    renderAll();
    api.saveSoon();
    api.toast("这一轨已清空");
  }

  function updatePlayhead(position) {
    const clamped = Math.min(8, Math.max(0, position));
    el.playhead.style.left = `${(clamped / 8) * 100}%`;
    const p = Math.min(7.999, clamped);
    const bar = Math.floor(p) + 1;
    const beat = Math.floor((p % 1) * 4) + 1;
    const step = Math.floor(((p * 4) % 1) * 4) + 1;
    el.time.textContent = `${pad2(bar)} · ${pad2(beat)} · ${pad2(step)}`;
    if (bar - 1 !== lastBar) {
      lastBar = bar - 1;
      $$(".ex-bar-btn", el.ruler).forEach((button, index) => button.classList.toggle("is-current", index === lastBar));
    }
  }

  function syncTransport() {
    const playing = api.isPlaying;
    if (playing !== lastPlaying) {
      lastPlaying = playing;
      el.play.querySelector("use")?.setAttribute("href", playing ? "#i-pause" : "#i-play");
      el.play.setAttribute("aria-label", playing ? "暂停" : "播放");
      el.status.textContent = playing
        ? `正在播放 · ${api.style.name} · ${state.bpm} BPM`
        : `专家模式 · ${api.style.name} · ${state.bpm} BPM`;
    }
    updatePlayhead(api.getPlayhead());
  }

  function startRaf() {
    cancelAnimationFrame(raf);
    const frame = () => {
      if (!open) return;
      syncTransport();
      raf = requestAnimationFrame(frame);
    };
    frame();
  }

  function renderAll() {
    syncControls();
    renderTracks();
    renderRuler();
    renderArrangement();
    renderEditor();
    renderInspector();
    updateUndoButtons();
    updatePlayhead(api.getPlayhead());
  }

  async function togglePlay() {
    await api.togglePlayback();
    lastPlaying = !api.isPlaying;
    syncTransport();
  }

  async function openExpert() {
    if (open) return;
    open = true;
    el.section.hidden = false;
    document.body.classList.add("expert-open");
    const params = new URLSearchParams(location.search);
    const requestedTrack = params.get("track");
    if (requestedTrack && TRACKS.some((track) => track.id === requestedTrack)) {
      currentTrack = requestedTrack;
      selectedSegment = 0;
      pendingScroll = 0;
    }
    el.title.value = state.title;
    lastPlaying = null;
    renderAll();
    startRaf();
    api.toast("专家模式 · 所有修改实时生效");
    window.setTimeout(() => el.play.focus(), 60);
  }

  function closeExpert() {
    if (!open) return;
    open = false;
    el.section.hidden = true;
    document.body.classList.remove("expert-open");
    cancelAnimationFrame(raf);
    state.metronome = false;
    api.refreshAll();
    api.saveSoon();
    el.openBtn.focus();
  }

  function bind() {
    el.openBtn.addEventListener("click", openExpert);
    el.exitBtn.addEventListener("click", closeExpert);
    el.exportBtn.addEventListener("click", () => api.exportWav());
    el.play.addEventListener("click", togglePlay);
    el.stop.addEventListener("click", () => {
      api.stopPlayback();
      syncTransport();
    });
    el.loop.addEventListener("click", () => {
      api.setLoop(!state.loop);
      syncControls();
    });
    el.metro.addEventListener("click", () => {
      api.setMetronome(!state.metronome);
      syncControls();
    });
    el.reset.addEventListener("click", () => {
      api.seek(0);
      syncTransport();
    });
    el.bpm.addEventListener("change", () => {
      api.setBpm(el.bpm.value);
      syncControls();
    });
    el.quantize.addEventListener("change", () => {
      snap = Number(el.quantize.value) || 2;
    });
    el.zoom.addEventListener("input", () => {
      stepW = Number(el.zoom.value) || 11;
      if (trackDef().kind === "piano") renderPiano();
      if (trackDef().kind === "drums") renderDrums();
    });
    el.title.addEventListener("input", () => {
      api.updateTitle(el.title.value);
      el.save.textContent = "编辑中…";
    });
    el.title.addEventListener("blur", () => {
      el.save.textContent = "已保存";
    });
    el.title.addEventListener("keydown", (event) => {
      if (event.key === "Enter") el.title.blur();
    });
    el.undo.addEventListener("click", undo);
    el.redo.addEventListener("click", redo);
    el.toolDraw.addEventListener("click", () => {
      tool = "draw";
      syncControls();
      renderPiano();
    });
    el.toolErase.addEventListener("click", () => {
      tool = "erase";
      syncControls();
      renderPiano();
    });
    el.generate.addEventListener("click", resetTrack);
    el.clear.addEventListener("click", clearTrack);

    el.trackList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-act]");
      if (button) {
        event.stopPropagation();
        const trackId = button.dataset.track;
        if (button.dataset.act === "mute") {
          api.setLayer(trackId, !state.layers[trackId]);
        } else {
          api.setSolo(trackId);
        }
        renderTracks();
        renderArrangement();
        renderInspector();
        return;
      }
      const row = event.target.closest(".ex-track");
      if (!row) return;
      currentTrack = row.dataset.track;
      selectedSegment = 0;
      selectedNote = null;
      pendingScroll = 0;
      renderAll();
    });

    el.ruler.addEventListener("click", (event) => {
      const bar = event.target.closest("[data-bar]");
      if (!bar) return;
      api.seek(Number(bar.dataset.bar));
      syncTransport();
    });

    el.lanes.addEventListener("click", (event) => {
      const clip = event.target.closest(".ex-clip");
      if (clip) {
        currentTrack = clip.dataset.track;
        selectedSegment = Number(clip.dataset.segment);
        selectedNote = null;
        if (trackDef().kind === "piano") pendingScroll = selectedSegment * 32 * stepW;
        renderAll();
        return;
      }
      const lane = event.target.closest(".ex-lane");
      if (lane) {
        currentTrack = lane.dataset.track;
        selectedSegment = 0;
        selectedNote = null;
        pendingScroll = 0;
        renderAll();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!open) return;
      const target = event.target;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "SELECT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (event.key === "Escape") {
        if (typing) {
          target.blur();
        } else {
          closeExpert();
        }
        return;
      }
      if (typing) return;
      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
      } else if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (event.shiftKey) redo();
        else undo();
      }
    });

    if (new URLSearchParams(location.search).has("expert")) {
      window.setTimeout(openExpert, 120);
    }
  }

  bind();
})();
