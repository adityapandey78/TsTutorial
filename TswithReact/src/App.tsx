
import { UserCard } from './components/1RequiredOptionalProps'
import { GreetA, GreetB } from './components/2DefaultProps'
import { Panel, RequiredChildrenPanel } from './components/3ChildrenReactNode'
import { Badge } from './components/4AsConstVar'
import { Button } from './components/5ComponentProps'

function App() {
 
  return (
    <>
      <UserCard id='1' subtitle={<p>This is a subtitle</p>}/>
      <GreetA name='sakshi'/>
      <GreetB name='Aditya'/>
      <Panel title='Hello Panel'
      children={
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ul>
      }/>

      <RequiredChildrenPanel title='Aditya'>
       Hello
      </RequiredChildrenPanel>

      <Badge label='Aditya' variant='ghost'/>


      <Button variant='primary'/>
    </>
  )
}

export default App
