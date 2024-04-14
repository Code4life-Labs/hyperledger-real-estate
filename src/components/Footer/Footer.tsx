import { faKeyboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import assets
import SUI from "src/assets/SUI.png";

/**
 * Use this functional component to render a footer
 * @returns 
 */
export default function Footer() {
  return (
    <div className="h-[50px] flex bg-black justify-center">
      <div className="flex w-[70%] h-full justify-between">
        <div className="flex h-full items-center">
          <div className="bg-[#92F7CA] w-[15px] h-[15px] rounded-full">
          </div>
          <p className="ml-8 text-[#7F7F7F] font-base mr-8">Live</p>
          <div className="h-full w-[2px] bg-[#4A4A4A]">
          </div>
          <FontAwesomeIcon className="ml-8 text-[#7F7F7F]" icon={faKeyboard}/>
        </div>
        <div className="w-[6%] h-full items-center flex">
          <img src={SUI} className="w-[25%] mr-1"/>
          <p className="text-[#7F7F7F]">$188.88</p>
        </div>
      </div>
    </div>
  )
}