/**
 * A representation of the HSL color space https://hslpicker.com/
 */
export class HSLA {
  hue = 0;

  saturation = '25%';

  luminosity = '50%';

  alpha = 1;

  /**
   * Rotate `this.hue` by `hueDelta` degrees and return the string value.
   */
  rotate(hueDelta = 1, save = false) {
    const raw = this.hue + hueDelta;
    const hue = Number.isSafeInteger(raw) ? raw : 0;
    const hsla = this.toString({ hue });
    if (save) {
      this.hue = hue;
    }
    return hsla;
  }

  /**
   * Encode to something usable by style, canvas etc.
   */
  toString({
    hue: h = this.hue,
    saturation: s = this.saturation,
    luminosity: l = this.luminosity,
    alpha: a = this.alpha,
  } = {}) {
    return `hsla(${[h, s, l, a].join()})`;
  }
}
