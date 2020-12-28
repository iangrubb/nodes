import { useState, useRef } from "react"

import styled from 'styled-components'

import Node from './Node'

import useCreateControls from './controlHooks/useCreateControls'

import { useRecoilValue } from 'recoil'
import { nodesList } from '../../state/nodes'

const Window = () => {

    const nodes = useRecoilValue(nodesList)

    const windowEl = useRef(null)

    const arrowPreview = useCreateControls(windowEl)

    return (
        <Container ref={windowEl}>
            {nodes.map(id => <Node key={id} id={id} />)}
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
