import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Import hooks
import { useClient } from 'src/hooks/useClient';

// Import objects
import { Person } from 'src/objects/Person';

// Import components
import Button from '../buttons/Button';

export default function ClientDetail() {
  const { client, clientDispatchers } = useClient();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(function() {
    if(!client.current || client.current._id) {
      clientDispatchers.getClientAsync(id as string);
    }

    return function() {
      clientDispatchers.clearCurrentUser();
    }
  }, []);

  return (
    <div>
      <div className="flex items-center">
        <Button
          buttonType="non_padding"
          colorType="background"
          onClick={function() { navigate(-1); }}
          extendClassName="flex items-center justify-center hover:bg-outline/30"
        >
          <span
            className="material-symbols-outlined text-primary text-3xl"
          >keyboard_arrow_left</span>
        </Button>
        <h2 className="font-bold ms-2">Trở về</h2>
      </div>
      <h1 className="font-bold uppercase text-2xl mb-3 text-center">Thông tin khách hàng</h1>
      <table className="w-full mb-6">
        <thead className="border-b-2 [&>tr>td]:p-3">
          <tr>
            <td className="font-bold">Mục</td>
            <td className="font-bold">Thông tin</td>
          </tr>
        </thead>
        <tbody className="[&>tr>td]:p-3">
          <tr>
            <td className="font-bold">ID</td>
            <td>{client.current?._id}</td>
          </tr>
          <tr>
            <td className="font-bold">Họ và tên</td>
            <td>{client.current && Person.getFullName(client.current)}</td>
          </tr>
          <tr>
            <td className="font-bold">Ngày sinh</td>
            <td>{client.current && Person.getBirthDateString(client.current)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}