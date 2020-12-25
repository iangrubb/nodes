import { useState, useEffect, useRef } from "react"

import styled from 'styled-components'

import { fromEvent } from "rxjs"

import { filter } from 'rxjs/operators'

import Node from './Node'

function App() {

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
    <Container>
      <UILayer>
        <PopUp></PopUp>
        <PopUp></PopUp>
      </UILayer>
      <Window ref={windowEl}>
        {nodes.map((node, idx) => <Node key={idx} {...node} />)}
      </Window>
    </Container>
  );
}


export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  overflow: hidden;
`

const PopUp = styled.div`
  width: 300px;
  height: 120px;

  background: var(--light-gray);

  pointer-events: auto;

  box-shadow: 2px 1px 4px var(--shadow);
  border-radius: 4px;

`

const UILayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;

  padding: 40px;

  pointer-events: none;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Window = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
  z-index: 1;
  
  background: var(--dark-gray);

`
