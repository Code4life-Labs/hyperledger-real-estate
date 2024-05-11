import type { ChangeStateFnType } from "src/hooks/useStateWESSFns";

export type DropdownStates = ReturnType<typeof getInitialState>;

function getInitialState() {
  return {
    isOpen: false,
    selectedItem: "" as string | number
  }
}

function getStateFns(changeState: ChangeStateFnType<DropdownStates>) {
  return {
    setIsOpen(data: boolean) {
      changeState("isOpen", function() {
        return data;
      });
    },

    toggleIsOpen() {
      changeState("isOpen", function(prevState) {
        return !prevState;
      });
    },
    
    updateSelectedItem(item: string | number) {
      changeState("selectedItem", function() {
        return item;
      });
    }
  }
}

export const DropdownLocalState = {
  getInitialState,
  getStateFns
}