import Button from '@mui/material/Button'


function button(props: any) {
  return (
   <Button className='reusable-button' variant={props.type}>{props.name}</Button>
  )
}

export default button