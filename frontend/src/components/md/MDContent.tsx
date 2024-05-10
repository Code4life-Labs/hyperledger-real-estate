import React from 'react'
import { remark } from 'remark'
import ReactMarkdown from 'react-markdown';

// Import components
import { MDXComponents } from './MDComponents';

// Import types
import type { MDContentProps } from './MD.props';

export default function MDContent(props: MDContentProps) {
  const [content, setContent] = React.useState("");

  // Detect change of content
  React.useEffect(function() {
    remark()
    .process(props.children as string)
    .then(function(file) { setContent(String(file)) })
  }, [props.children]);

  if(typeof props.children !== "string") {
    return <p className="text-red-700">Content of <span className="bg-outline rounded px-2 py-1">Remark</span> must be a string!</p>
  }

  return (
    <ReactMarkdown components={MDXComponents}>{content}</ReactMarkdown>
  )
}