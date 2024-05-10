import React from 'react';

// Import types
import type { ThemePropertyNames } from 'src/objects/Theme';

export type Button_Types = "normal" | "rounded" | "full_rounded" | "non_padding";
export type Button_ColorTypes = ThemePropertyNames;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  extendClassName?: string;
  buttonType?: Button_Types;
  colorType?: Button_ColorTypes;
  hasFocusOutline?: boolean;
  // hasPadding?: boolean;
};