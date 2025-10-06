/**
 * Color Alpha Applier Utility
 * Applies alpha/opacity to various color formats (hex, rgb, rgba, hsl, hsla)
 */

export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

export interface ColorAlphaOptions {
  /** Alpha value between 0 and 1 */
  alpha: number;
  /** Force output format. If not specified, will maintain input format or upgrade to alpha variant */
  outputFormat?: ColorFormat;
  /** Whether to preserve existing alpha in rgba/hsla colors (multiply) or replace it */
  preserveAlpha?: boolean;
}

/**
 * Applies alpha to a color string
 * @param color - Color string in various formats (hex, rgb, rgba, hsl, hsla)
 * @param options - Alpha options
 * @returns Color string with alpha applied
 */
export function applyAlpha(color: string, options: ColorAlphaOptions): string {
  const { alpha, outputFormat, preserveAlpha = false } = options;
  
  // Validate alpha value
  if (alpha < 0 || alpha > 1) {
    throw new Error('Alpha value must be between 0 and 1');
  }

  // Clean and normalize color string
  const cleanColor = color.trim().toLowerCase();
  
  // Detect color format and parse
  if (cleanColor.startsWith('#')) {
    return applyAlphaToHex(cleanColor, alpha, outputFormat);
  } else if (cleanColor.startsWith('rgb(')) {
    return applyAlphaToRgb(cleanColor, alpha, outputFormat);
  } else if (cleanColor.startsWith('rgba(')) {
    return applyAlphaToRgba(cleanColor, alpha, outputFormat, preserveAlpha);
  } else if (cleanColor.startsWith('hsl(')) {
    return applyAlphaToHsl(cleanColor, alpha, outputFormat);
  } else if (cleanColor.startsWith('hsla(')) {
    return applyAlphaToHsla(cleanColor, alpha, outputFormat, preserveAlpha);
  } else {
    throw new Error(`Unsupported color format: ${color}`);
  }
}

/**
 * Apply alpha to hex color
 */
function applyAlphaToHex(hex: string, alpha: number, outputFormat?: ColorFormat): string {
  // Remove # and handle 3-digit hex
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }
  
  if (cleanHex.length !== 6) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  // Return based on output format
  if (outputFormat === 'hex') {
    // Convert alpha to hex and append
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return `#${cleanHex}${alphaHex}`;
  } else if (outputFormat === 'hsl' || outputFormat === 'hsla') {
    const { h, s, l } = rgbToHsl(r, g, b);
    return outputFormat === 'hsl' ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
  } else {
    // Default to rgba
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}

/**
 * Apply alpha to rgb color
 */
function applyAlphaToRgb(rgb: string, alpha: number, outputFormat?: ColorFormat): string {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) {
    throw new Error(`Invalid RGB color: ${rgb}`);
  }

  const [, r, g, b] = match.map(Number);

  if (outputFormat === 'hex') {
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${alphaHex}`;
  } else if (outputFormat === 'hsl' || outputFormat === 'hsla') {
    const { h, s, l } = rgbToHsl(r, g, b);
    return outputFormat === 'hsl' ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
  } else if (outputFormat === 'rgb') {
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Default to rgba
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}

/**
 * Apply alpha to rgba color
 */
function applyAlphaToRgba(rgba: string, alpha: number, outputFormat?: ColorFormat, preserveAlpha: boolean = false): string {
  const match = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  if (!match) {
    throw new Error(`Invalid RGBA color: ${rgba}`);
  }

  const [, r, g, b, existingAlpha] = match;
  const rNum = Number(r);
  const gNum = Number(g);
  const bNum = Number(b);
  const existingAlphaNum = Number(existingAlpha);

  // Calculate final alpha
  const finalAlpha = preserveAlpha ? existingAlphaNum * alpha : alpha;

  if (outputFormat === 'hex') {
    const alphaHex = Math.round(finalAlpha * 255).toString(16).padStart(2, '0');
    return `#${rNum.toString(16).padStart(2, '0')}${gNum.toString(16).padStart(2, '0')}${bNum.toString(16).padStart(2, '0')}${alphaHex}`;
  } else if (outputFormat === 'rgb') {
    return `rgb(${rNum}, ${gNum}, ${bNum})`;
  } else if (outputFormat === 'hsl' || outputFormat === 'hsla') {
    const { h, s, l } = rgbToHsl(rNum, gNum, bNum);
    return outputFormat === 'hsl' ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${finalAlpha})`;
  } else {
    // Default to rgba
    return `rgba(${rNum}, ${gNum}, ${bNum}, ${finalAlpha})`;
  }
}

/**
 * Apply alpha to hsl color
 */
function applyAlphaToHsl(hsl: string, alpha: number, outputFormat?: ColorFormat): string {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) {
    throw new Error(`Invalid HSL color: ${hsl}`);
  }

  const [, h, s, l] = match.map(Number);

  if (outputFormat === 'hex' || outputFormat === 'rgb' || outputFormat === 'rgba') {
    const { r, g, b } = hslToRgb(h, s, l);
    if (outputFormat === 'hex') {
      const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${alphaHex}`;
    } else if (outputFormat === 'rgb') {
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  } else if (outputFormat === 'hsl') {
    return `hsl(${h}, ${s}%, ${l}%)`;
  } else {
    // Default to hsla
    return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
  }
}

