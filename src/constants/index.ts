import { IMenu, IPackage, TOKEN } from "@/_types_"

export const packages: IPackage[] = [
    {
        key: "eth-01",
        name: "ETH PACKAGE 1",
        amount: 1000,
        bg: "eth-bg.png",
        icon: "eth.png",
        token: TOKEN.ETH,
    },
    {
        key: "eth-02",
        name: "ETH PACKAGE 2",
        amount: 2000,
        bg: "eth-bg.png",
        icon: "eth.png",
        token: TOKEN.ETH,
    },
    {
        key: "eth-03",
        name: "ETH PACKAGE 3",
        amount: 3000,
        bg: "eth-bg.png",
        icon: "eth.png",
        token: TOKEN.ETH,
    },
    {
        key: "usdt-01",
        name: "USDT PACKAGE 1",
        amount: 1000,
        bg: "usdt-bg.png",
        icon: "usdt.png",
        token: TOKEN.USDT,
    },
    {
        key: "usdt-02",
        name: "USDT PACKAGE 2",
        amount: 2000,
        bg: "usdt-bg.png",
        icon: "usdt.png",
        token: TOKEN.USDT,
    },
    {
        key: "usdt-03",
        name: "USDT PACKAGE 3",
        amount: 3000,
        bg: "usdt-bg.png",
        icon: "usdt.png",
        token: TOKEN.USDT,
    },
]

export const menus: IMenu[] = [
    { name: "Invest", url: "/" },
    { name: "Market", url: "/market" },
]