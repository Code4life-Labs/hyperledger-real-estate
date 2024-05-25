import React from 'react';
import cn from 'classnames';

// Import objects
import { ThemePropertyNames } from 'src/objects/Theme';

// Import components
import Button from 'src/components/buttons/Button';

// Import types
import type { CustomizedModalItemProps } from 'tunangn-react-modal'

type SnackbarLayoutProps = {
  headerColor?: ThemePropertyNames;
  title: string | JSX.Element;
  content: string | JSX.Element;
  modalItemProps: CustomizedModalItemProps;
}

export default function SnackbarLayout(props: SnackbarLayoutProps) {
  const snackbarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(function() {
    if(snackbarRef.current?.animate)
      props.modalItemProps.utils.runAnimation!(snackbarRef.current);
  }, []);

  return (
    <div
      ref={snackbarRef}
      className="flex flex-row rounded-lg bg-background border-2"
      style={props.modalItemProps.utils.getContainerStyle({
        boxShadow: "none",
        maxWidth: "480px"
      })}
    >
      {/* Header */}
      <div
        className={cn("flex items-center justify-center rounded-l-lg p-3", {
          "bg-info [&>*]:text-on-info": props.headerColor === "info",
          "bg-warning [&>*]:text-on-warning": props.headerColor === "warning",
          "bg-error [&>*]:text-on-error": props.headerColor === "error",
          "bg-success [&>*]:text-on-success": props.headerColor === "success"
        })}
      >
        {
          typeof props.title === "string"
            ? <p className="font-bold text-center">{props.title}</p>
            : props.title
        }
      </div>

      {/* Content */}
      <div className="w-full p-3">
        {
          typeof props.content === "string"
            ? <p className="font-bold text-on-background">{props.content}</p>
            : props.content
        }
      </div>
      
      <div className="flex items-center justify-center p-3">
        <Button
          colorType="onPrimary"
          buttonType="normal"
          extendClassName="flex p-2 rounded"
          onClick={() => props.modalItemProps.close({ isAgree: false })}
        >
          <span className="material-symbols-outlined text-primary bg-on-primary">
            close
          </span>
        </Button>
      </div>
    </div>
  )
}
