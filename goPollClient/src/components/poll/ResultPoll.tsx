import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress';
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import {useNavigate} from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress';
import Navigation from '../nav/Nav'

function ResultPoll() {

     const {pollID, pollLink} = useParams()
    const history = useNavigate()
    const userMail = localStorage.getItem('email')
    const [options, setOptions] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    // const [optionID, setOptionID] = useState('')
    

    const [pollName, setPollName] = useState('')
    const [pollBody, setPollBody] = useState('')

    const [isPollCreator, setIsPollCreator] = useState(false)
    // const [hasUserVoted, setHasUserVoted] = useState(false)
    // const [poll, setPoll] = useState('')
    const [voters, setVoters] = useState([])
    // const [pollCloseAt, setPollCloseAt] = useState([])
    // const [pollCreated, setPollCreated] = useState('')
    // const [hasVotes, setHasVotes] = useState(false)
    const [anonymous, setAnonymous] = useState(false)
    const [totalVote, setTotalVotes] = useState(0)
    

     useEffect(()=> {
      document.title = 'GoPoll Results'
        // axios.get(`http://127.0.0.1:8000/checkVote/${pollID}/${pollLink}/${userMail}/`)
        axios.get(`/checkVote/${pollID}/${pollLink}/${userMail}/`)
        .then((res) => {
            if (res.status === 200) {
              const optionsRes:any = res.data.options
              const pollNameRes:any = res.data.poll[0].pollName
              const pollBodyRes:any = res.data.poll[0].pollBody
              // const pollRes:any = res.data.poll[0]
              const pollClose:any = new Date(res.data.poll[0].pollCloseAt)
              // const pollCreated:any = res.data.poll[0].pollCreated
              const anonymousRes:any = res.data.poll[0].anonymous
              let currentDate = new Date()
              const userMailRes = res.data.poll[0].userMail
              const voterRes:any = res.data.voters
              const totalVoteRes = voterRes.length


              setOptions(optionsRes)
              setPollName(pollNameRes)
              // setPoll(pollRes)
              setPollBody(pollBodyRes)
              // setPollCloseAt(pollClose)
              // setPollCreated(pollCreated)
              setVoters(voterRes)
              setAnonymous(anonymousRes)
              setTotalVotes(totalVoteRes)

              if (userMail === userMailRes){
                console.log(res.data.poll[0].userMail)
                setIsPollCreator(true)
              }

              // if (voterRes.length > 0){
              //   setHasVotes(true)
              // }

              
              if (res.data.has_user_voted === false && currentDate <= pollClose){
                console.log('user has voted')
                // history(0)
                history(`../votePoll/${pollID}/${pollLink}`)
              }
              
              // console.log(res.data)
              // console.log('has user voted', res.data.has_user_voted )
              // console.log('poll creator' ,isPollCreator)
              // console.log('has votes ', hasVotes)
              // console.log('voters', voterRes)
              // console.log('pollCloseAt', pollClose)
              // console.log('pollName',pollNameRes)
              // console.log('options', optionsRes)
              // console.log('poll',pollRes)
              // console.log('totalVotes', totalVoteRes)
              
                setLoading(false)
            }
            else{
                console.log(res.data)
                setError('Something went wrong')
            return
            }
            
        })
        .catch(() => {
            setError('Something went wrong')
            return
        })
    },[])

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '30px'}}>
        <Navigation/>
{error && <Alert severity='error'>{error}</Alert>}


                {
                    loading ? 
                    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box> :

<div>
<h2 style={{marginBottom: '30px'}}>{pollName}<span style={{color: 'blue', fontWeight: 'bolder'}}>POLL</span></h2>
  <span style={{fontSize: '30px', margin: '10px'}}>{pollBody}</span>

<div style={{alignItems: 'left', marginTop: '5px'}}>
 {
        options.map(item => (
            <div key = {item['id']} style={{display: 'flex', flexDirection: 'column'}}>
                <p style={{fontSize: '20px'}}>{item['optionName']}</p>
                <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" style={{height: '15px'}} value={(item['votes']/totalVote)*100}/><span style={{fontWeight: 'bold', fontSize: '20px'}}>{Math.round((item['votes']/totalVote)*100)}%</span>
    </Box>
                   {/* <LinearProgress variant="determinate" value={(item.votes/totalVote)*100} /> */}
            </div>
        ))
    }
</div>
</div>
}



{


  !loading && !anonymous && isPollCreator ?

  <div style={{display: 'flex', flexDirection : 'column', alignItems: 'center'}}>
            <h3 style={{marginBottom: '10px'}}>voters go<span style={{color: 'blue', fontWeight: 'bolder'}}>POLL</span></h3>

   <div style={{padding: '10px'}}>
     { voters.map((voter) => (
       <div key= {voter['id']} style={{padding: '2px'}} >
       <span style={{color: 'blue'}}>
         {voter['voterMail']}
       </span>
       </div>

     ))
     }
   </div>

</div>


  : null
}


  
   
    
    </div>
  )
}

export default ResultPoll