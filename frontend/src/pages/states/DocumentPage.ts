import type { ChangeStateFnType } from "src/hooks/useStateWESSFns";
import type { DocumentOutlineData } from "src/apis/docs";

export type DropdownStates = ReturnType<typeof getInitialState>;

function getInitialState() {
  return {
    menu: [] as Array<DocumentOutlineData>,
    documentName: ""
  }
}

function getStateFns(changeState: ChangeStateFnType<DropdownStates>) {
  return {
    setMenu(data: Array<DocumentOutlineData>) {
      changeState("menu", function() {
        return data;
      });
    },

    setDocumentName(data: string) {
      changeState("documentName", function() {
        return data;
      });
    },
  }
}

export const DocumentPageLocalState = {
  getInitialState,
  getStateFns
}