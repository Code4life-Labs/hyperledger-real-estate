// import React from 'react'

// Import locally
import type { NFTCardProps } from './NFTCard';

/**
 * Use this functional component to render a nft information card
 * @param props 
 * @returns 
 */
export default function NFTCard(props: NFTCardProps) {
  return (
    <div className="group w-[22%] h-auto relative pt-10">
      <img src={props.img} className="absolute left-[50%] translate-x-[-50%] top-0"/>
      <div className="group-hover:shadow-[0px_0px_100px_0px_rgba(255,255,255)] h-auto border border-[#B530D7] rounded-lg pt-16 pb-5 px-2 bg-[#171929]">
        <p className="text-white text-[18px] font-bold text-center">{props.data.name}</p>
        <p className="text-white text-[16px] font-base text-center">Speard: {props.data.speard}</p>
        <div className="flex justify-between">
          <p className="text-green-500 text-[18px] font-bold text-left">{props.data.buy}</p>
          <p className="text-red-500 text-[18px] font-bold text-right">{props.data.sell}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-white text-[16px] font-light text-left">BUY NOW</p>
          <p className="text-white text-[16px] font-light text-right">SELL NOW</p>
        </div>
        <div className="flex justify-between pt-3">
          <p className="text-white text-[18px] font-bold text-left">{props.data.listedCount}</p>
          <p className="text-white text-[18px] font-bold text-right">{props.data.listedPotion}%</p>
        </div>
        <div className="flex justify-between">
          <p className="text-white text-[16px] font-light text-left">Listed</p>
          <p className="text-white text-[16px] font-light text-right">Listed</p>
        </div>
        <div className="flex justify-between pt-4">
          <p className="text-white text-[18px] font-bold text-left">{props.data.marketCap}</p>
          <p className="text-white text-[18px] font-bold text-right">{props.data.forum}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-white text-[16px] font-light text-left">Listed</p>
          <p className="text-white text-[16px] font-light text-right">Listed</p>
        </div>
      </div>
    </div>
  )
}