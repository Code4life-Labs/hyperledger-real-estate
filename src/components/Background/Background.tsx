import React from "react";
import { useEffect, useState } from "react";
import { Point , BackgroundProps } from "./Background"
const Background: React.FC<BackgroundProps> = ({children}) => {
  const [randomPoints, setRandomPoints] = useState<Point[]>([]);

  useEffect(() => {
    const numRandomPoints = 10; // Số lượng điểm tím
    const newRandomPoints: Point[] = [];

    // Tạo ra các điểm tím ngẫu nhiên
    for (let i = 0; i < numRandomPoints; i++) {
      const x = getRandomNumber(0, window.innerWidth);
      const y = getRandomNumber(0, window.innerHeight);
      newRandomPoints.push({ x, y });
    }

    setRandomPoints(newRandomPoints);
  }, []); // Chỉ chạy một lần sau khi component mount

  // Hàm này để tạo số ngẫu nhiên trong một phạm vi
  const getRandomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  // Hàm này để tạo nền gradient kết hợp màu tím và màu đỏ
  const renderBackground = (): React.CSSProperties => {
    return {
      overflowY:"scroll",
      overflowX:"hidden",
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor:"#110000",
    };
  };

  // Hàm này để tạo gradient cho các chấm màu tím
  const renderPoints = (): JSX.Element[] => {
    return randomPoints.map((point, index) => {
      const dotStyle: React.CSSProperties = {
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '100%',
        filter: 'blur(180px)',
        opacity: 0.3, // Độ trong suốt của đám mây
        background: '#8F23C2 0%',
        left: `${point.x}px`,
        top: `${point.y}px`,
        zIndex:-1,
      };

      return <div key={index} style={dotStyle}></div>;
    });
  };

  return (
    <div style={renderBackground()}>
      {renderPoints()}
      {children}
    </div>
  );
};

export default Background;