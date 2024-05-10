// Import types
import type { ChangeStateFnType } from "src/hooks/useStateWESSFns";
import type { OutlineData } from "src/types/general";

export type DropdownStates = ReturnType<typeof getInitialState>;

function getInitialState(menu: Array<OutlineData> = []) {
  return {
    menu: menu as Array<OutlineData>,
    selectedItemValue: ""
  }
}

function getStateFns(changeState: ChangeStateFnType<DropdownStates>) {
  return {
    setMenu(data: Array<OutlineData>) {
      changeState("menu", function() {
        return data;
      });
    },

    setSelectedItemValue(data: string) {
      changeState("selectedItemValue", function() {
        return data;
      });
    },
  }
}

export const ManagementPageLocalState = {
  getInitialState,
  getStateFns
}