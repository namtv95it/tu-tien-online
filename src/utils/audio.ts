// Lightweight Web Audio API synthesizer for ancient Xianxia atmosphere
// 100% reliable, zero external MP3 dependencies, no 404 errors

class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private bgmPlaying: boolean = false;
  private bgmTimer: number | null = null;

  // Ancient Chinese Pentatonic Scale (Gong, Shang, Jiao, Zhi, Yu)
  // A minor pentatonic: A3, C4, D4, E4, G4, A4, C5, D5, E5
  private pentatonicNotes = [
    220.00, // A3
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
  ];

  // Tranquil Guzheng Melody Pattern
  private bgmPattern = [
    { noteIdx: 3, delay: 0.0, dur: 1.8 },   // E4
    { noteIdx: 5, delay: 0.8, dur: 1.6 },   // A4
    { noteIdx: 6, delay: 1.6, dur: 2.0 },   // C5
    { noteIdx: 4, delay: 2.6, dur: 1.8 },   // G4
    { noteIdx: 5, delay: 3.4, dur: 2.2 },   // A4
    { noteIdx: 2, delay: 4.6, dur: 1.8 },   // D4
    { noteIdx: 3, delay: 5.4, dur: 2.4 },   // E4
    { noteIdx: 1, delay: 6.8, dur: 2.0 },   // C4
    { noteIdx: 0, delay: 7.8, dur: 3.0 },   // A3
  ];

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (!val && this.bgmPlaying) {
      this.stopBGM();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public isBGMPlaying(): boolean {
    return this.bgmPlaying;
  }

  // Pluck a Guzheng / Guqin string
  private pluckGuzheng(freq: number, startTime: number, duration: number, gainVolume: number = 0.06) {
    if (!this.ctx || !this.enabled) return;

    const t = startTime;
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);

    // Subtle harmonic warmth
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq * 2, t);

    // Filter to simulate wooden body resonance
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3, t);
    filter.frequency.exponentialRampToValueAtTime(freq * 0.8, t + duration);

    // Envelope: sharp pluck attack, gentle vibrating decay
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(gainVolume, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(gainVolume * 0.4, t + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    subOsc.start(t);
    osc.stop(t + duration);
    subOsc.stop(t + duration);
  }

  // Start tranquil Xianxia BGM Loop
  public startBGM() {
    if (this.bgmPlaying || !this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    this.bgmPlaying = true;
    this.scheduleNextBGM();
  }

  public stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  public toggleBGM(): boolean {
    if (this.bgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  private scheduleNextBGM() {
    if (!this.bgmPlaying || !this.ctx) return;

    const now = this.ctx.currentTime;
    const loopDuration = 10.5; // seconds per cycle

    // Play all notes in the pattern
    this.bgmPattern.forEach((item) => {
      const noteFreq = this.pentatonicNotes[item.noteIdx];
      this.pluckGuzheng(noteFreq, now + item.delay, item.dur, 0.05);
    });

    // Sub-bass drone for deep meditation atmosphere
    const droneFreq = this.pentatonicNotes[0]; // A3
    this.pluckGuzheng(droneFreq / 2, now, 6.0, 0.03);

    // Schedule next loop
    this.bgmTimer = window.setTimeout(() => {
      this.scheduleNextBGM();
    }, loopDuration * 1000);
  }

  // Soft wooden click / jade tap
  public playClick() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // Ethereal meditation chime (Vận Khí / Đan Điền)
  public playQiFlow() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const freqs = [528, 660, 792]; // Solfeggio / harmonious pentatonic
    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.06);
      osc.stop(this.ctx.currentTime + idx * 0.06 + 0.6);
    });
  }

  // Heavenly breakthrough gong (Đột Phá Thành Công)
  public playBreakthrough() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [440, 554, 659, 880];
    notes.forEach((note, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note, this.ctx.currentTime + i * 0.1);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.1 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + i * 0.1);
      osc.stop(this.ctx.currentTime + i * 0.1 + 1.2);
    });
  }

  // Water drop / Linh tuyền tưới cây
  public playWaterDrop() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2400, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  // Alchemy fire sizzle / Luyện Đan Lửa
  public playAlchemyFire() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(450, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  // Spirit stone / Coin purchase clink
  public playCoin() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, this.ctx.currentTime);
    osc.frequency.setValueAtTime(2200, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }
}

export const soundManager = new SoundManager();
