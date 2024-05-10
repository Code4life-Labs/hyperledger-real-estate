// Import from components
import Button from "src/components/buttons/Button";

export interface CloseButtonPropsType {
  isAgree: boolean;
  icon: string;
  close: (data: any) => any
}

/**
 * Use to render close button for modal item.
 * @param props 
 * @returns 
 */
export default function CloseButton(props: CloseButtonPropsType) {
  return (
    <Button
      colorType="onPrimary"
      buttonType="normal"
      extendClassName="flex p-2 me-3 rounded lg:hidden"
      onClick={() => props.close({ isAgree: props.isAgree ? true : false })}
    >
      <span className="material-symbols-outlined text-primary bg-on-primary">
        {props.icon}
      </span>
    </Button>
  );
}