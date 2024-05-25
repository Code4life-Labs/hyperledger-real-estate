import React from 'react';
import { Link } from 'react-router-dom';

// Import from layouts
import SideLayout from 'src/layouts/SideLayout';

// Import route names
import { RouteNames } from 'src/routenames';

// Import types
import type { CustomizedModalItemProps } from 'tunangn-react-modal';

/**
 * __Composition__
 * 
 * Component renders a side menu or drawer.
 * @param props 
 * @returns 
 */
export default function NavSide(props: CustomizedModalItemProps) {
  const NavItem_Elements = React.useMemo(() => {
    return Object.keys(RouteNames).map(function(key: string, index: number) {
      if(index === 0) return;

      return (
        <li key={key} className="text-xl my-3 mx-2 font-semibold hover:text-blue-500">
          {
            <Link
              onClick={() => props.close({ isAgree: true })}
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
    <SideLayout
      titleElement={(
        <h1 className="font-bold text-2xl">
          Điều hướng tới
        </h1>
      )}
      bodyElement={(
        <div>
          <ul>
            {
              NavItem_Elements
            }
          </ul>
        </div>
      )}
      modalItemProps={props}
    />
  )
}