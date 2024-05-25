import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Import hooks
import { useUser } from 'src/hooks/useUser';

// Import components
import Button from '../buttons/Button';
import FormData from '../form/FormData';

// Import types
import { FormPromptDataProps } from 'src/types/form';

// Import form content
import __UserFormContent__ from "src/assets/user_form.json";

// Import route names
import { RouteActions } from 'src/routenames';

export default function UserForm() {
  const { user, userDispatchers } = useUser();
  const { id, action } = useParams();
  const navigate = useNavigate();

  const __FormContentData__ = React.useMemo(function() {
    // Set default value to form content if action === "edit"
    (__UserFormContent__.ID_INPUT.props as any).defaultValue = user.current?.id; 
    (__UserFormContent__.GROUP_1.inputs[0].props as any).defaultValue = user.current?.lastName;
    (__UserFormContent__.GROUP_1.inputs[1].props as any).defaultValue = user.current?.firstName;
    (__UserFormContent__.BIRTHDATE_INPUT.props as any).defaultValue = user.current?.birthDate;

    return __UserFormContent__ as any as FormPromptDataProps;
  }, [user.current]);

  React.useEffect(function() {
    if((!user.current || user.current.id) && (action === RouteActions.edit)) {
      userDispatchers.getUserAsync(id as string);
    }

    return function() {
      userDispatchers.clearCurrentUser();
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
            ? "Thêm thông tin người dùng"
            : "Chỉnh sửa thông tin người dùng"
        }
      </h1>
      
      {/* Form */}
      <div className="mb-3">
        <FormData
          data={__FormContentData__}
          handleOnSubmit={function(formData) {
            if(action === RouteActions.add) {
              userDispatchers.createUserAsync(formData);
            } else if(action === RouteActions.edit) {
              formData._id = user.current?._id;
              userDispatchers.updateUserAsync(formData);
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