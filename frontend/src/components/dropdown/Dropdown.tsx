import React from 'react';
import cn from 'classnames';

// Import hooks
import { useStateWESSFns } from 'src/hooks/useStateWESSFns';

// Import components
import Button from '../buttons/Button';

// Import types
import type { DropdownProps } from './Dropdown.props'

import { DropdownLocalState as __LOCALSTATE__ } from './state/Dropdown';

export default function Dropdown<N extends { value: string | number }>(props: DropdownProps<N>) {
  const [state, stateFns] = useStateWESSFns(__LOCALSTATE__.getInitialState(), __LOCALSTATE__.getStateFns);

  const __Items = React.useMemo(function() {
    return props.items.map(function(item, index) {
      return (
        <li key={index}>
          <Button
            buttonType="normal"
            colorType="background"
            extendClassName="flex justify-between w-full px-3 py-2 rounded-lg hover:bg-primary/10"
            hasFocusOutline={false}  
            onClick={() => props.onSelectItem(item)}
          >
            {props.renderItem(item)}
          </Button>
        </li>
      )
    })
  }, []);

  React.useEffect(function() {
    if(props.topValue) {
      stateFns.updateSelectedItem(props.topValue);
      stateFns.setIsOpen(true);
    }
  }, []);

  React.useEffect(function() {
    stateFns.setIsOpen(Boolean(props.isOpen));
  }, [props.isOpen]);

  return (
    <section>
      <Button
        colorType="background"
        extendClassName="flex justify-between w-full hover:bg-primary/10"
        hasFocusOutline={false} 
        onClick={function() {
          if(props.topValue && props.onSelectTop) {
            stateFns.updateSelectedItem(props.topValue);
            props.onSelectTop(props.topValue);
          }
          stateFns.toggleIsOpen();
        }}
      >
        <h1 className="font-bold uppercase text-lg">{props.title}</h1>
        {/* <span className="material-symbols-outlined">{state.isOpen ? "expand_more" : "chevron_right"}</span> */}
        <span
          className={
            cn("material-symbols-outlined", { "rotate-90": state.isOpen, "": !state.isOpen })
          }
        >
          chevron_right
        </span>
      </Button>
      {
        state.isOpen && (
          <ul>
            {
              props.items.map(function(item, index) {
                return (
                  <li key={index}>
                    <Button
                      buttonType="normal"
                      colorType="background"
                      extendClassName={
                        cn("flex justify-between w-full px-3 py-2 rounded-lg hover:bg-outline/30", {
                          "": state.selectedItem !== item.value,
                          "bg-outline/30": state.selectedItem === item.value
                        })
                      }
                      hasFocusOutline={false}  
                      onClick={function() {
                        props.onSelectItem(item);
                        stateFns.updateSelectedItem(item.value);
                      }}
                    >
                      {props.renderItem(item)}
                    </Button>
                  </li>
                )
              })
            }
          </ul>
        )
      }
    </section>
  )
}