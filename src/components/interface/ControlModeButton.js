import styled from 'styled-components'

import { useRecoilState } from 'recoil'

import { controlModeState } from '../../state/controlMode'

export const ControlModeButton = ({ mode, Icon }) => {

    const ResizedIcon = resize(Icon)

    const [controlMode, setControlMode] = useRecoilState(controlModeState)

    return (
        <Button active={mode === controlMode} onClick={()=>setControlMode(mode)}>
            <ResizedIcon />
        </Button>
    )
}

export default ControlModeButton

const Button = styled.button`

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

const resize = icon => styled(icon)`
  width: 100%;
  height: 100%;
`