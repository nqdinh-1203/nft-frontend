import React from 'react'
import { Flex, Heading, SimpleGrid, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, useBoolean, useDisclosure } from "@chakra-ui/react"
import { ethers } from 'ethers';

import { ConnectWallet, WalletInfo, SuccessModal } from "@/components";
import { ActionType, INftItem, IWalletInfo, TOKEN } from '@/_types_';

import MarketContract from '@/contracts/MarketContract';
import NftContract from '@/contracts/NftContract';
import Nft from './components/Nft';
import ProcessingModal from '@/components/ProcessingModal';
import ListModal from './components/ListModal';

declare var window: any;

export default function MarketViews() {
    const [wallet, setWallet] = React.useState<IWalletInfo>();
    const [web3Provider, setWeb3Provider] = React.useState<ethers.providers.Web3Provider>();
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    const [txHash, setTxHash] = React.useState<string>();
    const [nfts, setNfts] = React.useState<INftItem[]>([]);
    const [nftsListed, setNftsListed] = React.useState<INftItem[]>([]);
    const [nft, setNft] = React.useState<INftItem>();
    const [action, setAction] = React.useState<ActionType>();

    const [isListing, setIsListing] = useBoolean();
    const [isUnlist, setIsUnlist] = useBoolean();
    const [isOpen, setIsOpen] = useBoolean();

    const { isOpen: isSuccess, onClose: onCloseSuccess, onOpen: onOpenSuccess } = useDisclosure();

    const handleConnectWallet = async () => {
        if (window.ethereum) {
            console.log("...connecting");

            const provider = new ethers.providers.Web3Provider(window.ethereum, undefined);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();

            const address = await signer.getAddress();
            const bigBalance = await signer.getBalance();
            const ethBalance = Number.parseFloat(ethers.utils.formatEther(bigBalance));
            setWallet({ address, amount: ethBalance });
            setWeb3Provider(provider);
        }
    }

    const getListNft = React.useCallback(async () => {
        if (!web3Provider || !wallet) return;

        console.log("...listing");

        const nftContract = new NftContract(web3Provider);
        const nfts = await nftContract.getListNft(wallet.address);

        console.log(nfts);

        setNfts(nfts.filter((p) => p.name));
        const marketContract = new MarketContract(web3Provider);
        const ids = await marketContract.getNftListedOnMarketplace();
        const listedNfts = await nftContract.getNftInfo(ids);
        setNftsListed(listedNfts);

        console.log("...listing done");
    }, [web3Provider, wallet]);

    React.useEffect(() => {
        getListNft();
    }, [getListNft])

    const selectAction = async (ac: ActionType, item: INftItem) => {
        if ((ac != "LIST" && ac != "UNLIST") || !web3Provider) {
            return;
        }

        setNft(item);
        setAction(ac);
        setIsListing.off();

        switch (ac) {
            case "LIST":
                setIsOpen.on();
                break;

            case "UNLIST":
                setIsUnlist.on();
                const marketContract = new MarketContract(web3Provider);
                const tx = await marketContract.unlistNft(item.id);
                setTxHash(tx);
                setAction(undefined);
                setNft(undefined);
                setIsUnlist.off();
                onOpenSuccess();
                await getListNft();
                break;

            default:
                break;
        }
    }

    const handleListNft = async (price: number) => {
        if (!price || !web3Provider || !wallet || !nft) return;

        setIsListing.on();

        try {
            const nftContract = new NftContract(web3Provider);
            const marketContract = new MarketContract(web3Provider);
            await nftContract.approve(marketContract._contractAddress, nft.id);
            const tx = await marketContract.listNft(nft.id, price);
            setTxHash(tx);
            onOpenSuccess();
            setAction(undefined);
            setNft(undefined);
            setIsOpen.off();
            await getListNft();
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <Flex
            w={{ base: "full", lg: "70%" }}
            flexDirection="column"
            margin="50px auto"
        >
            <Flex>
                <Heading size="lg" fontWeight="bold">
                    Hero Marketplace
                </Heading>

                <Spacer />

                {!wallet && <ConnectWallet onClick={handleConnectWallet} />}
                {wallet && <WalletInfo
                    address={wallet?.address}
                    amount={wallet?.amount || 0}
                />}
            </Flex>

            <Flex w="full" flexDirection="column" py="50px">
                <Tabs>
                    <TabList borderBottomColor="#5A5A5A" borderBottomRadius={2} mx="15px">
                        <Tab
                            textTransform="uppercase"
                            color="#5A5A5A"
                            _selected={{ borderBottomColor: "white", color: "white" }}
                        >
                            ALL ITEMS
                        </Tab>
                        <Tab
                            textTransform="uppercase"
                            color="#5A5A5A"
                            _selected={{ borderBottomColor: "white", color: "white" }}
                        >
                            active listings
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <SimpleGrid w="full" columns={4} spacing={10}>
                                {
                                    nfts.map((nft, index) => (
                                        <Nft
                                            item={nft}
                                            key={index}
                                            index={index}
                                            isAuction
                                            isList
                                            isTransfer
                                            onAction={(a) => selectAction(a, nft)}
                                        />
                                    ))
                                }
                            </SimpleGrid>
                        </TabPanel>

                        <TabPanel>
                            <SimpleGrid w="full" columns={4} spacing={10}>
                                {
                                    nftsListed.map((nft, index) => (
                                        <Nft
                                            item={nft}
                                            key={index}
                                            index={index}
                                            isAuction
                                            isList
                                            isTransfer
                                            onAction={(a) => selectAction(a, nft)}
                                        />
                                    ))
                                }
                            </SimpleGrid>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <ProcessingModal isOpen={isUnlist} onClose={() => { }} />
                <ListModal
                    isOpen={isOpen}
                    nft={nft}
                    isListing={isListing}
                    onClose={() => setIsOpen.off()}
                    onList={(amount) => handleListNft(amount)}
                />

                <SuccessModal
                    hash={txHash}
                    onClose={onCloseSuccess}
                    isOpen={isSuccess}
                    title="LIST - UNLIST NFT"
                />
            </Flex>
        </Flex>
    )
}