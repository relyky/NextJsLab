import { useState } from 'react'
import { Container, Box, Divider, Paper, IconButton, Avatar } from '@mui/material'
import { List, ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material'
import { FormControl, OutlinedInput } from '@mui/material'
import { H3 } from 'components/highorder'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import ss from './AppForm.module.css'
// hooks
import { addItem, rmvItem, toggleItem } from 'views/demo2/dm2030/todoListSlice'
// icons
import DoneIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/RadioButtonUnchecked';
import ClearIcon from '@mui/icons-material/Clear'

export default (props) => {
    const [newText, setNewText] = useState('');
    const todoList = useAppSelector(store => store.todoList)
    const dispatch = useAppDispatch()

    return (
        <Container>
            <H3>Todos</H3>

            <Paper sx={{ p: 2 }}>
                <FormControl fullWidth>
                    <OutlinedInput placeholder="What needs to bo done?"
                        value={newText}
                        onChange={e => setNewText(e.target.value)}
                        onKeyUp={e => {
                            if (e.key === 'Enter') {
                                dispatch(addItem(newText))
                                setNewText('')
                            }
                        }}
                    />
                </FormControl>
                <List>
                    {todoList.map((todo) => (
                        <ListItem key={todo.id} sx={{ p: 2, mb: 1 }}
                            secondaryAction={
                                <IconButton edge="end" onClick={()=> dispatch(rmvItem(todo.id))}>
                                    <ClearIcon />
                                </IconButton>
                            }
                        >
                            <ListItemIcon onClick={() => dispatch(toggleItem(todo.id))} >
                                {todo.completed ? <DoneIcon color="success" /> : <UndoIcon />}
                            </ListItemIcon>
                            <ListItemText>
                                {todo.text}
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    )
}
