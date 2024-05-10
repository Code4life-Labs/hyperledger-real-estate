import React from 'react';

// Import types
import type { Components } from 'react-markdown';

type TextHeaderType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const getHeaderComponent = (function() {
  const $$$: {[key in TextHeaderType]: string} = {
    "h1": "font-bold text-4xl",
    "h2": "font-bold text-3xl",
    "h3": "font-bold text-2xl",
    "h4": "font-bold text-xl",
    "h5": "font-bold text-lg",
    "h6": "font-bold text-sm"
  }

  return function(textHeaderType: TextHeaderType): any {
    return function Header({ children }: { children: React.ReactNode | string }) {
      return React.createElement(textHeaderType, { children, className: $$$[textHeaderType] });
    }
  }
})();

export const MDXComponents: Components = {
  h1: getHeaderComponent("h1"),
  h2: getHeaderComponent("h2"),
  h3: getHeaderComponent("h3"),
  h4: getHeaderComponent("h4"),
  h5: getHeaderComponent("h5"),
  h6: getHeaderComponent("h6")
}