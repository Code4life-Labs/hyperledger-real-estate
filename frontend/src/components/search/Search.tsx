import React from 'react'

import Input from '../input/Input'

// Import types
import type { SearchProps } from './Search.props'

const search = (function() {
  let timeoutIndex: number;
  let timeout = 500;
  /**
   * @param text Text này chính là chữ mà người dùng nhập vào để tìm kiếm.
   * @param {() => void} callBack Callback này sẽ thực thi khi timeout thực thi
   */
  return function handleSearchInputTextChange(text: string, fn: () => void) {
    clearTimeout(timeoutIndex);
    if(!text) return;
    timeoutIndex = setTimeout(() => {
      fn();
    }, timeout);
  }
})();

/**
 * Đây là component dùng để tìm kiếm một cái gì đó như là địa điểm, blog hay user. `Search` là một
 * phần trong chức năng này, là một text input cho phép người dùng tìm kiếm. Và một component hiển thị
 * ra các kết quả mà người dùng này tìm kiếm. Khi ấn vào kết quả đó thì nó sẽ trả về kết quả. Thường
 * thì kết quả này sẽ.
 */

/**
 * __Component này cần phải build trước__
 * 
 * Component này dùng để tìm một cái gì đó, trong app của mình thì nó sẽ tìm place, blog hoặc user.
 * Nhận một số props bao gồm: `placeHolder` cho `TextInput`; `callBack` dùng để gọi khi trả về kết quả;
 * `apis` là một array chứa các api function, khi người dùng không nhập chữ nữa thì các api này sẽ được gọi.
 * @param props Thuộc tính của component.
 * @returns 
 */
export default function Search<T>(props: SearchProps<T>) {
  props = Object.assign({}, {
    placeHolder: '',
    apis: []
  }, props);

  const textInputRef = React.useRef(null);

  React.useEffect(() => {
    if(props.apiCallers.length === 0)
      console.warn("The `apiCallers` props need api functions to work correctly.");
  }, []);

  return (
    <div>
      <Input
        ref={textInputRef}
        placeholder={props.placeHolder}
        onChange={e => {
          const { target } = e;
          const text = target.value;
          search(text, () => {
            Promise.all(
              props.apiCallers.reduce(
                (acc, curr) => {
                  acc.push(curr(text));
                  return acc;
                }, [] as Array<Promise<any>>
              )
            ).then(values => {
              let flatValue = [];
              for(let value of values) flatValue.push(...value);
              props.onSearchResponse(text, flatValue);
            });
          });
          if(!text) props.onSearchResponse(text, []);
        }}
      />
    </div>
  )
}