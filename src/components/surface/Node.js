import { useEffect, useRef } from 'react'

import { fromEvent } from "rxjs"

import { switchMap, map, takeUntil, switchMapTo } from "rxjs/operators"

import styled from 'styled-components'

import { useSpring, animated, interpolate } from 'react-spring'


import { useRecoilValue } from 'recoil'
import { nodeDetails } from '../../state/nodes'

const Node = ({id}) => {

    const {x, y} = useRecoilValue(nodeDetails(id))

    const [{ radius } , setRadius] = useSpring(() => ({radius: 30, from: {radius: 0}, config: {tension: 640}}))

    const [{ position }, setPosition] = useSpring(() => ({position: [x, y], config: {tension: 380, mass: 0.2}}))

    const [{ lift }, setLift] = useSpring(() => ({lift: 0, config: {tension: 480, clamp: true}}))

    const nodeEl = useRef(null)

    // useEffect(() => {

    //     const nodeClick$ = fromEvent(nodeEl.current, "mousedown")

    //     const nodeRelease$ = nodeClick$.pipe(
    //         switchMapTo(fromEvent(document, "mouseup"))
    //     )

    //     const nodeDrag$ = nodeClick$.pipe(
    //         switchMap(startEvent => fromEvent(document, "mousemove").pipe(
    //             map(e => {
    //                 return ({x: e.layerX, y: e.layerY, movementX: e.movementX, movementY: e.movementY})
    //             } ),
    //             takeUntil(fromEvent(document, "mouseup"))
    //         ))
    //     )

    //     const clickSubscription = nodeClick$.subscribe(() => {
    //         setLift({lift: 1})
    //     })

    //     const dragSubscription = nodeDrag$.subscribe(({x, y, movementX, movementY}) => {
    //         setPosition({ position: [x, y], tilt: [movementX, movementY] })
    //     })

    //     const releaseSubscription = nodeRelease$.subscribe(() => {
    //         setLift({lift: 0})
    //     })

    //     return () => {
    //         clickSubscription.unsubscribe()
    //         dragSubscription.unsubscribe()
    //         releaseSubscription.unsubscribe()
    //     }

    // }, [setPosition, setLift])

    return (
        <Container ref={nodeEl} lift={lift} style={
            {
                transform: interpolate([lift, position, radius], (l, [x, y], r) => `translate3d(${x - 50}px,${y - 50}px,0) scale(${ (r / 50) + 0.1 * l})`),
                zIndex: lift.interpolate(lift => `${lift > 0.1 ? 2 : 1}`),
                boxShadow: lift.interpolate(lift => `${2 + 2 * lift}px ${1 + 1 * lift}px ${4 + 6 * lift}px var(--shadow)`)
            }
        } >
            1
        </Container>
    )
}

export default Node

const Container = styled(animated.div)`

    background: var(--dark-blue);

    position: absolute;

    top: 0;
    left: 0;

    width: 100px;
    height: 100px;

    border-radius: 50%;


    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 700;
    font-size: 32px;
    color: var(--white);

    user-select: none;
    
`
