import { useEffect } from 'react'

import { fromEvent } from "rxjs"
import { filter } from 'rxjs/operators'

import { useRecoilState, useRecoilValue, useRecoilCallback } from 'recoil'
import { nodeIdIncrementor, nodesList,  nodeDetails } from '../../../state/nodes'

const useCreateControls = (windowEl) => {

    const [nodeId, setNodeId] = useRecoilState(nodeIdIncrementor)
    const currentNodes = useRecoilValue(nodesList)

    const addNode = useRecoilCallback(({ set }) => coordinate => {
        set(nodesList, [...currentNodes, nodeId])
        set(nodeDetails(nodeId), coordinate)
        setNodeId(nodeId + 1)
    })

    useEffect(() => {

        const windowClick$ = fromEvent(windowEl.current, "mousedown").pipe(
            filter(e => e.target === windowEl.current)
        )

        const clickSubscription = windowClick$.subscribe(e => {
            addNode({ x: e.offsetX, y: e.offsetY })
        })

        return () => clickSubscription.unsubscribe()
    }, [addNode])


    // return preview arrow to render if relevant

    return null
}

export default useCreateControls