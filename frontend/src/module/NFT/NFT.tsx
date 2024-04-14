// import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";

// Import assets
import Ligma from "src/assets/Ligma.png"
import SOLDAD from "src/assets/SOLDAD.png"

// Import components
import NFTCard from "src/components/NFTCard/NFTCard.tsx";

// Import types
import type { NFT as NFTType } from 'src/types/nft';

const _data_: Array<NFTType> = [
  {
    id: 1,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: 2.0,
    sell: 2.6,
    listedCount: 1838,
    listedPotion: 14,
    marketCap: 2,
    forum: 1215
  },
  {
    id: 2,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: 2.0,
    sell: 2.6,
    listedCount: 1838,
    listedPotion: 14,
    marketCap: 2,
    forum: 1215
  },
  {
    id: 3,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: 2.0,
    sell: 2.6,
    listedCount: 1838,
    listedPotion: 14,
    marketCap: 2,
    forum: 1215
  },
  {
    id: 4,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: 2.0,
    sell: 2.6,
    listedCount: 1838,
    listedPotion: 14,
    marketCap: 2,
    forum: 1215
  },
  {
    id: 5,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: 2.0,
    sell: 2.6,
    listedCount: 1838,
    listedPotion: 14,
    marketCap: 2,
    forum: 1215
  },
  {
    id: 6,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: 2.0,
    sell: 2.6,
    listedCount: 1838,
    listedPotion: 14,
    marketCap: 2,
    forum: 1215
  },
  {
    id: 7,
    name:" SOLANA DAD BOGS",
    speard: "2.5%",
    buy: 2.0,
    sell: 2.6,
    listedCount: 1838,
    listedPotion: 14,
    marketCap: 2,
    forum: 1215
  },
  {
    id: 8,
    name: "SOLANA DAD BOGS",
    speard: "2.5%",
    buy: 2.0,
    sell: 2.6,
    listedCount: 1838,
    listedPotion: 14,
    marketCap: 2,
    forum: 1215
  }
]

/**
 * Use this functional component to render NFT container
 * @returns 
 */
export default function NFT() {
  return (
    <div className="flex justify-center mb-[100px]">
      <div className="w-[70%] flex justify-center">
        <div>
          <img src={Ligma} className="w-full"/>
          <p className="text-[30px] text-center text-white font-bold mt-3">Hyperledger Leading NFT Marketplace</p>
          <p className="text-[18px] text-center text-white font-base">FASTEST DATA · DEEPEST LIQUIDITY · FUN REWARDS</p>
          <div className="text-white border border-[#626262] w-[30%] px-2 py-1 mx-auto mt-5 flex items-center">
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <input className="w-full bg-transparent focus:outline-none ml-1 pl-5" placeholder="Filter by Collection ?"/>
          </div>
            <div className="flex flex-wrap justify-between w-full mt-10 gap-y-10">
              {
                _data_.map((nft: typeof _data_[0]) => <NFTCard key={nft.id} data={nft} img={SOLDAD} />)
              }
            </div>
        </div>
      </div>
    </div>
  )
}