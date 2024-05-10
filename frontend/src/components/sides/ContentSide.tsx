import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import hooks
import { useMenuState } from 'src/hooks/useMenu';

// Import layouts
import SideLayout from 'src/layouts/SideLayout';

// Import components
import Dropdown from '../dropdown/Dropdown';

// Import route names
import { RouteNames } from 'src/routenames';

// Import types
import type { CustomizedModalItemProps } from 'tunangn-react-modal';
import type { OutlineItemData } from 'src/types/general';

/**
 * __Composition__
 * 
 * Component renders a side menu or drawer.
 * @param props 
 * @returns 
 */
export default function ContentSide(props: CustomizedModalItemProps) {
  const menuState = useMenuState();
  const navigate = useNavigate();

  return (
    <SideLayout
      titleElement={(
        <h1 className="font-bold text-2xl">
          Nội dung
        </h1>
      )}
      bodyElement={(
        <div className="p-4">
          {
            menuState.outline.map(function(data, index) {
              return (
                <Dropdown<OutlineItemData>
                  isOpen
                  key={index}
                  title={data.title}
                  items={data.items}
                  onSelectItem={function(item) { navigate(RouteNames.Management.Path + "/" + item.value) }}
                  renderItem={function(item) {
                    return (
                      <h1 className="font-bold">{item.title}</h1>
                    )
                  }}
                />
              )
            })
          }
        </div>
      )}
      modalItemProps={props}
    />
  )
}