import { atom } from "recoil"

export const modalsLogout = atom({
    key: "modal_logout",
    default: false
})

export const modalsChoseFile = atom({
    key: "modalsChoseFile",
    default: true
})