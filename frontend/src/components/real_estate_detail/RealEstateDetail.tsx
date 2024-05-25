import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import objects
import { Person } from 'src/objects/Person';

// Import hooks
import { useRealEstate } from 'src/hooks/useRealEstate';

// Import components
import Button from '../buttons/Button';
import BriefClientTable from '../tables/BriefClientTable';
import RealEstatePartTable from '../tables/RealEstatePartTable';

export default function RealEstateDetail() {
  const { realEstate, realEstateDispatchers } = useRealEstate();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(function() {
    if(!realEstate.current) {
      realEstateDispatchers.getRealEstateAsync(id as string);
    }

    // Clear realEstate.current
    return function() {
      realEstateDispatchers.clearCurrentRealEstate();
    }
  }, []);

  return (
    <div className="overflow-y">
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

      {/* Title */}
      <h1 className="font-bold uppercase text-2xl mb-3 text-center">Thông tin bất động sản</h1>

      <div className="mb-6">
        <h2 className="font-bold text-lg">Thông tin chi tiết</h2>
        {/* Basic Information */}
        <table className="w-full mb-6">
          <thead className="border-b-2 [&>tr>td]:p-3">
            <tr>
              <td className="font-bold">Tên</td>
              <td className="font-bold">Thông số</td>
            </tr>
          </thead>
          <tbody className="[&>tr>td]:p-3">
            <tr>
              <td className="font-bold">ID</td>
              <td>{realEstate.current?._id}</td>
            </tr>
            <tr>
              <td className="font-bold">Diện tích</td>
              <td>{realEstate.current?.area} m<sup>2</sup></td>
            </tr>
            <tr>
              <td className="font-bold">Số tờ</td>
              <td>{realEstate.current?.no}</td>
            </tr>
            <tr>
              <td className="font-bold">Số thửa</td>
              <td>{realEstate.current?.localNo}</td>
            </tr>
          </tbody>
        </table>

        <h2 className="font-bold text-lg">Thành phần</h2>
        {/* Thành phần */}
        <RealEstatePartTable parts={realEstate.current?.parts} />
      </div>

      {/* Owners' Information (Clients) */}
      <div className="mb-6">
        <h2 className="font-bold text-lg">Thông tin của chủ sở hữu</h2>
        <BriefClientTable owners={realEstate.current?.owners} />
      </div>

      {/* Images */}
      <div>
        <h2 className="font-bold text-lg">Một số hình ảnh của bất động sản</h2>
        <div className="grid grid-cols-3 gap-5 mt-3">
          {
            realEstate.current?.imgs.map(img => (
              <img className="block object-cover rounded-lg aspect-square" src={img} key={img} />
            ))
          }
        </div>      
      </div>
    </div>
  )
}