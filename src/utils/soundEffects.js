/**
 * Fayrouz (فيروز) — Sensory Web Audio Synthesizer
 * 
 * Provides subtle, elegant tactile audio feedback using pure Web Audio API synthesis:
 * - Zero external asset downloads
 * - Ultra-low latency (<10ms)
 * - Safe fallback if audio context is blocked or muted
 */

class SoundEngine {
  constructor() {
    this.ctx = null
    this.isMuted = false
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        this.ctx = new AudioContext()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  setMuted(muted) {
    this.isMuted = muted
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    return this.isMuted
  }

  /**
   * Tactile micro-click (simulating an iOS haptic tap)
   */
  playTap() {
    if (this.isMuted) return
    try {
      this.init()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch (e) {
      // Ignore audio block errors
    }
  }

  /**
   * Warm harmonic chime for step advances and selections
   */
  playStepChime() {
    if (this.isMuted) return
    try {
      this.init()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const notes = [523.25, 659.25] // C5, E5

      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now + i * 0.05)

        gain.gain.setValueAtTime(0.06, now + i * 0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.18)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now + i * 0.05)
        osc.stop(now + i * 0.05 + 0.18)
      })
    } catch (e) {}
  }

  /**
   * Warm celebratory chord when Taste Passport is revealed
   */
  playPassportReveal() {
    if (this.isMuted) return
    try {
      this.init()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      // Warm pentatonic chord (F, A, C, E)
      const chord = [349.23, 440.00, 523.25, 659.25, 880.00]

      chord.forEach((freq, index) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + index * 0.08)

        gain.gain.setValueAtTime(0.08, now + index * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.8)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now + index * 0.08)
        osc.stop(now + index * 0.08 + 0.8)
      })
    } catch (e) {}
  }

  /**
   * Crisp celebratory chime when 1-tap ordering or fast adding
   */
  playCelebration() {
    if (this.isMuted) return
    try {
      this.init()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now + index * 0.04)

        gain.gain.setValueAtTime(0.07, now + index * 0.04)
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.04 + 0.22)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now + index * 0.04)
        osc.stop(now + index * 0.04 + 0.22)
      })
    } catch (e) {}
  }

  /**
   * High-frequency NFC beam handshake chime
   */
  playNfcBeam() {
    if (this.isMuted) return
    try {
      this.init()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const freqs = [880, 1318.5, 1760]

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.07)

        gain.gain.setValueAtTime(0.09, now + idx * 0.07)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now + idx * 0.07)
        osc.stop(now + idx * 0.07 + 0.25)
      })
    } catch (e) {}
  }

  /**
   * Ambient Levantine Cafe Soundscape (Warm acoustic arpeggio loop)
   */
  startAmbientCafe() {
    if (this.isAmbientPlaying) return
    try {
      this.init()
      if (!this.ctx) return

      this.isAmbientPlaying = true
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // C maj 7
        [220.00, 261.63, 329.63, 440.00], // A min 7
        [174.61, 220.00, 261.63, 329.63], // F maj 7
        [196.00, 246.94, 293.66, 392.00], // G dom 7
      ]
      let stepIndex = 0

      this.ambientTimer = setInterval(() => {
        if (!this.isAmbientPlaying || this.isMuted || !this.ctx) return

        const chord = chords[Math.floor(stepIndex / 4) % chords.length]
        const note = chord[stepIndex % chord.length]
        const now = this.ctx.currentTime

        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        const filter = this.ctx.createBiquadFilter()

        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(900, now)

        osc.type = 'sine'
        osc.frequency.setValueAtTime(note, now)

        gain.gain.setValueAtTime(0.025, now)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now)
        osc.stop(now + 0.9)

        stepIndex++
      }, 450)
    } catch (e) {}
  }

  stopAmbientCafe() {
    this.isAmbientPlaying = false
    if (this.ambientTimer) {
      clearInterval(this.ambientTimer)
      this.ambientTimer = null
    }
  }

  toggleAmbientCafe() {
    if (this.isAmbientPlaying) {
      this.stopAmbientCafe()
      return false
    } else {
      this.startAmbientCafe()
      return true
    }
  }
}

export const soundFx = new SoundEngine()
