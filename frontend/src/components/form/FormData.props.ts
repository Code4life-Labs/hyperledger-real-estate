// Import types
import type { FormPromptDataProps } from "src/types/form"

export type FormDataProps = {
  data: FormPromptDataProps;
  handleOnSubmit: (formData: any) => void;
  extendedElements?: JSX.Element;
  actionElements: JSX.Element;
}