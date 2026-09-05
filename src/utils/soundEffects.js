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
}

export const soundFx = new SoundEngine()
