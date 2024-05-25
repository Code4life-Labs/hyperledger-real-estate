import React from 'react'

// Import objects
import { Form } from 'src/objects/Form';

// Import components
import Input from '../input/Input';
import { Select, SelectOption } from '../select/Select';

// Import types
import { FormDataProps } from './FormData.props';
import { 
  TextInputDataProps,
  GroupInputsDataProps,
  GroupChipInputsDataProps,
  SelectDataProps,
  GroupSelectDataProps
} from 'src/types/form';

function FormInput({ input }: { input: TextInputDataProps }) {
  return (
    <div className="mb-4">
      <Input
        {...input.props}
        label={
          input.label && (
            <>
              <span className='font-bold'>{input.label!.text}</span> {input.label!.sub}
            </>
          )
        }
        labelInputClassName={input.labelInputClassName}
        type={input.type}
        name={input.name}
      />
    </div>
  )
}

function FormGroupInput({ group }: { group: GroupInputsDataProps  }) {
  return (
    <div className="flex mb-4">
      {
        group.inputs.map(input => (
          <Input
            {...input.props}
            label={
              input.label && (
                <>
                  <span className='font-bold'>{input.label!.text}</span> {input.label!.sub}
                </>
              )
            }
            labelInputClassName={input.labelInputClassName}
            type={input.type}
            name={input.name}
            key={input.name}
          />
        ))
      }
    </div>
  )
}

function FormGroupChipInput({ group }: { group: GroupChipInputsDataProps }) {
  return (
    <div className="mb-4">
      <p className='font-bold mb-1'>{group.groupChipLabel}</p>
      <div className='chips-container'>
        {
          group.inputs.map(input => (
            <Input
              {...input.props}
              type={input.type}
              label={input.label && input.label.text && " " + input.label.text}
              labelInputClassName='me-1'
              name={input.name}
              key={input.value}
              value={input.value}
            />
          ))
        }
      </div>
    </div>
  )
}

function FormSelect({ select }: { select: SelectDataProps }) {
  let options = select.options;
  return (
    <div className="mb-4">
      <Select
        label={
          select.label && (
            <>
              <span className='font-bold'>{select.label!.text}</span> {select.label!.sub}
            </>
          )
        }
        name={select.name}
        {...select.props}
      >
        {
          options.map(option => (
            <SelectOption
              value={option.value}
              key={option.name}
            >
              {option.label}
            </SelectOption>
          ))
        }
      </Select>
    </div>
  )
}

function FormGroupSelect({ group }: { group: GroupSelectDataProps }) {
  let selects = group.selects;
  return (
    <div className="selects-container justify-between mb-4">
      {
        selects.map(select => {
          let options = select.options;
          let selectContainerClassName =
            select.containerClassName
            ? "select-container " + select.containerClassName
            : "select-container";

          return (
            <div
              className={selectContainerClassName}
              key={select.name}
            >
              <Select
                label={
                  select.label && (
                    <>
                      <span className='font-bold'>{select.label!.text}</span> {select.label!.sub}
                    </>
                  )
                }
                name={select.name}
                {...select.props}
              >
                {
                  options.map(option => (
                    <SelectOption
                      value={option.value}
                      key={option.name}
                    >
                      {option.label}
                    </SelectOption>
                  ))
                }
              </Select>
            </div>
          )
        })
      }
    </div>
  )
}

export default function FormData(props: FormDataProps) {
  const formPromptData = React.useMemo(() => props.data, []);
  const formPromptKeys = React.useMemo(() => Object.keys(formPromptData), [formPromptData])

  const formPromptRef = React.useRef<HTMLFormElement>(null);

  return (
    <form ref={formPromptRef}
      id="prompt-form"
      onSubmit={function(e) {
        e.preventDefault();

        let form = e.target as HTMLFormElement;
        let keys = Object.keys(form.elements).filter(key => {
          let isString = Number.isNaN(parseInt(key));
          return isString;
        });
        let formData: {[K: string]: any} = {};

        for(let key of keys) {
          let formEle: HTMLInputElement | RadioNodeList | HTMLSelectElement = form[key];
          let data = Form.getValuesOfFormElement(formEle);
          let promptKey = data.elementName;
          if(promptKey) formData[promptKey] = data.values;
        }

        props.handleOnSubmit(formData);
      }
    } 
      className='formprompt'
    >
      <div className='formprompt-content'>
        {
          Form.renderForm(
            formPromptData,
            function(input) {
              return <FormInput key={input.name} input={input} />  
            },
            function(group) {
              return <FormGroupInput  key={group.baseName} group={group} />
            },
            function(group) {
              return <FormGroupChipInput key={group.baseName} group={group} />
            },
            function(select) {
              return <FormSelect key={select.name} select={select} />             
            },
            function(group) {
              return <FormGroupSelect key={group.baseName} group={group} />
            },
            formPromptKeys
          )
        }
        {
          props.extendedElements
        }
      </div>
      <div className="flex justify-end w-full">
        {
          props.actionElements
        }
      </div>
    </form>
  )
}