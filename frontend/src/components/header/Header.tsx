import React from 'react';
import { Link } from 'react-router-dom';
import { IoSunny, IoMoon } from "react-icons/io5";

// Import themes
import { Theme } from 'src/objects/Theme';
import { NormalTheme } from 'src/themes/normal';

// Import objects
import { Person } from 'src/objects/Person';

// Import hooks
import { useUser } from 'src/hooks/useUser';

// Import components
import Button from '../buttons/Button';

// Import route names
import { RouteNames } from 'src/routenames';

import { openNavSideMenu } from '../sides/utils';

// Import types
import type { HeaderProps } from './Header.props';

export default function Header(props: HeaderProps) {
  const [theme, setTheme] = React.useState(Theme.Schemes.light);
  const { user, userDispatchers } = useUser();

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

  React.useEffect(function() {
    // Fetch User
    userDispatchers.getUserAsync("admin-01");

    // Install theme
    Theme.install(NormalTheme);
    
    // Enable theme
    NormalTheme.enable(Theme.Schemes.light);
  }, []);

  React.useEffect(function() {
    NormalTheme.enable(theme as any);
  }, [theme]);

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
                  theme === "light"
                    ? (
                      <Button
                        buttonType="non_padding" colorType="background"
                        onClick={() => setTheme(Theme.Schemes.dark)}
                        extendClassName="select-none"
                      >
                        <IoMoon className="text-2xl text-on-primary" />
                      </Button>
                    )
                    : (
                      <Button
                        buttonType="non_padding" colorType="background"
                        onClick={() => setTheme(Theme.Schemes.light)}
                        extendClassName="select-none"
                      >
                        <IoSunny className="text-2xl text-on-primary" />
                      </Button>
                    )
                  }
                <div className="border-l ms-2 ps-3">
                  {
                    user.data
                      ? <p className="font-bold">{Person.getFullName(user.data)}</p>
                      : <p className="font-bold">Login</p>
                  }
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