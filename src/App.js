import styled from 'styled-components'

import Overlay from './components/interface/Overlay'
import Window from './components/surface/Window'

function App() {

  return (
    <Container>
      <Overlay />
      <Window />
    </Container>
  );
}


export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  overflow: hidden;
`
