import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Import APIs
import { ChainCodeAPI } from 'src/apis';

// Import objects
import { Form } from 'src/objects/Form';
import { Person } from 'src/objects/Person';

// Import hooks
import { useRealEstate } from 'src/hooks/useRealEstate';
import { useStateWESSFns } from 'src/hooks/useStateWESSFns';

// Import components
import SearchBox from '../search/SearchBox';
import Button from '../buttons/Button';
import Input from '../input/Input';
import { Select, SelectOption } from '../select/Select';
import FormData from '../form/FormData';
import BriefClientTable from '../tables/BriefClientTable';
import RealEstatePartTable from '../tables/RealEstatePartTable';
import { openSnackbar } from '../modal_items/utils';

// Import local state
import { RealEstateFormLocalState as __LOCAL_STATE__ } from './state/RealEstateForm';

// Import types
import type { FormPromptDataProps } from 'src/types/form';
import type { Chaincode_Client, Chaincode_RealEstate_Part, Chaincode_RealEstate_ResponsedData } from 'src/apis/chaincode/types';

// Import form content
import __RealEstateFormContent__ from "src/assets/real_estate_form.json";
import __RealEstatePartUseForData__ from "src/assets/real_estate_part_usefors.json";

// Import route names
import { RouteActions } from 'src/routenames';

type RealEstateForm_Elements = {
  realEstatePartAreaInput: HTMLInputElement | null;
  realEstatePartUseForSelect: HTMLSelectElement | null;
}

