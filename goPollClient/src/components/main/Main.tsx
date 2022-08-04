// import MainButton from '../button/MainButton'
import Button from '@mui/material/Button'
import './Main.css'
import Register from '../register/Register'
import {useState} from 'react'
import Modal from '@mui/material/Modal'
import GoPoll from '../goPOLL/GoPoll'
import { useNavigate } from "react-router-dom";


function Main() {

  const [open, setOpen] = useState(false)
  const [registerState, setRegisterState] = useState('')
  const history = useNavigate()

  function handleLogin(){
    if (localStorage.getItem('email')){
      history('/poll')
    }
    else {
      setRegisterState('login')
        setOpen(true)
    }
  }

  return (
    <div className="main">
      <Modal
  open={open}
  onClose={() => setOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Register registerState = {registerState}/>
</Modal>
<GoPoll/>
      {/* <MainButton className='create-poll-button' name="Create or Go to Poll" type="contained" /> */}
      <Button className = 'create-poll-button' variant='contained' onClick={handleLogin}>Create or Go to Poll</Button>
      <Button className='register' variant='text' onClick={() =>{ setRegisterState('register'); setOpen(true); }} >Register</Button>
      <div style={{width: '400px', textAlign: 'center', margin: '15px'}}>
        <span>contact developer @ <span style={{color: 'blue'}}>innocentanyaele2000@gmail.com</span> <br></br> for suggestions & concerns </span>
      </div>
    </div>
  )
}

export default Main