
import styled from 'styled-components'

import { CgArrowLongRightC, CgCode, CgArrowTopLeft, CgController } from "react-icons/cg";

import { controlModes } from '../../state/controlMode'

import ControlModeButton from './ControlModeButton'

import { InterfaceOverlay } from '../../style/components'

const Overlay = () => {
    
    return (
        <Container>
            <MainUI>
                <ControlModeButton mode={controlModes.create} Icon={CgArrowLongRightC}/>
                <ControlModeButton mode={controlModes.select} Icon={CgArrowTopLeft}/>
                <ControlModeButton mode={controlModes.drag} Icon={CgController}/>
            </MainUI>
        </Container>
    )
}

export default Overlay

const Container = styled.div`
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

const MainUI = styled(InterfaceOverlay)`
  display: flex;
`
