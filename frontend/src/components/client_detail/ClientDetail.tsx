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
    if(!client.current || client.current.id) {
      clientDispatchers.getClientAsync(id as string);
    }
  }, [client.current?.id]);

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
      <div className="mb-3">
        <h2 className="font-bold text-lg">Thông tin chi tiết</h2>
        <p><strong>ID:</strong> <span>{client.current?.id}</span></p>
        <p><strong>Tên họ:</strong> <span>{client.current?.lastName}</span></p>
        <p><strong>Tên:</strong> <span>{client.current?.firstName}</span></p>
        <p><strong>Ngày sinh:</strong> <span>{client.current ? Person.getBirthDateString(client.current) : ""}</span></p>
      </div>

      <div>
        <h2 className="font-bold text-lg">Bất động sản khách hàng sở hữu</h2>
      </div>
    </div>
  )
}