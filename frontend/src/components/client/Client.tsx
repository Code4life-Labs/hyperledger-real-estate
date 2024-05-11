import React from 'react'

// Import hooks
import { useClient } from 'src/hooks/useClient';

// Import types
import { Person } from 'src/objects/Person';

// Import components
import DataTable from '../data_table/DataTable';
import Button from '../buttons/Button';

// Import types
import type { Chaincode_Client } from 'src/apis/chaincode/types';

type ClientRowProps = {
  data: Chaincode_Client;
  index: number;
}

function ClientRow(props: ClientRowProps) {
  return (
    <tr
      key={props.data.id}
    >
      <td>{props.index + 1}</td>
      <td><strong>{props.data.id}</strong></td>
      <td>{Person.getFullName(props.data)}</td>
      <td>{Person.getBirthDateString(props.data)}</td>
      <td>
        <Button colorType="info" onClick={function() { alert(`You view ${props.data.id}`); }}>View</Button>
        <Button colorType="warning" onClick={function() { alert(`You edit ${props.data.id}`); }}>Edit</Button>
      </td>
    </tr>
  )
}

export default function Client() {
  const { client, clientDispatchers } = useClient();
  
  React.useEffect(function() {
    if(client.data.length === 0)
      clientDispatchers.getClientsAsync();
  }, []);

  return (
    <div>
      <h1 className="font-bold uppercase text-2xl mb-3 text-center">Quản lý khách hàng</h1>
      <h2 className="font-bold text-lg">Danh sách khách hàng</h2>
      <DataTable<Chaincode_Client>
        data={client.data}
        renderHeader={() => (
          <tr>
            <td><strong>No</strong></td>
            <td>ID</td>
            <td>Họ và tên</td>
            <td>Ngày sinh</td>
            <td><strong>Actions</strong></td>
          </tr>
        )}
        renderRowData={function(item) {
          return (
            <ClientRow key={item.data.id} index={item.actualIndex} data={item.data} />
          )
        }}
      />
      <p>Thêm thông tin khách hàng mới <span className="font-bold text-lg cursor-pointer hover:text-info">tại đây</span></p>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Lưu ý</h2>
        <ol className="list-decimal list-inside ms-3">
          <li>Chỉ được chỉnh sửa thông tin về bất động sản khi đã có sự giao dịch hợp pháp từ khách hàng.</li>
          <li>
            Chỉ được thêm thông tin bất động sản mới khi có sự chấp nhận, công nhận từ đôi bên. Nếu bạn thấy thông tin của
            bất động sản này có điều gì bất thường thì thông báo lên bộ phần được ủy quyền cao hơn.
          </li>
        </ol>
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-lg">Sử dụng</h2>
        <p>
          Ở mỗi hàng trên bảng đều có ô <strong>Actions</strong>, trong ô này sẽ có một số nút bấm cho phép bạn có thể
          làm một số hành động thể thao tác với dữ liệu của bất động sản.
        </p>
        <ol className="list-decimal list-inside ms-3">
          <li><strong>View</strong> xem chi tiết thông tin của bất động sản</li>
          <li><strong>Edit</strong> chỉnh sửa thông tin bất động sản.</li>
        </ol>
      </div>
    </div>
  )
}