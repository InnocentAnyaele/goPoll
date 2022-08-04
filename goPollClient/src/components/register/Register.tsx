import TextField from '@mui/material/TextField'
// import MainButton from '../button/MainButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import './Register.css'
import Button from '@mui/material/Button' 
import {auth} from '../../Firebase' 
import {signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'


import {useState} from 'react'
import Alert from '@mui/material/Alert';



function Register(props: any) {

  const history = useNavigate()
  const registerState = props.registerState
  const provider = new GoogleAuthProvider()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [state, setState] = useState({
    email: '', password: '', passwordConfirm: ''
  })

   async function signInWithGoogle() {
    try {
       await signInWithPopup(auth, provider)
      .then((result) => {
    const email = result.user.email
        const uid = result.user.uid

        if (email) localStorage.setItem('email', email)
        if (uid) localStorage.setItem('uid', uid)
        history('/poll')
      })
      .catch((error) => {
        console.log(error.message)
        return setError(error.message)
      })

    }
    catch {
        return setError('Failed to create an account.')
    }
  }

  function changeHandler(e:any){
    setState({...state,[e.target.name]: e.target.value})
  }

   async function handleSubmit(e:any) {
    e.preventDefault()

    if (registerState === 'register') {

      if (state.password !== state.passwordConfirm){
        return setError('Passwords do not match')
      }

      try {
        // console.log(state.email)
        // console.log(state.password)
        setError('')
        setLoading(true)
         await createUserWithEmailAndPassword(auth, state.email, state.password)
        .then((result) => {
     const email = result.user.email
        const uid = result.user.uid

        if (email) localStorage.setItem('email', email)
        if (uid) localStorage.setItem('uid', uid)
        history('/poll')
        })
        .catch((error) => {
        console.log (error.message)
        return setError(error.message)
        })
      }
      catch {
        return setError('Failed to create an account.')
      }

      setLoading(false)

    }

    if (registerState === 'login'){
      try{
        setError('')
        setLoading(true)
        await signInWithEmailAndPassword(auth,state.email, state.password)
        .then((result) => {
        const email = result.user.email
        const uid = result.user.uid

        if (email) localStorage.setItem('email', email)
        if (uid) localStorage.setItem('uid', uid)
        history('/poll')
        })
        .catch ((error) => {
          console.log(error.message)
        return setError(error.message)
        })
      }
      catch{
        return setError('Failed to log in. Invalid email or password.')
      }
      setLoading(false)
    }
  }



  return (
    <form onSubmit = {handleSubmit}>
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
  <Box  sx={{
        width: 400,
        minHeight: 200,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px'
      }}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      {props.registerState === 'register' ? 'Register' : 'Login'}
    </Typography>
    {error && <Alert severity="error">{error}</Alert>}
            <TextField fullWidth name='email' value={state.email} onChange={changeHandler} id="email-textfield" label="Email" variant="standard" type='email' margin='dense' required />
            <TextField fullWidth name='password' value={state.password} onChange={changeHandler} id="password-textfield" label="Password" variant="standard" type='password' margin='dense' required />
            {registerState === 'register' &&
            <TextField fullWidth name='passwordConfirm' value={state.passwordConfirm} onChange={changeHandler} id="password-confirm-textfield"  label="Confirm Password" variant="standard" type='password' margin='dense' required />  
          }
            <div className='register-bottom'>
              <Button variant = 'contained' type='submit' disabled = {loading}>{props.registerState === 'register' ? 'Register' : 'Login' }</Button>
              {/* <MainButton type='contained' name={props.registerState === 'register' ? 'Register' : 'Login'} function={props.registerState === 'register' ? 'register' : 'login'} disabled = {loading}/> */}
            <Button variant='text' onClick={signInWithGoogle}>{props.registerState === 'register' ? 'Register with Google' : 'Login with Google'}</Button> 
            </div>
  </Box>
    </div>
    </form>

  )
}

export default Register