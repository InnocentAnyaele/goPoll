import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useState} from 'react'
import Alert from '@mui/material/Alert';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';



function CreatePoll() {

  const [state, setState]  = useState({
    pollName: '',
    pollBody: '',
    pollOptions: '',
    pollClose: ''  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [anonymous, setAnonymous] = useState(false)
  const userMail:any = localStorage.getItem('email')
  const [severity, setSeverity] = useState('')


  function changeHandler(e:any) {
    setState({...state, [e.target.name]: e.target.value})
  }

  function anonymousHandler(e:any) {
    setAnonymous(!anonymous)
  }

  async function submitHandler(e:any) {
e.preventDefault()
try {
  const formData = new FormData()
  formData.append('userMail', userMail)
  formData.append('pollName', state.pollName)
  formData.append('pollBody', state.pollBody)
  formData.append('pollOptions', state.pollOptions)
  formData.append('pollCloseAt', state.pollClose)
  formData.append('anonymous', anonymous.toString())


  setError('')
  setLoading(true)
  await axios.post('createPoll/', formData, { headers: { "Content-Type": "multipart/form-data" }} )
  .then((res) => {
    if (res.status === 201){
      setSeverity('success')
      setError('Poll created')
      return 
    }
    else {
      setSeverity('error')
      setError('Failed to create poll')
      return 
    }
  })
  .catch((res) => {
      setSeverity('error')
    setError('Failed to create poll')
  return 
  })

}
catch {
      setSeverity('error')
  setError('Failed to create poll')
  return 
}
      setLoading(false)
  }






  return (
        <form style={{width: '50%', marginTop: '4px'}} onSubmit={submitHandler}>
    <div style={{display: 'flex', flexDirection: 'column',  margin: '10px', textAlign: 'center'}}>
        <h3 style={{margin: '0'}}>create go<span style={{color: 'blue', fontWeight: 'bolder'}}>POLL</span></h3>
    {error && <Alert severity={severity === "error" ? "error" : "success"}>{error}</Alert>}
        <TextField id="poll-name-input" name='pollName' onChange={changeHandler} value={state.pollName} label="Give your poll a name" type='text' variant="outlined" margin='normal' inputProps={{maxLength: 30}} required />
        <TextField id="poll-body-input" name='pollBody' onChange={changeHandler} value={state.pollBody} label="Poll body" variant="outlined" type='text'  margin='normal' multiline required fullWidth/>
        <TextField id="poll-body-options" name='pollOptions' onChange={changeHandler} value={state.pollOptions} label="options (read placeholder)" type='text' placeholder="Put a # sign before each poll option. E.g #optionA #optionB #optionC" variant="outlined"  margin='normal' fullWidth multiline required />
        <span>Poll Close</span><TextField id="poll-close-input" name='pollClose' onChange={changeHandler} value={state.pollClose} type='date' variant="outlined"  margin='normal' fullWidth required />
        <FormGroup>
  <FormControlLabel control={<Checkbox checked = {anonymous} onChange={anonymousHandler} />} label="Anonymous (check if poll should be anonymous)" />
</FormGroup>
      <Button variant = "contained" disabled = {loading} type='submit'>Create</Button>
    </div>
    </form>
  )
}

export default CreatePoll