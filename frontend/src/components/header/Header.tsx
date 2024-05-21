import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSunny, IoMoon } from "react-icons/io5";

// Import objects
import { Theme } from 'src/objects/Theme';
import { Person } from 'src/objects/Person';

// Import hooks
import { useTheme } from 'src/hooks/useTheme';
import { useUser } from 'src/hooks/useUser';

// Import components
import Button from '../buttons/Button';

// Import route names
import { RouteNames } from 'src/routenames';

import { openNavSideMenu } from '../modal_items/utils';

// Import types
import type { HeaderProps } from './Header.props';

export default function Header(props: HeaderProps) {
  const { theme, themeDispatchers } = useTheme();
  const { user, userDispatchers } = useUser();
  const navigate = useNavigate();

  const NavItem_Elements = React.useMemo(() => {
    return Object.keys(RouteNames).map(function(key: string, index: number) {
      if(index === 0) return;

      return (
        <li key={key} className="mx-2 font-semibold hover:text-blue-500">
          {
            <Link
              to={(RouteNames[key as (keyof typeof RouteNames)] as any).Path}
            >
              {(RouteNames[key as (keyof typeof RouteNames)] as any).Name}
            </Link>
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
                <nav className="border-r me-2 px-3 hidden sm:block">
                  <ul className="flex flex-row">
                    {
                      NavItem_Elements
                    }
                  </ul>
                </nav>
                {
                  theme.currentScheme === "light"
                    ? (
                      <Button
                        buttonType="non_padding" colorType="background"
                        onClick={() => themeDispatchers.changeScheme(Theme.Schemes.dark)}
                        extendClassName="select-none"
                      >
                        <IoMoon className="text-2xl text-on-primary" />
                      </Button>
                    )
                    : (
                      <Button
                        buttonType="non_padding" colorType="background"
                        onClick={() => themeDispatchers.changeScheme(Theme.Schemes.light)}
                        extendClassName="select-none"
                      >
                        <IoSunny className="text-2xl text-on-primary" />
                      </Button>
                    )
                  }
                <div className="flex border-l ms-2 ps-3">
                  {
                    user.data
                      ? <p className="font-bold">{Person.getFullName(user.data)}</p>
                      : <p className="font-bold">Login</p>
                  }
                  <p
                    className="font-bold ms-5 cursor-pointer hover:text-outline"
                    onClick={() => {
                      navigate("/");
                      userDispatchers.reset();
                    }}  
                  >
                    Log out
                  </p>
                </div>
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