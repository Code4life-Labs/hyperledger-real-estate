// Import types
import type { Chaincode_RealEstate_Part } from 'src/apis/chaincode/types'

type RealEstatePartTableProps = {
  actions?: (data: Chaincode_RealEstate_Part, index: number) => JSX.Element;
  parts?: Array<Chaincode_RealEstate_Part> | null;
}

export default function RealEstatePartTable(props: RealEstatePartTableProps) {
  return (
    <table className="w-full">
      <thead className="border-b-2 [&>tr>td]:p-3">
        <tr>
          <td className="font-bold">Mục đích sử dụng</td>
          <td className="font-bold">Diện tích</td>
          {
            props.actions && <td className="font-bold">Thao tác</td>
          }
        </tr>
      </thead>
      <tbody className="[&>tr>td]:p-3">
        {
          props.parts?.map((part, index) => (
            <tr key={index}>
              <td>{part.useFor}</td>
              <td><strong>{part.area!}</strong> m<sup>2</sup></td>
              <td>
                {
                  props.actions && props.actions(part, index)
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}