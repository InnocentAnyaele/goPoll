import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button'

function SharePoll(props:any) {

  const shareLink = `http://localhost:3000/votePoll/${props.id}/${props.linkID}`
  
  function copyLink() {
    navigator.clipboard.writeText(shareLink)
    alert('Link copied')
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '40px'}}>
        <Box sx={{
             width: 400,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px'
        }}> 
<Typography id='modal-modal-title' variant='h6' component='h2'>
  <Button variant='text' onClick={copyLink}>Click this to copy link</Button>
    {/* <span>Link to poll </span> <ContentCopyIcon style={{color: 'blue'}} 
    
    onClick = {() => {

      navigator.clipboard.writeText(shareLink);
      alert('copied to clipboard'); 


    }}
    /> */}

</Typography>
<div style={{padding: '15px'}}>
    <a href={shareLink}><span>{shareLink}</span></a>
    </div>
        </Box>
    </div>
  )
}

export default SharePoll