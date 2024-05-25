// Import objects
import { Person } from 'src/objects/Person';

// Import types
import type { Chaincode_Client } from 'src/apis/chaincode/types'

type BriefClientTableProps = {
  actions?: (data: Chaincode_Client, index: number) => JSX.Element;
  owners?: Array<Chaincode_Client> | null;
}

export default function BriefClientTable(props: BriefClientTableProps) {
  return (
    <table className="w-full">
      <thead className="border-b-2 [&>tr>td]:p-3">
        <tr>
          <td className="font-bold">ID</td>
          <td className="font-bold">Họ và tên</td>
          <td className="font-bold">Ngày sinh</td>
          {
            props.actions && <td className="font-bold">Thao tác</td>
          }
        </tr>
      </thead>
      <tbody className="[&>tr>td]:p-3">
        {
          props.owners?.map((owner, index) => (
            <tr key={owner._id}>
              <td>{owner._id}</td>
              <td>{Person.getFullName(owner)}</td>
              <td>{Person.getBirthDateString(owner)}</td>
              <td>
                {
                  props.actions && props.actions(owner, index)
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}