export default function RealEstateForm() {
  const { realEstate, realEstateDispatchers } = useRealEstate();
  const [state, stateFns] = useStateWESSFns(
    __LOCAL_STATE__.getInitialState(realEstate.current?.parts, realEstate.current?.owners),
    __LOCAL_STATE__.getStateFns
  );
  const { id, action } = useParams();
  const navigate = useNavigate();
  const elementRefs = React.useRef<RealEstateForm_Elements>({
    realEstatePartAreaInput: null,
    realEstatePartUseForSelect: null
  });

  const __FormContentData__ = React.useMemo(function() {
    // Set default value to form content if action === "edit"
    (__RealEstateFormContent__.ID_INPUT.props as any).defaultValue = realEstate.current?.id;
    (__RealEstateFormContent__.AREA_INPUT.props as any).defaultValue = realEstate.current?.area;
    (__RealEstateFormContent__.GROUP_1.inputs[0].props as any).defaultValue = realEstate.current?.no;
    (__RealEstateFormContent__.GROUP_1.inputs[1].props as any).defaultValue = realEstate.current?.localNo;

    if(action === RouteActions.edit)
      (__RealEstateFormContent__.ID_INPUT.props as any).disabled = true
    
    return __RealEstateFormContent__ as any as FormPromptDataProps;
  }, [realEstate.current]);

  React.useEffect(function() {
    if(realEstate.current) {
      stateFns.setParts(realEstate.current.parts);
      stateFns.setOwners(realEstate.current.owners);
    }
  }, [realEstate.current]);

  console.log("Parts: ", state.parts);
  console.log("Owners: ", state.owners);

  React.useEffect(function() {
    if((!realEstate.current || realEstate.current._id) && (action === RouteActions.edit)) {
      realEstateDispatchers.getRealEstateAsync(id as string);
    }

    return function() {
      realEstateDispatchers.clearCurrentRealEstate();
    }
  }, []);

  if(!RouteActions[action as keyof typeof RouteActions]) {
    return (
      <h1 className="font-bold uppercase text-2xl mb-3 text-center text-error">
        {`Hành động ${action} chưa được hỗ trợ :(`}
      </h1>
    )
  }

  return (
    <div>
      {/* Sub Header */}
      <div className="flex items-center">
        <Button
          buttonType="non_padding"
          colorType="background"
          onClick={function() { navigate(-1); }}
          extendClassName="flex items-center justify-center hover:bg-outline/30"
        >
          <span
            className="material-symbols-outlined text-primary text-3xl"
          >keyboard_arrow_left</span>
        </Button>
        <h2 className="font-bold ms-2">Trở về</h2>
      </div>
      <h1 className="font-bold uppercase text-2xl mb-3 text-center">
        {
          action === RouteActions.add
            ? "Thêm thông tin bất động sản"
            : "Chỉnh sửa thông tin bất động sản"
        }
      </h1>
      
      {/* Form */}
      <div className="mb-3">
        <FormData
          data={__FormContentData__}
          handleOnSubmit={function(formData) {
            let data: Chaincode_RealEstate_ResponsedData = {
              ...formData,
              parts: state.parts,
              ownerIds: state.owners.map(owner => owner._id),
              imgs: []
            };

            // If data.area is empty
            let totalAreaInParts = data.parts.reduce((total, part) => total + part.area, 0);
            data.area = totalAreaInParts;

            // If totalAreaInParts > data.area
            if(data.area === 0) {
              openSnackbar({
                headerColor: "warning",
                content: "Thông tin không hợp lệ: diện tích đất bằng 0."
              })
              return;
            }

            if(action === RouteActions.add) {
              realEstateDispatchers.createRealEstateAsyncThunk(data);
            } else if(action === RouteActions.edit) {
              realEstateDispatchers.updateRealEstateAsyncThunk(data);
            }
          }}
          extendedElements={
            <>
              <hr className="border-1 my-2" />
              <h2 className="font-bold text-lg">Thành phần</h2>
              <div className="mb-4"> 
                <div className="flex items-center mb-4"> 
                  <Input
                    ref={ref => elementRefs.current.realEstatePartAreaInput = ref}
                    label={<span className="font-bold">Diên tích</span>}
                    labelInputClassName="me-2"
                  />
                  <Select
                    ref={ref => elementRefs.current.realEstatePartUseForSelect = ref}
                    labelInputClassName="me-2"
                    className="outline outline-gray-200"
                    label={<span className="font-bold">Mục đích sử dụng</span>}
                    name="useFor"
                  >
                    {
                      __RealEstatePartUseForData__.data.map(usefor => (
                        <SelectOption key={usefor.value} value={usefor.value}>{usefor.text}</SelectOption>
                      ))
                    }
                  </Select>
                </div>
                <Button
                  colorType="success"
                  extendClassName="flex items-center justify-center hover:bg-outline/30 me-3"
                  type="button"
                  onClick={function() {
                    const selectedValue = elementRefs.current.realEstatePartUseForSelect
                      ? Form.getValuesOfFormElement(elementRefs.current.realEstatePartUseForSelect).values as string
                      : "";
                    const part: Chaincode_RealEstate_Part = {
                      area: parseInt(elementRefs.current.realEstatePartAreaInput?.value || "0"),
                      useFor: selectedValue
                    }

                    if(elementRefs.current.realEstatePartAreaInput)
                      elementRefs.current.realEstatePartAreaInput.value = "";

                    stateFns.addPart(part);
                  }}
                >
                  Thêm
                </Button>
                <RealEstatePartTable
                  parts={state.parts}
                  actions={function(_, index) {
                    return (
                      <Button
                        colorType="background"
                        extendClassName="flex border border-error"
                        type="button"
                        onClick={function() { stateFns.removePartByIndex(index) }}
                      >
                        <span className="text-error">Xóa</span>
                      </Button>
                    )
                  }}
                />
              </div>

              <hr className="border-1 my-2" />
              <h2 className="font-bold text-lg">Các chủ sở hữu</h2>
              <div className="mb-4">
                <SearchBox<Chaincode_Client>
                  placeHolder="Tìm thông tin chủ sở hữu"
                  apiCallers={[
                    function(text) { return ChainCodeAPI.Client.getMultipleAsync(10, 0, text) }
                  ]}
                  renderResultItem={(item) => {
                    return (
                      <Button
                        colorType="background"
                        extendClassName="flex justify-start w-full"
                        type="button"
                        onClick={function() { stateFns.addOwner(item); }}
                      >
                        {
                          Person.getFullName(item)
                        }
                      </Button>
                    )
                  }}
                  resultListPosition="top"
                  keyExtractor={(item) => item._id}
                />
                <BriefClientTable
                  owners={state.owners}
                  actions={function(owner) {
                    return (
                      <Button
                        colorType="background"
                        extendClassName="flex border border-error"
                        type="button"
                        onClick={function() { stateFns.removeOwnerById(owner._id) }}
                      >
                        <span className="text-error">Xóa</span>
                      </Button>
                    )
                  }}
                />
              </div>
            </>
          }
          actionElements={
            <>
              <Button
                colorType="info"
                extendClassName="flex items-center justify-center hover:bg-outline/30 me-3"
                type="submit"
              >
                Áp dụng
              </Button>
              <Button
                colorType="error"
                onClick={function() { navigate(-1); }}
                extendClassName="flex items-center justify-center hover:bg-outline/30"
                type="button"
              >
                Hủy
              </Button>
            </>
          }
        />
      </div>
    </div>
  )
}