import { atom } from "recoil"

export const controlModes = {
    select: "SELECT",
    drag: "DRAG",
    create: "CREATE"
}

export const controlModeState = atom({
    key: "controlModeState",
    default: controlModes.select
})