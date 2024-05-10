import React from 'react';

export type HeaderProps = {
  leftSide?: (() => JSX.Element) | JSX.Element;
  rightSide?: ((navItemElements: Array<JSX.Element | undefined>) => JSX.Element) | JSX.Element;
} & React.PropsWithChildren;