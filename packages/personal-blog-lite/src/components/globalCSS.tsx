import { createGlobalStyle } from "styled-components"

const GlobalCSS = createGlobalStyle`
.shortcut-btn {
  position: relative;
  top: -3px;
  padding: 6px 9px;
  margin: 0 5px;
  background: #EFF0F2;
  border-radius: 4px;
  border-top: 1px solid whitesmoke;
  box-shadow: 0 0 25px #e8e8e8 inset, 0 1px 0 #c3c3c3, 0 2px 0 #c9c9c9, 0 2px 3px #333;
  color: #888;
  text-shadow: 0 1px 0 whitesmoke;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  display: inline-block;
  vertical-align: middle;
}
`

export default GlobalCSS
