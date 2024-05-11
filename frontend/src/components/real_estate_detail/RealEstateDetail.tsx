import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Import hooks
import { useRealEstate } from 'src/hooks/useRealEstate'

// Import components
import Button from '../buttons/Button';

export default function RealEstateDetail() {
  const { realEstate, realEstateDispatchers } = useRealEstate();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(function() {
    if(!realEstate.current || realEstate.current.id) {
      realEstateDispatchers.getRealEstateAsync(id as string);
    }
  }, [realEstate.current?.id]);

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
      <h1 className="font-bold uppercase text-2xl mb-3 text-center">Thông tin bất động sản</h1>
      <div className="mb-3">
        <h2 className="font-bold text-lg">Thông tin chi tiết</h2>
        <p><strong>ID:</strong> <span>{realEstate.current?.id}</span></p>
        <p><strong>Chiều dài:</strong> <span>{realEstate.current?.length}</span></p>
        <p><strong>Chiều rộng:</strong> <span>{realEstate.current?.width}</span></p>
      </div>

      <div>
        <h2 className="font-bold text-lg">Thông tin của chủ sở hữu</h2>
      </div>
    </div>
  )
}