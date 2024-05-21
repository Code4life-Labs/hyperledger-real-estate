import React from 'react';

// Import layouts
import SnackbarLayout from 'src/layouts/SnackbarLayout';

// Import types
import type { CustomizedModalItemProps } from 'tunangn-react-modal';
import type { ThemePropertyNames } from 'src/objects/Theme';

export type SnackbarData = {
  content: string | JSX.Element;
  headerColor?: ThemePropertyNames;
}

export default function Snackbar(props: CustomizedModalItemProps) {
  const data = props.item.getData<SnackbarData>();
  let title: string | JSX.Element = "Unknown";

  switch(data.headerColor) {
    case "info": {
      title = <span className="material-symbols-outlined">help</span>;
      break;
    }
    case "success": {
      title = <span className="material-symbols-outlined">done</span>;
      break;
    }
    case "warning": {
      title = <span className="material-symbols-outlined">warning</span>;
      break;
    }
    case "error": {
      title = <span className="material-symbols-outlined">error</span>;
      break;
    }
  }

  return (
    <SnackbarLayout
      headerColor={data.headerColor || "info"}
      title={title}
      content={data.content}
      modalItemProps={props}
    />
  )
}