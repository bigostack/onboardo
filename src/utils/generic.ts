import React from 'react'
export function generic_(props: any) {
  return React.createElement("path", { ...props })
}

export function GenericTemplate(props: any) {
  const { elem, children, onClick, ...rest } = props
  const childrenCompnents = children.map(i => React.createElement(i.elem, { key: i.d, ...i }))
  return React.createElement(elem, { ...rest, onClick, children: childrenCompnents })
}
