import { Button, ButtonGroup } from '@mui/material'

export default (props: {
  value: string,
  onChange: (value: string) => void
}) => {
  return (
    <ButtonGroup variant="outlined">
      <Button variant={props.value === 'all' ? 'contained' : 'outlined'} 
        onClick={()=>props.onChange('all')}>All</Button>
      <Button variant={props.value === 'active' ? 'contained' : 'outlined'}
        onClick={()=>props.onChange('active')}>Active</Button>
      <Button variant={props.value === 'completed' ? 'contained' : 'outlined'}
        onClick={()=>props.onChange('completed')}>Completed</Button>
    </ButtonGroup>
  );
}