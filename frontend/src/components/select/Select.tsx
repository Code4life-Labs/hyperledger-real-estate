import React from "react";

import {
  SelectProps,
  SelectOptionProps
} from "src/types/form";

import "./Select.style.css";

function SelectOption(props: SelectOptionProps) {
  let selectOptionClassName = props.className ? "py-2 px-3" + " " + props.className : "py-2 px-3";

  return (
    <option {...props} className={selectOptionClassName}>
      {props.children}
    </option>
  )
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function({
  label,
  labelInputClassName,
  ...props
  }: SelectProps,
  ref
) {
  let selectClassName = props.className ? "select" + " " + props.className : "select";
  selectClassName += " border rounded-lg";
  return (
    <label className={"flex flex-col w-full" + (labelInputClassName ? ` ${labelInputClassName}` : "")}>
      <div className='mb-1'>{label}</div>
      <select
        ref={ref}
        {...props}
        className={selectClassName}
      >
        {props.children}
      </select>
    </label>
  )
})

export { Select, SelectOption };