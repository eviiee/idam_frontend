export interface Channel{
    id : number
    name : string
    fee : number
}

export interface Company {
    id : number
    address : string
    contact : string
    bizRegNum : string
}

export interface Courier {
    id : number
    trackerUrl : string
}