import { useState, useEffect, useRef } from "react"

import styled from 'styled-components'

import { fromEvent } from "rxjs"

import { filter } from 'rxjs/operators'

import Node from './Node'

import { CgArrowLongRightC, CgCode, CgArrowTopLeft, CgController } from "react-icons/cg";

function App() {

  const [mode, setMode] = useState("SELECT")


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
        <PopUp>
          <UIButton active={mode === "SELECT"} onClick={()=>setMode("SELECT")}>
            <SelectArrowSymbol></SelectArrowSymbol>
          </UIButton>
          <UIButton active={mode === "DRAG"} onClick={()=>setMode("DRAG")}>
            <DragSymbol></DragSymbol>
          </UIButton>
          <UIButton active={mode === "CREATE"} onClick={()=>setMode("CREATE")}>
            <NodeArrowSymbol></NodeArrowSymbol>
          </UIButton>
          {/* <UIButton active={mode === "CODE"} onClick={()=>setMode("CODE")}>
            <CodeSymbol></CodeSymbol>
          </UIButton> */}
        </PopUp>
        
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

const UIButton = styled.button`

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  width: 42px;
  height: 42px;

  margin: 4px;

  border-radius: 2px;
  border: none;

  color: var(--white);

  transition: transform 0.1s ease, box-shadow 0.1s ease;

  transform: translateY(${props => props.active ? 1 : -1 }px);
  box-shadow: ${props => props.active ? '1px 1px 1px var(--shadow)' : '2px 2px 2px var(--shadow)' };
  background: ${props => props.active ? 'var(--dark-blue)' : 'var(--dark-gray)'};


  &:active {
    background: ${props => props.active ? 'var(--light-gray)' : 'var(--dark-gray)'};
  }

  &:focus {
    outline: none;
  }

`

const fullSize = icon => styled(icon)`
  width: 100%;
  height: 100%;
`

const SelectArrowSymbol = fullSize(CgArrowTopLeft)

const DragSymbol = fullSize(CgController)

const NodeArrowSymbol = fullSize(CgArrowLongRightC)

const CodeSymbol = fullSize(CgCode)

const PopUp = styled.div`

  padding: 4px;

  background: var(--light-gray);

  pointer-events: auto;

  box-shadow: 2px 1px 4px var(--shadow);
  border-radius: 4px;

  display: flex;

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
