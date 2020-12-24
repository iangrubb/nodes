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
  background: var(--dark-gray);

  display: flex;
  justify-content: center;
  align-items: center;
`

const Window = styled.div`
  width: 1000px;
  height: 600px;

  position: relative;
  
  background: var(--light-gray);

  border: 4px solid var(--white);
  border-radius: 4px;
`