/**
 * Apply alpha to hsla color
 */
function applyAlphaToHsla(hsla: string, alpha: number, outputFormat?: ColorFormat, preserveAlpha: boolean = false): string {
  const match = hsla.match(/hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*([\d.]+)\)/);
  if (!match) {
    throw new Error(`Invalid HSLA color: ${hsla}`);
  }

  const [, h, s, l, existingAlpha] = match;
  const hNum = Number(h);
  const sNum = Number(s);
  const lNum = Number(l);
  const existingAlphaNum = Number(existingAlpha);

  // Calculate final alpha
  const finalAlpha = preserveAlpha ? existingAlphaNum * alpha : alpha;

  if (outputFormat === 'hex' || outputFormat === 'rgb' || outputFormat === 'rgba') {
    const { r, g, b } = hslToRgb(hNum, sNum, lNum);
    if (outputFormat === 'hex') {
      const alphaHex = Math.round(finalAlpha * 255).toString(16).padStart(2, '0');
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${alphaHex}`;
    } else if (outputFormat === 'rgb') {
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      return `rgba(${r}, ${g}, ${b}, ${finalAlpha})`;
    }
  } else if (outputFormat === 'hsl') {
    return `hsl(${hNum}, ${sNum}%, ${lNum}%)`;
  } else {
    // Default to hsla
    return `hsla(${hNum}, ${sNum}%, ${lNum}%, ${finalAlpha})`;
  }
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to RGB
 */
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Convenience function to quickly apply alpha to a color
 * @param color - Color string
 * @param alpha - Alpha value (0-1)
 * @returns Color with alpha applied
 */
export function withAlpha(color: string, alpha: number): string {
  return applyAlpha(color, { alpha });
}

/**
 * Create multiple alpha variants of a color
 * @param color - Base color string
 * @param alphas - Array of alpha values
 * @returns Object with alpha values as keys and colors as values
 */
export function createAlphaVariants(
  color: string,
  alphas: number[]
): Record<string, string> {
  const variants: Record<string, string> = {};
  
  alphas.forEach(alpha => {
    const key = `${Math.round(alpha * 100)}`;
    variants[key] = applyAlpha(color, { alpha });
  });

  return variants;
}

/**
 * Common alpha presets
 */
export const alphaPresets = {
  /** 5% opacity */
  subtle: 0.05,
  /** 10% opacity */
  muted: 0.1,
  /** 20% opacity */
  soft: 0.2,
  /** 40% opacity */
  medium: 0.4,
  /** 60% opacity */
  strong: 0.6,
  /** 80% opacity */
  intense: 0.8,
  /** 90% opacity */
  bold: 0.9,
} as const;