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

export default function Select({
 label,
 ...props
}: SelectProps) {
  let selectClassName = props.className ? "select" + " " + props.className : "select";
  selectClassName += " border rounded-lg";
  return (
    <>
      {label && <p className='mb-1'>{label}</p>}
        <select
          {...props}
          className={selectClassName}
        >
          {props.children}
        </select>
    </>
  )
}

Select.Option = SelectOption;