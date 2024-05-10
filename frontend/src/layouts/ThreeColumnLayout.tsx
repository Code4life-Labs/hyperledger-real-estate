// import React from 'react'
import { Link } from "react-router-dom";

// Import components
import Header from "src/components/header/Header";
import Button from "src/components/buttons/Button";

import { openContentSideMenu } from "src/components/sides/utils";

type ThreeColumnLayoutProps = {
  leftSide: (() => JSX.Element) | JSX.Element;
  rightSide: (() => JSX.Element) | JSX.Element;
  mainSide: (() => JSX.Element) | JSX.Element;
}

const __classNames = {
  main: "w-full",
  left: "w-80 shrink-0 max-lg:hidden",
  right: "w-80 shrink-0 max-xl:hidden"
}

// Freeze and Seal


export default function ThreeColumnLayout(props: ThreeColumnLayoutProps) {
  return (
    <>
      <Header
        leftSide={(
          <div className="flex items-center">
            <Button
              colorType="onPrimary"
              buttonType="normal"
              extendClassName="flex p-2 me-3 rounded lg:hidden"
              onClick={() => openContentSideMenu()}  
            >
              <span className="material-symbols-outlined text-primary bg-on-primary">menu</span>
            </Button>
            <h1 className="font-semibold text-xl">
              <Link to={"/"}>Simple API</Link>
            </h1>
          </div>
        )}
      />
      <div className="flex w-full min-h-screen">
        {/* Left side */}
        {
          typeof props.leftSide === "function"
            ? <div className={__classNames.left}>{props.leftSide()}</div>
            : <div className={__classNames.left}>{props.leftSide}</div>
        }
        {/* Main side */}
        {
          typeof props.mainSide === "function"
            ? <div className={__classNames.main}>{props.mainSide()}</div>
            : <div className={__classNames.main}>{props.mainSide}</div>
        }
        {/* Right side */}
        {
          typeof props.rightSide === "function"
            ? <div className={__classNames.right}>{props.rightSide()}</div>
            : <div className={__classNames.right}>{props.rightSide}</div>
        }
      </div>
    </>
  )
}