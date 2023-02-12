export interface IWalletInfo {
    address: string,
    amount: number,
}

export interface IRate {
    usdtRate: number,
    ethRate: number,
}

export enum TOKEN {
    ETH = "ETH",
    USDT = "USDT"
}

export interface IPackage {
    key: string,
    name: string,
    amount: number,
    icon: string,
    bg: string,
    token: TOKEN,
}

export interface IMenu {
    name: string;
    url: string;
}

export interface IAttribute {
    trait_type: string;
    value: number;
}

export interface INftItem {
    id: number;
    name: string;
    description?: string;
    image: string;
    attributes?: IAttribute[];

    // Listing
    priceListing?: number;
    author?: string;

    // Auction
    owner?: string;
    ownerImage?: string;
    highestBid?: number;
}

export enum Clarity {
    "A",
    "B",
    "C",
    "D",
    "E",
    "S",
    "SS",
    "SSS",
};

export type ActionType = "LIST" | "UNLIST" | "TRANSFER" | "AUCTION";