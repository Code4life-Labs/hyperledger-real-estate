import React from 'react'

// Import components
import CloseButton from 'src/components/buttons/CloseButton';

// Import types
import type { CustomizedModalItemProps } from 'tunangn-react-modal';

type SideLayoutProps = {
  titleElement?: JSX.Element;
  headerElement?: ((modalItemProps: CustomizedModalItemProps) => JSX.Element) | JSX.Element;
  bodyElement: ((modalItemProps: CustomizedModalItemProps) => JSX.Element) | JSX.Element;
  modalItemProps: CustomizedModalItemProps;
}

export default function SideLayout(props: SideLayoutProps) {
  const sideMenuRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    props.modalItemProps.utils.runAnimation!(sideMenuRef.current!);
  }, []);

  return (
    <div
      ref={sideMenuRef}
      className="side-menu-container p-3"
      style={props.modalItemProps.utils.getContainerStyle({
        width: "100%",
        height: "100dvh",
        maxWidth: "475px",
        minWidth: "300px",
        background: "rgb(var(--color-background))",
        overflow: "auto"
      })}
    >
      {/* Header */}
      {
        !props.headerElement
          ? (
            <div className="flex justify-between items-center mb-3">
              {
                props.titleElement
              }
              <CloseButton
                isAgree={false}
                icon="close"
                close={props.modalItemProps.close}
              />
            </div>
          )
          : typeof props.headerElement === "function"
            ? props.headerElement(props.modalItemProps)
            : props.headerElement
      }

      {/* Content */}
      {
        typeof props.bodyElement === "function"
          ? props.bodyElement(props.modalItemProps)
          : props.bodyElement
      }
    </div>
  )
}