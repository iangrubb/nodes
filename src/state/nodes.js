import { atom, atomFamily } from 'recoil'

export const nodeIdIncrementor = atom({
    key: "nodeIdIncrementor",
    default: 1
})

export const nodesList = atom({
    key: "nodesList",
    default: []
})

export const nodeDetails = atomFamily({
    key: "nodeDetails",
    default: coordinate => coordinate
})