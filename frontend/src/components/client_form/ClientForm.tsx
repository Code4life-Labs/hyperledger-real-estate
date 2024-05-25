import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Import hooks
import { useClient } from 'src/hooks/useClient';

// Import components
import Button from '../buttons/Button';
import FormData from '../form/FormData';

// Import types
import { FormPromptDataProps } from 'src/types/form';

// Import form content
import __ClientFormContent__ from "src/assets/client_form.json";

// Import route names
import { RouteActions } from 'src/routenames';

export default function ClientForm() {
  const { client, clientDispatchers } = useClient();
  const { id, action } = useParams();
  const navigate = useNavigate();

  const __FormContentData__ = React.useMemo(function() {
    // Set default value to form content if action === "edit"
    (__ClientFormContent__.ID_INPUT.props as any).defaultValue = client.current?.id; 
    (__ClientFormContent__.GROUP_1.inputs[0].props as any).defaultValue = client.current?.lastName;
    (__ClientFormContent__.GROUP_1.inputs[1].props as any).defaultValue = client.current?.firstName;
    (__ClientFormContent__.BIRTHDATE_INPUT.props as any).defaultValue = client.current?.birthDate;

    return __ClientFormContent__ as any as FormPromptDataProps;
  }, [client.current?.id]);

  React.useEffect(function() {
    if(!client.current || client.current.id) {
      clientDispatchers.getClientAsync(id as string);
    }

    return function() {
      clientDispatchers.clearCurrentUser();
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
            ? "Thêm thông tin khách hàng"
            : "Chỉnh sửa thông tin khách hàng"
        }
      </h1>
      
      {/* Form */}
      <div className="mb-3">
        <FormData
          data={__FormContentData__}
          handleOnSubmit={function(formData) {
            if(action === RouteActions.add) {
              clientDispatchers.createClientAsync(formData);
            } else if(action === RouteActions.edit) {
              clientDispatchers.updateClientAsync(formData);
            }
          }}
          actionElements={
            <>
              <Button
                key="submit"
                colorType="info"
                extendClassName="flex items-center justify-center hover:bg-outline/30 me-3"
                type="submit"
              >
                Áp dụng
              </Button>
              <Button
                key="cancel"
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