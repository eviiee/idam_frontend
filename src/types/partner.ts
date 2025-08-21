export interface Channel {
  id: number;
  name: string;
  fee: number;
  excelFileName?: string;
  excelSheetNum?: number;
  excelStartRow?: number;
  orderIdColumn?: number;
  productNameColumn?: number;
  productOptionColumn?: number;
  productCodeColumn?: number;
  priceColumn?: number;
  quantityColumn?: number;
  totalPriceColumn?: number;
  orderedAtColumn?: number;
  buyerNameColumn?: number;
  buyerContactColumn?: number;
  buyerMessageColumn?: number;
  receiverNameColumn?: number;
  receiverContactColumn?: number;
  receiverContactAltColumn?: number;
  receiverZipColumn?: number;
  receiverAddressColumn?: number;
  receiverMessageColumn?: number;
  invoiceColumn?: number;
  feeColumn?: number;
  sOrderIdColumn?: number;
  sInvoiceColumn?: number;
  sCourierColumn?: number;
}


export interface Company {
    id? : number
    name : string
    address : string
    email : string
    contact : string
    bizRegNum : string
}

export interface Courier {
    id : number
    trackerUrl : string
}