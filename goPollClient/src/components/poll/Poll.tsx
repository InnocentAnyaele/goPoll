// import Navigation from '../nav/Nav'
import ViewPolls from './ViewPolls'
import CreatePoll from './CreatePoll'
import {Route} from 'react-router-dom'
import Navigation from '../nav/Nav'

function Poll() {
  return (
<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Navigation/>
      <CreatePoll/>
      <div style={{marginTop: '20px'}}>
      <ViewPolls/>
      </div>
    </div>
    
  )
}

export default Poll