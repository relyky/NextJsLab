import { Button, ButtonGroup } from '@mui/material'

export default (props: {
  value: string,
  onChange: (value: string) => void
}) => {
  return (
    <ButtonGroup variant="outlined">
      <Button {...calcProps(props.value, 'all')}
        onClick={() => props.onChange('all')}>All</Button>
      <Button {...calcProps(props.value, 'active')}
        onClick={() => props.onChange('active')}>Active</Button>
      <Button {...calcProps(props.value, 'completed')}
        onClick={() => props.onChange('completed')}>Completed</Button>
    </ButtonGroup>
  );
}

function calcProps(value: string, target: string): object {
  return target === value ? { variant: 'contained' } : null;
}
