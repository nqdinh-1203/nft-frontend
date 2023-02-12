import { Button, HStack, Image, Text } from "@chakra-ui/react"
import React from 'react'
import { numberFormat, showSortAddress } from "../utils"

interface IProp {
    address?: string,
    amount: number,
}

//showSortAddress(address)}
// {numberFormat(amount)}
//

export default function WalletInfo({ address, amount }: IProp) {
    return (
        <Button variant="outline" ml="10px">
            <HStack>
                <Text>{showSortAddress(address)}</Text>
                <Image src="/eth.png" w="25px" alt="bnb" ml="20px" />
                <Text>{numberFormat(amount)}</Text>
            </HStack>
        </Button>
    )
}
