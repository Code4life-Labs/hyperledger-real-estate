import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import hooks
import { useDocumentOutline } from 'src/hooks/useDocumentOutlineState';

// Import layouts
import SideLayout from 'src/layouts/SideLayout';

// Import components
import Dropdown from '../dropdown/Dropdown';

// Import route names
import { RouteNames } from 'src/routenames';

// Import types
import type { CustomizedModalItemProps } from 'tunangn-react-modal';
import type { DocumentOutlineItemData } from 'src/apis/docs';

/**
 * __Composition__
 * 
 * Component renders a side menu or drawer.
 * @param props 
 * @returns 
 */
export default function ContentSide(props: CustomizedModalItemProps) {
  const { documentOutline, documentOutlineDispatcher } = useDocumentOutline();
  const navigate = useNavigate();

  React.useEffect(function() {
    documentOutlineDispatcher.getPlayerIDAsync();
  }, []);

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
            documentOutline.data.map(function(data, index) {
              return (
                <Dropdown<DocumentOutlineItemData>
                  key={index}
                  title={data.title}
                  items={data.items}
                  onSelectItem={function(item) { navigate(RouteNames.Document.Path + "/" + item.value) }}
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