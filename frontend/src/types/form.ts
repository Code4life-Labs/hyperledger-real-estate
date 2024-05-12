import {
  InputHTMLAttributes,
  HTMLInputTypeAttribute,
  SelectHTMLAttributes,
  OptionHTMLAttributes
} from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | (() => JSX.Element) | JSX.Element,
  labelInputClassName?: string,
  type?: HTMLInputTypeAttribute | 'chip' | 'radio-chip',
}

export interface InputChipProps extends InputProps {
  nonPadding?: boolean;
  shape?: 'circle' | 'rounded-4' | 'rounded-8' | 'rounded-12'
}

export interface SelectOptionProps extends OptionHTMLAttributes<HTMLOptionElement> {}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: JSX.Element | string,
  children: JSX.Element | Array<JSX.Element>
}

export interface FormElementValuesProps {
  elementName?: string,
  values?: string | number| Array<string | number>
}

export interface FormElementDataProps {
  elementType: "input" | "chip" | "select" | "group-input" | "group-chip-input" | "group-select"
}

export interface FormElementLabelDataProps {
  icon?: string,
  text?: string,
  sub?: string,
}

export interface InputDataProps extends FormElementDataProps {
  name: string,
  label?: FormElementLabelDataProps,
  type: HTMLInputTypeAttribute | 'chip' | 'radio-chip',
  props?: InputProps,
  labelInputClassName?: string
}

export interface GroupInputsDataProps extends FormElementDataProps {
  baseName: string,
  inputs: Array<ChipInputDataProps | TextInputDataProps>
}

export interface GroupChipInputsDataProps extends GroupInputsDataProps {
  groupChipLabel: string,
  inputs: Array<ChipInputDataProps>
}

export interface ChipInputDataProps extends InputDataProps {
  value: string,
  props?: InputChipProps
}

export interface TextInputDataProps extends InputDataProps {
  validate?: {
    pattern?: RegExp,
    errorMessage?: string
  },
}

export interface SelectOptionDataProps {
  label: string | JSX.Element,
  name: string,
  value: string,
  props?: OptionHTMLAttributes<HTMLOptionElement>
}

export interface SelectDataProps extends FormElementDataProps {
  label: FormElementLabelDataProps,
  name: string,
  options: Array<SelectOptionDataProps>,
  containerClassName?: string,
  props?: SelectHTMLAttributes<HTMLSelectElement>
}

export interface GroupSelectDataProps extends FormElementDataProps {
  baseName: string,
  selects: Array<SelectDataProps>
}

export interface FormPromptDataProps {
  [key: string]: TextInputDataProps | GroupInputsDataProps | ChipInputDataProps | SelectDataProps | GroupSelectDataProps
}