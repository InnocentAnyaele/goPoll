// import {data} from './dummyPolls'
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal'
import { useState, useEffect } from 'react';
import SharePoll from './SharePoll'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import {Link} from 'react-router-dom'


import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function ViewPolls() {

  const [open, setOpen] = useState(false)
  // const [registerState, setRegisterState] = useState('')
  const [linkID, setLinkID] = useState('')
  const [id, setID] = useState('')
  const [loading, setLoading] = useState(true)
  const userMail = localStorage.getItem('email')
  const [error, setError] = useState('')
  const [data, setData] = useState([])
  const [alertVariant, setAlertVariant] = useState('error')


  useEffect(() => {
    console.log('reached effect')
    axios.get(`viewPolls/${userMail}/`)
    .then((res) => {
      if (res.status === 200) {
        setData(res.data.data)
        setLoading(false)
        console.log(res.data.data)
      }
      else {
        setAlertVariant('error')
        setError('Could not retrieve polls at this time')
            return

      }
    })
    .catch(() => {
      setError('Could not retrieve polls at this time')
      return 
    })
  },[])

  function deletePollHandler(deleteID:any) {
    console.log(deleteID)
    axios.delete(`deletePoll/${deleteID}`)
    .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          setAlertVariant('success')
          setError('Poll deleted')
          // setTimeout(function() {
          //     setError('')
          // }, 2000);
          window.location.reload();
          return
        }
        else if(res.status === 500){
          console.log(res.data)
          setAlertVariant('error')
          setError('Could not delete')
          return 
        }

    })
    .catch(() => {
      setAlertVariant('error')
      setError('Could not delete')
      setTimeout(function() {
              setError('')
          }, 2000);
      return
    })
  }
  

  // let dummydata = data
  // console.log(dummydata)

  return (
    
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Modal
         open={open}
  onClose={() => setOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description">
<SharePoll linkID = {linkID} id = {id}/>
      </Modal>

        <h3 style={{marginBottom: '10px'}}>view go<span style={{color: 'blue', fontWeight: 'bolder'}}>POLL</span></h3>
{error && <Alert severity={alertVariant === 'error' ? 'error' : 'success'}>{error}</Alert>}

{ 



loading ? <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  :

<div>
  {
    data.map((item) => (
     <div className='' style={{display: 'flex', flexDirection: 'row', margin: '10px', fontSize: '15px'}} key = {item['id']}>
          <div style={{width: '160px'}}>
          <Link to={`/votePoll/${item['id']}/${item['pollLink']}`}>{item['pollName']}</Link>
          </div>
          {/* <span style={{width: '100px'}}>{item.votes} votes</span> */}
          {/* <div style={{width: '80px'}}>
          <span>{item['pollCreatedAt']}</span>
          </div> */}
          <ShareIcon style={{color: 'blue'}} onClick={() => {setLinkID(item['pollLink']); setID(item['id']); setOpen(true) }} />
          <DeleteIcon style={{color: 'blue'}} onClick={() => deletePollHandler(item['id'])} />
        </div>

    ))
  }
</div>





}
      
      


    </div>
  )
}

export default ViewPolls