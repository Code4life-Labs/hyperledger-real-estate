import React from 'react'
import { useNavigate } from 'react-router-dom';

// Import APIs
import { ChainCodeAPI } from 'src/apis';

// Import hooks
import { useUser } from 'src/hooks/useUser';

// Import objects
import { Person } from 'src/objects/Person';

// Import components
import DataTable from '../data_table/DataTable';
import Button from '../buttons/Button';

// Import types
import type { Chaincode_User } from 'src/apis/chaincode/types';
import type { NavigateFunction } from 'react-router-dom';

// Import route names
import { RouteNames, RouteActions } from 'src/routenames';

type UserRowProps = {
  data: Chaincode_User;
  index: number;
  navigate: NavigateFunction;
}

function UserRow(props: UserRowProps) {
  const routeAction = "/" + RouteActions.edit;

  return (
    <tr
      key={props.data._id}
    >
      <td>{props.index + 1}</td>
      <td><strong>{props.data._id}</strong></td>
      <td>{Person.getFullName(props.data)}</td>
      <td>{Person.getBirthDateString(props.data)}</td>
      <td>
        <Button colorType="info" onClick={function() { props.navigate(props.data._id); }}>View</Button>
        <Button colorType="warning" onClick={function() { props.navigate(props.data._id + routeAction); }}>Edit</Button>
      </td>
    </tr>
  )
}

export default function User() {
  const { user, userDispatchers } = useUser();
  const navigate = useNavigate();

  React.useEffect(function() {
    if(user.list.length === 0)
      userDispatchers.getUsersAsync(10, 0);
  }, []);

  return (
    <div>
      <h1 className="font-bold uppercase text-2xl mb-3 text-center">Quản lý người dùng</h1>
      <h2 className="font-bold text-lg">Danh sách người dùng</h2>
      <DataTable<Chaincode_User>
        data={user.list}
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
            <UserRow key={item.data._id} index={item.actualIndex} data={item.data} navigate={navigate} />
          )
        }}
        getDataAsync={function(skip, limit) { return ChainCodeAPI.User.getMultipleAsync(limit, skip); }}
        updateData={function(data) { userDispatchers.setUsers(data); }}
      />
      <p>Thêm thông tin người dùng mới  
        <span
          onClick={function() { navigate("../" + RouteActions.add + "/" + RouteNames.Management.Routes.User.Path) }}
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