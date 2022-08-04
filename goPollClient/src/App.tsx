import Main from './components/main/Main'
import Poll from './components/poll/Poll'
import VotePoll from './components/poll/VotePoll'
import ResultPoll from './components/poll/ResultPoll'
import './App.css'
import PollPrivateRoute from './components/privateRoutes/PollPrivateRoute'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* <Main/> */}
      {/* <Poll/> */}
      {/* <VotePoll/> */}
      {/* <ResultPoll/> */}

<Router>
  <Routes>
    <Route element={<PollPrivateRoute/>}>
      <Route path = "/poll" element={<Poll/>} />
      <Route path='/resultPoll/:pollID/:pollLink' element={<ResultPoll/>}/>
    <Route path='/votePoll/:pollID/:pollLink' element={<VotePoll/>}/>
    </Route>
    <Route path ="/" element={<Main/>}/>
  </Routes>
</Router>
      
    </div>
  );
}

export default App;
