import React from 'react'

// Import hooks
import { useRealEstate } from 'src/hooks/useRealEstate';

// Import components
import DataTable from '../data_table/DataTable';
import Button from '../buttons/Button';

// Import types
import type { Chaincode_RealEstate } from 'src/apis/chaincode/types';

type RealEstateRowProps = {
  data: Chaincode_RealEstate;
  index: number;
}

function RealEstateRow(props: RealEstateRowProps) {
  return (
    <tr
      key={props.data.id}
    >
      <td>{props.index + 1}</td>
      <td><strong>{props.data.id}</strong></td>
      <td>{props.data.length}</td>
      <td>{props.data.width}</td>
      <td>
        <Button colorType="info" onClick={function() { alert(`You view ${props.data.id}`); }}>View</Button>
        <Button colorType="warning" onClick={function() { alert(`You edit ${props.data.id}`); }}>Edit</Button>
      </td>
    </tr>
  )
}

export default function RealEstate() {
  const { realEstate, realEstateDispatchers } = useRealEstate();
  
  React.useEffect(function() {
    if(realEstate.data.length === 0)
      realEstateDispatchers.getRealEstatesAsync();
  }, []);

  return (
    <div>
      <h1 className="font-bold uppercase text-2xl mb-3 text-center">Quản lý bất động sản</h1>
      <h2 className="font-bold text-lg">Danh sách bất động sản</h2>
      <DataTable<Chaincode_RealEstate>
        data={realEstate.data}
        renderHeader={() => (
          <tr>
            <td><strong>No</strong></td>
            <td>ID</td>
            <td>Chiều dài</td>
            <td>Chiều rộng</td>
            <td><strong>Actions</strong></td>
          </tr>
        )}
        renderRowData={function(item) {
          return (
            <RealEstateRow key={item.data.id} index={item.actualIndex} data={item.data} />
          )
        }}
      />
      <p>Thêm thông tin bất động sản mới <span className="font-bold text-lg cursor-pointer hover:text-info">tại đây</span></p>
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
