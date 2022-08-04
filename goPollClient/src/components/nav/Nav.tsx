import GoPoll from '../goPOLL/GoPoll'
import './Nav.css'
import Button from '@mui/material/Button'
import {auth} from '../../Firebase'
import {signOut} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function Nav(props: any) {

  const history = useNavigate()

  async function logOut () {
    await signOut(auth)
    .then(()=>{
      localStorage.clear()
      history('/')
    })
    .catch()
  }
  const currentUser = localStorage.getItem('email')
  return (
    <div className='nav' style={{width: '100%', height: '50px', margin: '0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div>
          <span><GoPoll/></span>
          </div>
        <div style={{padding: '5px', fontWeight: 'bold'}}>
          <span style={{fontSize: '12px'}}>{currentUser} </span>
          <Button variant='text' onClick={logOut}>Sign out</Button>
        </div>
    </div>
  )
}

export default Nav