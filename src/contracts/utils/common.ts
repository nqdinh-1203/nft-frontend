// import * as dotenv from 'dotenv';
// dotenv.config()

export type AddressType = {
    97: string;
    56: string;
}

export enum CHAIN_ID {
    TESTNET = 97,
    MAINNET = 56
}

export default function getChainIdFromEnv(): number {
    const env = process.env.NEXT_PUBLIC_CHAIN_ID;
    if (!env) {
        return 97;
    }
    return parseInt(env)
}

export const getRPC = () => {
    // if (getChainIdFromEnv() === CHAIN_ID.MAINNET) {
    //     return process.env.NEXT_PUBLIC_RPC_MAINNET;
    // }
    // console.log(process.env.NEXT_PRIVATE_RPC_TESTNET);
    return "https://eth-goerli.alchemyapi.io/v2/GMGOq5IweL2FmHvrCa2v_H8ISKknDtUu";
}

export const SMART_ADDRESS = {
    NFT: { 97: "0xD4885A25901767d10dDb7a83195aa2afA6252Cf7", 56: "" },
    MARKET: { 97: "0x3a7b4A5E79C2101dcD8A8F85dcF2f4ff8B9424aB", 56: "" },
}