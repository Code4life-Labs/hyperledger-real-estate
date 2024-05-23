import React from 'react'
import { useNavigate } from 'react-router-dom';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import hooks
import { useRealEstate } from 'src/hooks/useRealEstate';

// Import components
import DataTable from '../data_table/DataTable';
import Button from '../buttons/Button';

// Import types
import type { Chaincode_RealEstate_ResponsedData } from 'src/apis/chaincode/types';
import type { NavigateFunction } from 'react-router-dom';

// Import route names
import { RouteNames, RouteActions } from 'src/routenames';

type RealEstateRowProps = {
  data: Chaincode_RealEstate_ResponsedData;
  index: number;
  navigate: NavigateFunction;
}

function RealEstateRow(props: RealEstateRowProps) {
  const routeAction = "/" + RouteActions.edit;
  
  return (
    <tr
      key={props.data.id}
    >
      <td>{props.index + 1}</td>
      <td><strong>{props.data.id}</strong></td>
      <td>{props.data.area}</td>
      <td>
        <Button colorType="info" onClick={function() { props.navigate(props.data.id) }}>View</Button>
        <Button colorType="warning" onClick={function() { props.navigate(props.data.id + routeAction) }}>Edit</Button>
      </td>
    </tr>
  )
}

export default function RealEstate() {
  const { realEstate, realEstateDispatchers } = useRealEstate();
  const navigate = useNavigate();

  React.useEffect(function() {
    if(realEstate.data.length === 0)
      realEstateDispatchers.getRealEstatesAsync();
  }, []);

  return (
    <div>
      <h1 className="font-bold uppercase text-2xl mb-3 text-center">Quản lý bất động sản</h1>
      <h2 className="font-bold text-lg">Danh sách bất động sản</h2>
      <DataTable<Chaincode_RealEstate_ResponsedData>
        data={realEstate.data}
        renderHeader={() => (
          <tr>
            <td><strong>No</strong></td>
            <td>ID</td>
            <td>Diện tích</td>
            <td><strong>Actions</strong></td>
          </tr>
        )}
        renderRowData={function(item) {
          return (
            <RealEstateRow key={item.data.id} index={item.actualIndex} data={item.data} navigate={navigate} />
          )
        }}
        getDataAsync={function(skip, limit) { console.log("Skip, Limit: ", skip, limit); return ChainCodeAPI.RealEstate.getMultipleAsync(skip, limit); }}
      />
      <p>Thêm thông tin bất động sản mới 
        <span
          onClick={function() { navigate("../" + RouteActions.add + "/" + RouteNames.Management.Routes.RealEstate.Path) }}
          className="font-bold text-lg cursor-pointer ms-1 hover:text-info"
        >
          tại đây
        </span>
      </p>
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
