import React from 'react';

import Search from './Search';
import SearchResultList from './SearchResultList';

// Import types
import type { SearchBoxProps } from './Search.props';

/**
 * Hàm này dùng để tạo ra một component search có kết quả trả về, nhưng sẽ cần phải cấp cho nó apis.
 * Ngoài ra thì muốn build thì import Search với SearchResultList và apis để build riêng.
 * @param props
 * @returns 
 */
export default function SearchBox<T>(props: SearchBoxProps<T>) {
  const [result, setResult] = React.useState([]);

  props = React.useMemo(() => Object.assign({}, {
    placeHolder: "Search...",
    resultListPosition: "normal"
  }, props), []);

  if(!props.renderResultItem) {
    console.warn("Please add search result render item.");
    return null;
  }

  let hasResult = result.length >= 1

  const handleClearResult = () => {
    setResult([]);
  }

  return (
    <>
      {
        hasResult && (
          <div
            className="absolute top-0 left-0 z-10 w-screen h-screen bg-on-background-10"
            onClick={handleClearResult}
          />
        )
      }
      <div className="relative z-10 bg-background">
        <Search<T>
          apiCallers={props.apiCallers}
          placeHolder={props.placeHolder}
          onSearchResponse={(_, data) => {
            if(!data) return;
            setResult(data);
          }}
        />
        <SearchResultList<T>
          results={result}
          resultListPosition={props.resultListPosition}
          renderResultItem={props.renderResultItem}
          keyExtractor={props.keyExtractor}
        />
      </div>
    </>
  )
}