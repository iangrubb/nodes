import { useState, useEffect, useRef } from "react"

import styled from 'styled-components'

import { fromEvent } from "rxjs"

import { filter } from 'rxjs/operators'

import Node from './Node'

const Window = () => {

    const [nodes, setNodes] = useState([])

    const windowEl = useRef(null)

    useEffect(() => {

        const windowClick$ = fromEvent(windowEl.current, "mousedown").pipe(
        filter(e => e.target === windowEl.current)
        )

        const clickSubscription = windowClick$.subscribe(e => {
        setNodes(nodes => [...nodes, {x: e.offsetX, y: e.offsetY}])
        })

        return () => clickSubscription.unsubscribe()
    }, [setNodes])

    return (
        <Container ref={windowEl}>
            {nodes.map((node, idx) => <Node key={idx} {...node} />)}
        </Container>
    )
}

export default Window

const Container = styled.div`
    width: 100vw;
    height: 100vh;

    position: relative;
    z-index: 1;
    
    background: var(--dark-gray);
`
