import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import apis
// import { Docs_API } from 'src/apis';

// Import hooks
import { useDocumentOutline } from 'src/hooks/useDocumentOutlineState';
import { useStateWESSFns } from 'src/hooks/useStateWESSFns';

// Import layouts
import ThreeColumnLayout from 'src/layouts/ThreeColumnLayout';

// Import components
import Dropdown from 'src/components/dropdown/Dropdown';
import DocumentContent from 'src/components/document_content/DocumentContent';

// Import route names
import { RouteNames } from 'src/routenames';

import { DocumentPageLocalState as __LOCALSTATE__ } from './states/DocumentPage';

// Import types
import type { DocumentOutlineItemData } from 'src/apis/docs';

function handleOnSelectItemDropdown(navigate: ReturnType<typeof useNavigate>, setDocumentName: any, documentName?: string) {
  if(documentName !== "" && documentName !== undefined && documentName !== null)
    navigate(RouteNames.Document.Path + "/" + documentName);
  else
  navigate(RouteNames.Document.Path);
  setDocumentName(documentName);
}

const __DEFAULT_DOCUMENT_NAME = "general";

export default function DocumentPage() {
  const { documentOutline, documentOutlineDispatcher } = useDocumentOutline();
  const [state, stateFns] = useStateWESSFns(__LOCALSTATE__.getInitialState(), __LOCALSTATE__.getStateFns);
  const navigate = useNavigate();

  React.useEffect(function() {
    documentOutlineDispatcher.getPlayerIDAsync();
  }, []);

  return (
    <ThreeColumnLayout
      leftSide={(
        <div className="p-4">
          {
            documentOutline.data.map(function(data, index) {
              return (
                <Dropdown<DocumentOutlineItemData>
                  key={index}
                  title={data.title}
                  items={data.items}
                  topValue={data.value}
                  selectedValue={state.documentName || __DEFAULT_DOCUMENT_NAME}
                  onSelectItem={function(item) { handleOnSelectItemDropdown(navigate, stateFns.setDocumentName, item.value) }}
                  onSelectTop={function() { handleOnSelectItemDropdown(navigate, stateFns.setDocumentName) }}
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
      mainSide={(
        <div className="max-w-[960px] mx-auto p-4">
          <DocumentContent name={state.documentName ? state.documentName : __DEFAULT_DOCUMENT_NAME} />
        </div>
      )}
      rightSide={(
        <div className="p-4">
          <h1>Tổng quan</h1>
        </div>
      )}
    />
  )
}