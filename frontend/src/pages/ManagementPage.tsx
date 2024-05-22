import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

// Import apis
// import { Docs_API } from 'src/apis';

// Import hooks
import { useUserState } from 'src/hooks/useUser';
import { useMenuState } from 'src/hooks/useMenu';
import { useStateWESSFns } from 'src/hooks/useStateWESSFns';

// Import layouts
import TwoColumnLayout from 'src/layouts/TwoColumnLayout';

// Import components
import Dropdown from 'src/components/dropdown/Dropdown';

// Import route names
import { RouteNames } from 'src/routenames';

// Import assets

// Import state
import { ManagementPageLocalState as __LOCAL_STATE__ } from './states/ManagementPage';

// Import types
import type { OutlineItemData } from 'src/types/general';

function handleOnSelectItemDropdown(navigate: ReturnType<typeof useNavigate>, setRouteName: any, routeName?: string) {
  if(routeName !== "" && routeName !== undefined && routeName !== null)
    navigate(RouteNames.Management.Path + "/" + routeName);
  else
  navigate(RouteNames.Management.Path);
  setRouteName(routeName);
}

export default function ManagementPage() {
  const menuState = useMenuState();
  const user = useUserState();
  const [state, stateFns] = useStateWESSFns(__LOCAL_STATE__.getInitialState(menuState.outline), __LOCAL_STATE__.getStateFns);
  const navigate = useNavigate();

  return (
    <TwoColumnLayout
      leftSide={(
        <div className="h-[calc(100dvh-61px)] border-e p-4">
          {
            state.menu.map(function(data, index) {
              return (
                <Dropdown<OutlineItemData>
                  isOpen
                  key={index}
                  title={data.title}
                  items={data.items}
                  topValue={data.value}
                  selectedValue={state.selectedItemValue || ""}
                  onSelectItem={function(item) { handleOnSelectItemDropdown(navigate, stateFns.setSelectedItemValue, item.value) }}
                  onSelectTop={function() { handleOnSelectItemDropdown(navigate, stateFns.setSelectedItemValue) }}
                  renderItem={function(item) {
                    if((item as any).role === "admin" && user.role !== "admin") return null;
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
        <div className="h-[calc(100dvh-61px)] w-full overflow-y-auto">
          <div className="min-h-[calc(100dvh-61px)] max-w-[960px] mx-auto p-4">
            <Outlet />
          </div>
        </div>
      )}
    />
  )
}