import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Import hooks
import { useRealEstate } from 'src/hooks/useRealEstate'

// Import components
import Button from '../buttons/Button';
import FormData from '../form/FormData';

// Import types
import { FormPromptDataProps } from 'src/types/form';

// Import form content
import __RealEstateFormContent__ from "src/assets/real_estate_form.json";

// Import route names
import { RouteNames } from 'src/routenames';

export default function RealEstateForm() {
  const { realEstate, realEstateDispatchers } = useRealEstate();
  const { id, action } = useParams();
  const navigate = useNavigate();
  const __FormContentData__ = React.useMemo(function() {
    // Set default value to form content if action === "edit"
    if(RouteNames.Actions.edit === action) {
      (__RealEstateFormContent__.ID_INPUT.props as any).defaultValue = realEstate.current?.id; 
      (__RealEstateFormContent__.GROUP_1.inputs[0].props as any).defaultValue = realEstate.current?.length;
      (__RealEstateFormContent__.GROUP_1.inputs[1].props as any).defaultValue = realEstate.current?.width;
    }
    return __RealEstateFormContent__ as any as FormPromptDataProps;
  }, [realEstate.current?.id]);

  React.useEffect(function() {
    if(!realEstate.current || realEstate.current.id) {
      realEstateDispatchers.getRealEstateAsync(id as string);
    }
  }, [realEstate.current?.id]);

  if(!RouteNames.Actions[action as keyof typeof RouteNames.Actions]) {
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
          action === RouteNames.Actions.add
            ? "Thêm thông tin bất động sản"
            : "Chỉnh sửa thông tin bất động sản"
        }
      </h1>
      
      {/* Form */}
      <div className="mb-3">
        <FormData
          data={__FormContentData__}
          handleOnSubmit={function(formData) {
            console.log("Form data: ", formData);
          }}
          actionElements={[
            <Button
              key="submit"
              colorType="info"
              extendClassName="flex items-center justify-center hover:bg-outline/30 me-3"
              type="submit"
            >
              Áp dụng
            </Button>,
            <Button
              key="cancel"
              colorType="error"
              onClick={function() { navigate(-1); }}
              extendClassName="flex items-center justify-center hover:bg-outline/30"
              type="button"
            >
              Hủy
            </Button>
          ]}
        />
      </div>
    </div>
  )
}