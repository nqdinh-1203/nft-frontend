import { INftItem } from "@/_types_";
import { ethers } from "ethers";
import { Erc721Interface } from "./interfaces";
import { getMarketAbi } from "./utils/getAbi";
import { getMarketAddress } from "./utils/getAddress";

export default class MarketContract extends Erc721Interface {
    constructor(provider: ethers.providers.Web3Provider) {
        super(provider, getMarketAddress(), getMarketAbi());
    }

    async getNftListedOnMarketplace() {
        const items = await this._contract.getListNFT();
        const nfts = items.map((item: any) => ({
            tokenId: this._toNumber(item.tokenId),
            author: item.author,
        }))
        return nfts;
    }

    async getMyNftListed(address: string) {
        const nfts = await this.getNftListedOnMarketplace();
        return nfts.filter((p: any) => p.author === address);
    }

    async listNft(tokenId: number, price: number) {
        const tx = await this._contract.listNFT(tokenId, this._numberToEth(price), this._option);
        return this._handleTransactionRespone(tx);
    }

    async unlistNft(tokenId: number) {
        const tx = await this._contract.unlistNFT(tokenId, this._option);
        return this._handleTransactionRespone(tx);
    }
}