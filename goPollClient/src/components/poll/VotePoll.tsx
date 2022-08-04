import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Alert from '@mui/material/Alert';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import {useNavigate} from 'react-router-dom'
// import { getOptionsFromChildren } from '@mui/base'
import Navigation from '../nav/Nav'

function VotePoll() {

    const {pollID, pollLink} = useParams()
    const history = useNavigate()
    const userMail = localStorage.getItem('email')
    const [options, setOptions] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [voteLoading, setVoteLoading] = useState(false)

    const [optionID, setOptionID] = useState('')
    

    const [pollName, setPollName] = useState('')

    const [isPollCreator, setIsPollCreator] = useState(false)
    // const [hasUserVoted, setHasUserVoted] = useState(false)
    // const [poll, setPoll] = useState('')
    // const [voters, setVoters] = useState([])
    // const [pollCloseAt, setPollCloseAt] = useState([])
    // const [pollCreated, setPollCreated] = useState('')
    // const [hasVotes, setHasVotes] = useState(false)

     useEffect(()=> {
      document.title = 'GoPoll Vote'
        axios.get(`http://127.0.0.1:8000/checkVote/${pollID}/${pollLink}/${userMail}/`)
        .then((res) => {
            if (res.status === 200) {
              const optionsRes:any = res.data.options
              const pollNameRes:any = res.data.poll[0].pollName
              const pollRes:any = res.data.poll[0]
              const pollClose:any = new Date(res.data.poll[0].pollCloseAt)
              // const pollCreated:any = res.data.poll[0].pollCreated
              let currentDate = new Date()
              const userMailRes = res.data.poll[0].userMail
              const voterRes:any = res.data.voters

              setOptions(optionsRes)
              setPollName(pollNameRes)
              // setPoll(pollRes)
              // setPollCloseAt(pollClose)
              // setPollCreated(pollCreated)
              // setVoters(voterRes)

              if (userMail === userMailRes){
                console.log(res.data.poll[0].userMail)
                setIsPollCreator(true)
              }

              // if (voterRes.length > 0){
              //   setHasVotes(true)
              // }

              
              if (currentDate >= pollClose || res.data.has_user_voted){
                console.log('user has voted')
                // history(0)
                history(`../resultPoll/${pollID}/${pollLink}`)
              }

              console.log('poll creator' ,isPollCreator)
              // console.log('has votes ', hasVotes)
              console.log('voters', voterRes)
              console.log(pollNameRes)
              console.log(optionsRes)
              console.log(pollRes)
              
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
    })


//     function radioHandler(e:any) {
// setOptionID(e.target.value)
// console.log(optionID)
//     }

function voteHandler(e:any) {
  e.preventDefault()
  setVoteLoading(true)
  axios.post(`http://127.0.0.1:8000/vote/${optionID}/${pollID}/${userMail}/`)
  .then((res) => {
    if (res.status === 200) {
      history(`resultPoll/${pollID}/${pollLink}`)
    }
  })
  .catch(() => {
    setVoteLoading(false)
    setError("Can't vote at this time")
  })
  
  
  console.log(optionID)
}

  return (
    <div style={{padding: '15px', margin: '20px'}}>
      <Navigation/>
<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'content', height: '100vh'}}>
{error && <Alert severity='error'>{error}</Alert>}

                
                {
                  loading ? 
                                     <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box> : 

    <form onSubmit={voteHandler}>
  <h2 style={{marginBottom: '30px'}}>{pollName} go<span style={{color: 'blue', fontWeight: 'bolder'}}>POLL</span></h2>
<FormControl>
  <FormLabel id="poll-body" style={{margin: '10px'}}>Should pineapple go on pizza?</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    value= {optionID}
    name="radio-buttons-group"
    onChange={(e) => setOptionID(e.target.value) } 
  >

    {
      options.map((option) => (
        <FormControlLabel key={option['id']} value={option['id']}  control={<Radio />} label={option['optionName']} />

      ))
    }              

{/* 
    <FormControlLabel value="option2" control={<Radio onChange={radioHandler} />} label="It's the only way pizza should be eaten" />
    <FormControlLabel value="option3" control={<Radio onChange={radioHandler} />} label="Neutral" /> */}


  </RadioGroup>
  <Button variant='contained' type='submit' disabled={voteLoading} style={{margin: '5px'}}>Vote</Button>
</FormControl>
    </form>
                }
                </div>  
              
    </div>
  )
}

export default VotePoll