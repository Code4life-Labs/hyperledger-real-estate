import React from 'react';

// Import hooks
import { useUserActions } from 'src/hooks/useUser';

// Import comopnents
import Button from "src/components/buttons/Button";
import Input from "src/components/input/Input";
import FormData from "src/components/form/FormData";

// Import types
import { FormPromptDataProps } from 'src/types/form';

// Import form content
import __LoginFormContent__ from "src/assets/login_form.json";

export default function LoginPage() {
  const userDispatchers = useUserActions();
  const __FormContentData__ = React.useMemo(function() {
    return __LoginFormContent__ as any as FormPromptDataProps;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-center font-bold text-2xl">Đăng nhập</h1>
      <p>Quản lý bất động sản</p>
      <FormData
        data={__FormContentData__}
        handleOnSubmit={function(formData) {
          const { username, password } = formData;
          console.log(username, password);
        }}
        actionElements={[
          <Button
            key="submit"
            extendClassName="flex items-center w-full justify-center"
            type="submit"
          >
            Đăng nhập
          </Button>
        ]}
      />
    </div>
  )
}