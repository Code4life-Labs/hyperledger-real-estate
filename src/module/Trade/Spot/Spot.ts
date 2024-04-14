type Order = {
  price: number;
  quantity: number;
}

type OrderBook = {
  BID: Order[];
  ASK: Order[];
}

export type OrderBookProps = {
  orderBook: OrderBook;
}