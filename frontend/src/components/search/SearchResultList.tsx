import React from 'react';
import cn from "classnames";

// Import types
import { SearchResultListProps } from './Search.props';

/**
 * __Component này cần phải build trước__
 * 
 * Component này dùng để render ra danh sách kết quả tìm kiếm.
 * @param props Props của component.
 * @returns 
 */
export default function SearchResultList<T>(props: SearchResultListProps<T>) {
  return (
    <div
      className={cn("w-full z-10 absolute m-h-[240px] border-2 rounded-lg bg-background", {
        "bottom-[calc(100%+1rem)]": props.resultListPosition === "top",
        "top-[calc(100%+1rem)]": props.resultListPosition === "bottom",
        "hidden": props.results.length === 0
      })}
    >
      <ul className="w-full relative overflow-y-auto">
        {
          props.results.map((item, index) => (
            <li
              className="cursor-pointer"
              key={props.keyExtractor(item, index)}
            >
                {props.renderResultItem(item)}
            </li>
          ))
        }
      </ul>
    </div>
  )
}