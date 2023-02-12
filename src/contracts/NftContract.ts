import { INftItem } from "@/_types_";
import { BigNumber, ethers } from "ethers";
import { Erc721Interface } from "./interfaces";
import { getNftAbi } from "./utils/getAbi";
import { getNftAddress } from "./utils/getAddress";

export default class NftContract extends Erc721Interface {
    constructor(provider: ethers.providers.Web3Provider) {
        super(provider, getNftAddress(), getNftAbi());
    }

    private async _listTokenIds(address: string) {
        const urls: BigNumber[] = await this._contract.listTokenIDs(address);
        const ids = await Promise.all(urls.map((id) => this._toNumber(id)));
        return ids;
    }

    async getListNft(address: string): Promise<INftItem[]> {
        const ids = await this._listTokenIds(address);
        return Promise.all(
            ids.map(async (id) => {
                const tokenUrl = await this._contract.tokenURI(id);
                const obj = await (await fetch(`${tokenUrl}.json`)).json();
                const item: INftItem = { ...obj, id };
                return item;
            })
        )
    }

    async getNftInfo(nfts: Array<any>) {
        return Promise.all(
            nfts.map(async (o: any) => {
                const tokenUrl = await this._contract.tokenURI(o.tokenId);
                const obj = await (await fetch(`${tokenUrl}.json`)).json();
                const item: INftItem = { ...obj, id: o.tokenId, author: o.author };
                return item;
            })
        )
    }
}