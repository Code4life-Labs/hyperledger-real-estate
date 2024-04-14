import React, { useState } from "react"
import { OrderBookProps } from "./Spot";
const Spot: React.FC<OrderBookProps> = ({orderbook}) => {
    console.log(orderbook)
    const [focused,setFocused] = useState("orderbook")
    return (
        <div className="border-t-2 border-[#4A4A4A]">
            <div className="flex items-center gap-10 justify-start p-3 text-[#4A4A4A] text-[18px]">
                <p>Limit</p>
                <p>Market</p>
                <p>Stop-limit</p>
            </div>
            <div className="flex items-center gap-10 justify-start p-3 text-[#4A4A4A] text-[18px]">
                <p>Avbl</p>
                <p className="text-white font-semibold">0.0000000 USDT</p>
            </div>
            <div className="w-full p-3 text-center text-[#4A4A4A]">
                <div className="flex border-2 border-[#4A4A4A] text-[18px] p-2 justify-between gap-1 rounded-lg">
                    <div className="placeholder-text">Price</div>
                    <input 
                        type="text" // Use type="text" instead of type="number"
                        inputMode="numeric" // Set input mode to numeric
                        pattern="[0-9]*" // Set pattern to allow only numeric input
                        className="bg-transparent focus:outline-none text-right text-white w-[85%] appearance-none hover:appearance-none h-[100%]"
                    />
                    <p className="text-[18px] text-white">USDT</p>
                </div>
                <div className="flex border-2 border-[#4A4A4A] text-[18px] p-2 justify-between gap-1 mt-3 rounded-lg">
                    <div className="placeholder-text">Amount</div>
                    <input 
                        type="text" // Use type="text" instead of type="number"
                        inputMode="numeric" // Set input mode to numeric
                        pattern="[0-9]*" // Set pattern to allow only numeric input
                        className="bg-transparent focus:outline-none text-right text-white w-[85%] appearance-none hover:appearance-none h-[100%]"
                    />
                    <p className="text-[18px] text-white">SUI</p>
                </div>
                <div className="flex border-2 border-[#4A4A4A] text-[18px] p-2 justify-between gap-1 mt-8 rounded-lg">
                    <div className="placeholder-text">Total</div>
                    <input 
                        type="text" // Use type="text" instead of type="number"
                        inputMode="numeric" // Set input mode to numeric
                        pattern="[0-9]*" // Set pattern to allow only numeric input
                        className="bg-transparent focus:outline-none text-right text-white w-[85%] appearance-none hover:appearance-none h-[100%]"
                    />
                    <p className="text-[18px] text-white">USDT</p>
                </div>
                <button className="mt-8 w-[80%] text-[20px] bg-gradient-to-t from-[#423FD2] to-[#B530D7] text-white font-bold">
                    BUY                     
                </button>

            </div>
            <div className="mt-5 border-t-2 border-[#4A4A4A]">
                <div className="flex">
                    <div onClick={()=>setFocused("orderbook")} className={`text-center font-bold w-auto h-[50px] cursor-pointer p-3 ${focused === "orderbook" ? " border-t-4 text-white border-purple-500" :"text-[#4A4A4A]"}`}>ORDER BOOK</div>
                </div>
                <div className="border-t-2 border-[#4A4A4A]">
                    <div className="rounded-md bg-gradient-to-t from-[#423FD2] to-[#B530D7] p-1 text-center text-[20px] font-bold text-white">
                        <div className=" h-full w-full bg-gray-800 bg-transparent">
                            BID
                        </div>
                    </div>
                    <div className="">
                            {
                                orderbook.BID.map((bid,index)=>{
                                    if(index%2 === 0){
                                        return (
                                            <div className="flex justify-between text-[18px] bg-[#232323] pl-3 pr-3 pt-1 pb-1">
                                                <p className="text-[#2ABF53]">{bid.price}</p>
                                                <p className="text-white">{bid.quantity}</p>
                                                <p className="text-white">{bid.price*bid.quantity}</p>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div className="flex justify-between text-[18px] bg-[#150F12] pl-3 pr-3 pt-1 pb-1">
                                                <p className="text-[#2ABF53]">{bid.price}</p>
                                                <p className="text-white">{bid.quantity}</p>
                                                <p className="text-white">{bid.price*bid.quantity}</p>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    <div className="rounded-md bg-gradient-to-t from-[#423FD2] to-[#B530D7] p-1 text-center text-[20px] font-bold text-white mt-5">
                        <div className=" h-full w-full bg-gray-800 bg-transparent">
                            ASK
                        </div>
                    </div>
                    <div className="">
                            {
                                orderbook.ASK.map((bid,index)=>{
                                    if(index%2 === 0){
                                        return (
                                            <div className="flex justify-between text-[18px] bg-[#232323] pl-3 pr-3 pt-1 pb-1">
                                                <p className="text-[#BF2A2A]">{bid.price}</p>
                                                <p className="text-white">{bid.quantity}</p>
                                                <p className="text-white">{bid.price*bid.quantity}</p>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div className="flex justify-between text-[18px] bg-[#150F12] pl-3 pr-3 pt-1 pb-1">
                                                <p className="text-[#BF2A2A]">{bid.price}</p>
                                                <p className="text-white">{bid.quantity}</p>
                                                <p className="text-white">{bid.price*bid.quantity}</p>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                </div>
            </div>
        </div>
    )
}
export default Spot;