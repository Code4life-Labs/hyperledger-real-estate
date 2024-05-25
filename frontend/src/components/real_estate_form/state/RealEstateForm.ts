import type { ChangeStateFnType } from "src/hooks/useStateWESSFns";

// Import types
import type {
  Chaincode_RealEstate_Part,
  Chaincode_Client
} from "src/apis/chaincode/types";

export type DropdownStates = ReturnType<typeof getInitialState>;

function getInitialState(
  defaultParts: Array<Chaincode_RealEstate_Part> = [],
  defaultOwners: Array<Chaincode_Client> = []
) {
  return {
    parts: [...defaultParts],
    owners: [...defaultOwners]
  }
}

function getStateFns(changeState: ChangeStateFnType<DropdownStates>) {
  return {
    setParts(data: Array<Chaincode_RealEstate_Part>) {
      changeState("parts", function() {
        return data;
      })
    },

    addPart(data: Chaincode_RealEstate_Part) {
      changeState("parts", function(prevState) {
        return [...prevState, data];
      });
    },

    clearParts() {
      changeState("parts", function() {
        return [];
      });
    },

    removePartByIndex(index: number) {
      changeState("parts", function(prevState) {
        let newData = [...prevState];
        newData.splice(index, 1);
        return newData;
      });
    },

    setOwners(data: Array<Chaincode_Client>) {
      changeState("owners", function() {
        return data;
      });
    },

    addOwner(data: Chaincode_Client) {
      changeState("owners", function(prevState) {
        return [...prevState, data];
      });
    },

    clearOwners() {
      changeState("owners", function() {
        return [];
      });
    },

    removeOwnerById(id: string) {
      changeState("owners", function(prevState) {
        let index = prevState.findIndex(owner => owner._id === id);
        let newData = [...prevState];
        newData.splice(index, 1);
        return newData;
      });
    }
  }
}

export const RealEstateFormLocalState = {
  getInitialState,
  getStateFns
}