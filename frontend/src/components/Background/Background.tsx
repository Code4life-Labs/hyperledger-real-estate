import React from "react";

// Import from utils
import { NumberUtils } from "src/utils/number";

// Import locally
import type {
  Point,
  BackgroundProps,
  BackgroundPointsProps
} from "./Background";

const classNames = {
  background: "fixed top-0 left-0 w-full h-full bg-[#110000] overflow-y-scroll overflow-x-hidden",
  point: "absolute w-[600px] h-[600px] rounded-[100%] blur-[180px] opacity-30 bg-[#8F23C2] z-[-1]"
};

function BackgroundPoints(props: BackgroundPointsProps) {
  return React.useMemo(() => {
    return props.points.map((point, index) => {
      // const dotStyle: React.CSSProperties = {
      //   position: 'absolute',
      //   width: '600px',
      //   height: '600px',
      //   borderRadius: '100%',
      //   filter: 'blur(180px)',
      //   opacity: 0.3, // Độ trong suốt của đám mây
      //   background: '#8F23C2 0%',
      //   left: `${point.x}px`,
      //   top: `${point.y}px`,
      //   zIndex:-1,
      // };

      const dotClassName = classNames.point + ` left-[${point.x}px] top-[${point.y}px]`
  
      return <div key={index} className={dotClassName}></div>;
    });
  }, [props.points.length]);
}

/**
 * Use this functional component to render a background
 * @param props 
 * @returns 
 */
export default function Background(props: BackgroundProps) {
  const [randomPoints, setRandomPoints] = React.useState<Point[]>([]);

  React.useEffect(() => {
    const numRandomPoints = 10; // Số lượng điểm tím
    const newRandomPoints: Point[] = [];

    // Tạo ra các điểm tím ngẫu nhiên
    for (let i = 0; i < numRandomPoints; i++) {
      const x = NumberUtils.getRandom(0, window.innerWidth);
      const y = NumberUtils.getRandom(0, window.innerHeight);
      newRandomPoints.push({ x, y });
    }

    setRandomPoints(newRandomPoints);
  }, []); // Chỉ chạy một lần sau khi component mount

  return (
    <div className={classNames.background}>
      <BackgroundPoints points={randomPoints} />
      {props.children}
    </div>
  );
}