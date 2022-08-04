// import Navigation from '../nav/Nav'
import ViewPolls from './ViewPolls'
import CreatePoll from './CreatePoll'
// import {Route} from 'react-router-dom'
import Navigation from '../nav/Nav'
import {useEffect} from 'react'

function Poll() {

  useEffect(() => {
    document.title = 'GoPoll Create & View poll'
  })



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