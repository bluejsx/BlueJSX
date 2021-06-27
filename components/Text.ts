const Txt = ({children}: {
  children?: [string], 
  ref?: [object, string], 
  data?: string
}) => new Text(children[0]) as unknown as Blue.JSX.Element

export default Txt