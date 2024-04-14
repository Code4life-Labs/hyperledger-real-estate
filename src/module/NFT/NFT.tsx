import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Ligma from "../../assets/Ligma.png"
import SOLDAD from "../../assets/SOLDAD.png"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
const NFT: React.FC = () => {
    const data:any[] = [
        {
            id:1,
            name:"SOLANA DAD BOGS",
            speard: "2.5%",
            buy : 2.0,
            sell:2.6,
            listedCount:1838,
            ListedPotion:14,
            marketCap:2,
            forum:1215
        },
        {
            id:2,
            name:"SOLANA DAD BOGS",
            speard: "2.5%",
            buy : 2.0,
            sell:2.6,
            listedCount:1838,
            ListedPotion:14,
            marketCap:2,
            forum:1215
        },
        {
            id:3,
            name:"SOLANA DAD BOGS",
            speard: "2.5%",
            buy : 2.0,
            sell:2.6,
            listedCount:1838,
            ListedPotion:14,
            marketCap:2,
            forum:1215
        },
        {
            id:4,
            name:"SOLANA DAD BOGS",
            speard: "2.5%",
            buy : 2.0,
            sell:2.6,
            listedCount:1838,
            ListedPotion:14,
            marketCap:2,
            forum:1215
        },
        {
            id:5,
            name:"SOLANA DAD BOGS",
            speard: "2.5%",
            buy : 2.0,
            sell:2.6,
            listedCount:1838,
            ListedPotion:14,
            marketCap:2,
            forum:1215
        },
        {
            id:6,
            name:"SOLANA DAD BOGS",
            speard: "2.5%",
            buy : 2.0,
            sell:2.6,
            listedCount:1838,
            ListedPotion:14,
            marketCap:2,
            forum:1215
        },
        {
            id:7,
            name:"SOLANA DAD BOGS",
            speard: "2.5%",
            buy : 2.0,
            sell:2.6,
            listedCount:1838,
            ListedPotion:14,
            marketCap:2,
            forum:1215
        },
        {
            id:8,
            name:"SOLANA DAD BOGS",
            speard: "2.5%",
            buy : 2.0,
            sell:2.6,
            listedCount:1838,
            ListedPotion:14,
            marketCap:2,
            forum:1215
        }
    ]
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
                            data.map((nft: any,index: number)=>{
                                return (
                                    <div key={index} className="group w-[22%] h-auto relative pt-10">
                                        <img src={SOLDAD} className="absolute left-[50%] translate-x-[-50%] top-0"/>
                                        <div className="group-hover:shadow-[0px_0px_100px_0px_rgba(255,255,255)] h-auto border border-[#B530D7] rounded-lg pt-16 pb-5 px-2 bg-[#171929]">
                                            <p className="text-white text-[18px] font-bold text-center">{nft.name}</p>
                                            <p className="text-white text-[16px] font-base text-center">Speard: {nft.speard}</p>
                                            <div className="flex justify-between">
                                                <p className="text-green-500 text-[18px] font-bold text-left">{nft.buy}</p>
                                                <p className="text-red-500 text-[18px] font-bold text-right">{nft.sell}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-white text-[16px] font-light text-left">BUY NOW</p>
                                                <p className="text-white text-[16px] font-light text-right">SELL NOW</p>
                                            </div>
                                            <div className="flex justify-between pt-3">
                                                <p className="text-white text-[18px] font-bold text-left">{nft.listedCount}</p>
                                                <p className="text-white text-[18px] font-bold text-right">{nft.ListedPotion}%</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-white text-[16px] font-light text-left">Listed</p>
                                                <p className="text-white text-[16px] font-light text-right">Listed</p>
                                            </div>
                                            <div className="flex justify-between pt-4">
                                                <p className="text-white text-[18px] font-bold text-left">{nft.marketCap}</p>
                                                <p className="text-white text-[18px] font-bold text-right">{nft.forum}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-white text-[16px] font-light text-left">Listed</p>
                                                <p className="text-white text-[16px] font-light text-right">Listed</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NFT
