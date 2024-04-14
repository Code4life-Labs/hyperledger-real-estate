import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// Import assets
import FROGRANA from "src/assets/SOLDAD.png";

// Import components
import CandleChart from "src/components/CandleChart/CandleChart.tsx";
import Spot from "./Spot/Spot.tsx";

// Import locally
// import { OrderBookProps } from './Spot/Spot';

const _data_ = [
  {
    id: 1,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: "2.0",
    sell: 2.6,
    listedCount: 1838,
    ListedPotion: 14,
    marketCap: 2,
    forum: 1215,
    orderBook: {
      BID: [
        { price: 100, quantity: 5 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        // Add more buy orders as needed
      ],
      ASK: [
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        // Add more sell orders as needed
      ]
    }
},
{
    id: 2,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: "2.0",
    sell: 2.6,
    listedCount: 1838,
    ListedPotion: 14,
    marketCap: 2,
    forum: 1215,
    orderBook: {
      BID: [
        { price: 100, quantity: 5 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        // Add more buy orders as needed
      ],
      ASK: [
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        // Add more sell orders as needed
      ]
    }
  },
  {
    id: 3,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: "2.0",
    sell: 2.6,
    listedCount: 1838,
    ListedPotion: 14,
    marketCap: 2,
    forum: 1215,
    orderBook:{
      BID: [
        { price: 100, quantity: 5 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        // Add more buy orders as needed
      ],
      ASK: [
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        // Add more sell orders as needed
      ]
    }
  },
  {
    id: 4,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: "2.0",
    sell: 2.6,
    listedCount: 1838,
    ListedPotion: 14,
    marketCap: 2,
    forum: 1215,
    orderBook:{
      BID: [
        { price: 100, quantity: 5 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        // Add more buy orders as needed
      ],
      ASK: [
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        // Add more sell orders as needed
      ]
    }
  },
  {
    id: 5,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: "2.0",
    sell: 2.6,
    listedCount: 1838,
    ListedPotion: 14,
    marketCap: 2,
    forum: 1215,
    orderBook: {
      BID: [
        { price: 100, quantity: 5 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        // Add more buy orders as needed
      ],
      ASK: [
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        // Add more sell orders as needed
      ]
    }
  },
  {
    id: 6,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: "2.0",
    sell: 2.6,
    listedCount: 1838,
    ListedPotion: 14,
    marketCap: 2,
    forum: 1215,
    orderBook: {
      BID: [
        { price: 100, quantity: 5 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        // Add more buy orders as needed
      ],
      ASK: [
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        // Add more sell orders as needed
      ]
    }
  },
  {
    id: 7,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: "2.0",
    sell: 2.6,
    listedCount: 1838,
    ListedPotion: 14,
    marketCap: 2,
    forum: 1215,
    orderBook: {
      BID: [
        { price: 100, quantity: 5 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        // Add more buy orders as needed
      ],
      ASK: [
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        // Add more sell orders as needed
      ]
    }
  },
  {
    id: 8,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: "2.0",
    sell: 2.6,
    listedCount: 1838,
    ListedPotion: 14,
    marketCap: 2,
    forum: 1215,
    orderBook: {
      BID: [
        { price: 100, quantity: 5 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        { price: 95, quantity: 3 },
        { price: 90, quantity: 10 },
        // Add more buy orders as needed
      ],
      ASK: [
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        { price: 110, quantity: 7 },
        { price: 115, quantity: 4 },
        { price: 120, quantity: 8 },
        // Add more sell orders as needed
      ]
    }
  }
]

export default function Trade() {
  const { id } = useParams<{ id: string }>(); // Extract id from route parameters
  const [focused, setFocused] = React.useState("Spot")
  const index = parseInt(id || '1') - 1; // Convert id to number and adjust by 1 for array index

  return (
    <div className="flex justify-center mb-[100px]">
        <div className="w-[70%]">
          <div>
            <div className="flex items-center justify-between gap-10 pt-5 pb-5 border-b-2 border-white">
              <div className="flex items-center justify-between w-[15%]">
                <img src={FROGRANA} className="rounded-full w-[40%]"/>
                <p className="text-[20px] text-white font-[600]">FROGRANA</p>
              </div>
              <div className="flex items-center justify-between gap-16">
                <div>
                  <p className="text-[#4DC2E7] text-[20px] font-[700]">{_data_[index].buy}</p>
                  <p className="text-[#7F7F7F]">BUY NOW</p>
                </div>
                <div>
                  <p className="text-[#E93737] text-[20px] font-[700]">{_data_[index].sell}</p>
                  <p className="text-[#7F7F7F]">SELL NOW</p>
                </div>
                <div>
                  <p className="text-white text-[20px] font-[700]">{_data_[index].listedCount}/5,554 (32.63%)</p>
                  <p className="text-[#7F7F7F]">LISTED/SUPPLY</p>
                </div>
                <div>
                  <p className="text-white text-[20px] font-[700]">{_data_[index].forum}</p>
                  <p className="text-[#7F7F7F]">VOLUME (24H)</p>
                </div>
                <div>
                  <p className="text-white text-[20px] font-[700]">1,419,150</p>
                  <p className="text-[#7F7F7F]">VOLUME (ALL)</p>
                </div>
                <div>
                  <p className="text-white text-[20px] font-[700]">14,182</p>
                  <p className="text-[#7F7F7F]">SALES (24H)</p>
                </div>
                <div>
                  <p className="text-white text-[20px] font-[700]">{_data_[index].ListedPotion}</p>
                  <p className="text-[#7F7F7F]">PRICE Δ (24H)</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-white text-[18px] font-[700]">NFT EXCHANGE</p>
              <div className="text-white border border-white w-[100%] px-2 py-1 mt-5 flex items-center">
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                <input className="w-full bg-transparent focus:outline-none ml-1 pl-5" placeholder="Search collections? wallet"/>
              </div>
            </div>
            <div className="flex border-t-2 border-white">
              <div className="w-[25%] border-r-2 border-white">
                <div className=" flex">
                  <div onClick={()=>setFocused("Spot")} className={`text-center w-[25%] h-[50px] cursor-pointer p-3 ${focused === "Spot" ? " border-t-4 text-white border-purple-500" :"text-[#FFFFFF]"}`}>Spot</div>
                  <div onClick={()=>setFocused("Cross 5x")} className={`text-center w-[25%] h-[50px] cursor-pointer p-3 ${focused === "Cross 5x" ? "border-t-4 text-white border-purple-500 text-[#7F7F7F]" :"text-[#FFFFFF]"}`}>Cross 5x</div>
                  <div onClick={()=>setFocused("Isolated")} className={`text-center w-[25%] h-[50px] cursor-pointer p-3 ${focused === "Isolated" ? "border-t-4 text-white border-purple-500 " :"text-[#FFFFFF]"}`}>Isolated</div>
                  <div onClick={()=>setFocused("Grid")} className={`text-center w-[25%] h-[50px] cursor-pointer p-3 ${focused === "Grid" ? "border-t-4 text-white border-purple-500" :"text-[#FFFFFF]"}`}>Grid</div>
                </div>
                <Spot orderBook={_data_[index].orderBook}/>
              </div>
              <div className="p-5">
                <CandleChart />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}