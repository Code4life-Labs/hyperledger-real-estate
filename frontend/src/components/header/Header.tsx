import React from 'react'
import { Link } from 'react-router-dom'
import { GrGithub } from "react-icons/gr";

// Import components
import Button from '../buttons/Button';

// Import route names
import { RouteNames } from 'src/routenames';

import { openNavSideMenu } from '../sides/utils';

// Import types
import type { HeaderProps } from './Header.props';

export default function Header(props: HeaderProps) {
  const NavItem_Elements = React.useMemo(() => {
    return Object.keys(RouteNames).map(function(key: string, index: number) {
      if(index === 0) return;

      return (
        <li key={key} className="mx-2 font-semibold hover:text-blue-500">
          {
            <Link to={RouteNames[key as (keyof typeof RouteNames)].Path}>{RouteNames[key as (keyof typeof RouteNames)].Name}</Link>
          }
        </li>
      )
    })
  }, []);

  return (
    <header className="border-b">
      <div className="flex justify-between p-4 m-auto w-full">
        {
          !props.leftSide
            ? (
              <div>
                <h1 className="font-semibold text-xl">
                  <Link to={"/"}>Real Estate Manager</Link>
                </h1>
              </div>
            )
            : typeof props.leftSide === "function"
              ? props.leftSide()
              : props.leftSide
        }
        {
          !props.rightSide
            ? (
              <div className="flex items-center">
                <nav className="border-r me-6 px-3 hidden sm:block">
                  <ul className="flex flex-row">
                    {
                      NavItem_Elements
                    }
                  </ul>
                </nav>
                <a className="hidden sm:block" href="https://github.com/NguyenAnhTuan1912/simple-api" target="_blank">
                  <GrGithub className="text-2xl cursor-pointer hover:bg-salte-50" />
                </a>
                <Button
                  colorType="onPrimary"
                  buttonType="normal"
                  extendClassName="flex p-2 me-3 rounded sm:hidden"
                  onClick={() => openNavSideMenu()}
                >
                  <span className="material-symbols-outlined text-primary bg-on-primary">more_vert</span>
                </Button>
              </div>
            )
            : typeof props.rightSide === "function"
              ? props.rightSide(NavItem_Elements)
              : props.rightSide
        }
      </div>
    </header>
  )
}