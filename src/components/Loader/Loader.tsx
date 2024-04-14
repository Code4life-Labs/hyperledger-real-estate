import React from "react";
import { RingLoader } from "react-spinners"

const override: React.CSSProperties = {
  position:"absolute",
  top:"50%",
  left:"50%",
  display: "block",
  transform: "translate(-50%,-50%)",
  margin: "0 auto",
  borderColor: "#8F23C2",
  width: `100px`, // Đặt chiều rộng mới
  height: `100px`, // Đặt chiều cao mới (nếu muốn có kích thước khác nhau)
};

/**
 * Use this functional component to render a loader
 * @returns 
 */
export default function Loader() {
  return (
    <div className="w-screen h-screen relative">
      <RingLoader
        color={"#8F23C2"} // Màu sắc
        loading={true} // Trạng thái loading
        size={100}
        cssOverride={override}
      />
    </div>
  );
}