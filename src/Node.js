import { useState, useEffect, useRef } from 'react'

import { fromEvent, merge } from "rxjs"

import { switchMap, takeWhile, map, takeUntil, switchMapTo } from "rxjs/operators"

import styled from 'styled-components'

import { useSpring, animated, interpolate } from 'react-spring'

const Node = ({x, y}) => {

    const width = 60
    const height = 60

    const [{ position }, setPosition] = useSpring(() => ({position: [x - (width / 2), y - (height / 2)], config: {tension: 380, mass: 0.2}}))

    const [{ lift }, setLift] = useSpring(() => ({lift: 0, config: {tension: 280, clamp: true}}))

    const nodeEl = useRef(null)

    useEffect(() => {

        const nodeClick$ = fromEvent(nodeEl.current, "mousedown")

        const nodeRelease$ = nodeClick$.pipe(
            switchMapTo(fromEvent(document, "mouseup"))
        )

        const nodeDrag$ = nodeClick$.pipe(
            switchMap(startEvent => fromEvent(document, "mousemove").pipe(
                map(e => {
                    return ({x: e.layerX - (width / 2), y: e.layerY - (height / 2), movementX: e.movementX, movementY: e.movementY})
                } ),
                takeUntil(fromEvent(document, "mouseup"))
            ))
        )

        const clickSubscription = nodeClick$.subscribe(() => {
            setLift({lift: 1})
        })

        const dragSubscription = nodeDrag$.subscribe(({x, y, movementX, movementY}) => {
            setPosition({ position: [x, y], tilt: [movementX, movementY] })
        })

        const releaseSubscription = nodeRelease$.subscribe(() => {
            setLift({lift: 0})
        })

        return () => {
            clickSubscription.unsubscribe()
            dragSubscription.unsubscribe()
            releaseSubscription.unsubscribe()
        }

    }, [setPosition, setLift])

    return (
        <Container ref={nodeEl} width={width} height={height} lift={lift} style={
            {
                transform: interpolate([lift, position], (l, [x, y]) => `translate3d(${x}px,${y}px,0) scale(${1 + 0.1 * l})`),
                zIndex: lift.interpolate(lift => `${lift > 0.1 ? 2 : 1}`),
                boxShadow: lift.interpolate(lift => `${1 + 2 * lift}px ${1 + 1 * lift}px ${2 + 6 * lift}px var(--shadow)`)
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

    width: ${props => props.width}px;
    height: ${props => props.height}px;
    border-radius: 50%;

    cursor: move;
    cursor: grab;

    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 700;
    font-size: 20px;
    color: var(--white);
    
`


