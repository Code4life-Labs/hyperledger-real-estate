// import React from 'react'
import { useNavigate } from 'react-router-dom';

// Import components
import Button from 'src/components/buttons/Button'

// Import route names
import { RouteNames } from 'src/routenames';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100dvh-60px-33px)]">
      <h1 className="text-center font-bold text-2xl">Quản lý bất động sản</h1>
      <p className="text-center text-lg max-w-lg m-x-auto">
        Chào mừng bạn tới ứng dụng quản lý bất động sản. Ở đây bạn có thể quản lý bất động
        sản của khách hàng, truy xuất, lưu thông tin của bất động sản. Các dữ liệu về bất động
        sản được quản lý bởi Blockchain.
      </p>
      <div className="w-fit mx-auto mt-[24px]">
        <Button onClick={() => navigate(RouteNames.Management.Path)}>Bắt đầu ngay</Button>
      </div>
    </div>
  )
}