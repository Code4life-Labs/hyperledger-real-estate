import React from 'react';

// Import utils
// import { NumberUtils } from 'src/utils/number'

// Import components
import MDContent from '../md/MDContent';

// Import types
import type { DocumentContentProps } from './DocumentContent.props';

export default function DocumentContent(props: DocumentContentProps) {
  const [text, setText] = React.useState("");
  React.useEffect(function() {
    if(typeof props.name !== "string") return;
    fetch(`/docs/${props.name}.md`)
      .then(function(res) { return res.text() })
      .then(function(value) { setText(value) })
  }, [props.name]);

  if(typeof props.name !== "string") {
    return <p className="text-red-700">The property <span className="bg-outline rounded px-2 py-1">Name</span> must be a string!</p>;
  }

  return (
    <section className="w-full">
      <MDContent>{text}</MDContent>
    </section>
  )
}