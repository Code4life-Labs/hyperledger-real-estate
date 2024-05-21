import React from 'react';

// Import hooks
import { useUser } from 'src/hooks/useUser';

// Import comopnents
import LoadingIndicator from 'src/components/loading_indicator/LoadingIndicator';
import Button from "src/components/buttons/Button";
import FormData from "src/components/form/FormData";

// Import types
import { FormPromptDataProps } from 'src/types/form';

// Import form content
import __LoginFormContent__ from "src/assets/login_form.json";

export default function LoginPage() {
  const { user, userDispatchers } = useUser();
  const __FormContentData__ = React.useMemo(function() {
    return __LoginFormContent__ as any as FormPromptDataProps;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-center font-bold text-2xl">Đăng nhập</h1>
      <p className="mb-3">Quản lý bất động sản</p>
      <FormData
        data={__FormContentData__}
        handleOnSubmit={function(formData) {
          const { username, password } = formData;
          userDispatchers.getUserAsync(username, password);
        }}
        actionElements={[
          <Button
            key="submit"
            extendClassName="flex items-center justify-center w-full"
            type="submit"
            disabled={user.isGettingData}
          >
            {
              user.isGettingData
                ? <LoadingIndicator text={<p className="text-on-primary ms-3">Vui lòng chờ...</p>} />
                : "Đăng nhập"
            }
          </Button>
        ]}
      />
    </div>
  )
}