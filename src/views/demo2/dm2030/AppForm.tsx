import { Container, Box, Divider, Paper, IconButton, ListItemButton } from '@mui/material'
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import { OutlinedInput } from '@mui/material'
import { H3, P1 } from 'components/highorder'
// hooks
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { addItem, rmvItem, toggleItem } from 'views/demo2/dm2030/todoListSlice'
// icons
import DoneIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/RadioButtonUnchecked';
import ClearIcon from '@mui/icons-material/Clear'
// CSS
import clsx from 'clsx'
import { styled, useTheme } from '@mui/material/styles'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export default (props) => {
    const { palette } = useTheme()
    const [newText, setNewText] = useState('')
    const todoList = useAppSelector(store => store.todoList)
    const dispatch = useAppDispatch()

    return (
        <Container>
            <H3>Todos</H3>
            <P1>新增(mount)與移除(unmount)加入過場動畫。<br />並條紋化與hover。</P1>

            <Paper sx={{ p: 2 }}>
                <OutlinedInput placeholder="What needs to bo done?"
                    fullWidth
                    value={newText}
                    onChange={e => setNewText(e.target.value)}
                    onKeyUp={e => {
                        if (e.key === 'Enter') {
                            dispatch(addItem(newText))
                            setNewText('')
                        }
                    }}
                />
                <List>
                    <TransitionGroup>
                        {todoList.map((todo) => (
                            <CSSTransition
                                key={todo.id}
                                timeout={400}
                                classNames={{
                                    enter: "animate__animated",
                                    enterActive: "animate__fadeInUp",
                                    exit: "animate__animated",
                                    exitActive: "animate__backOutDown"
                                }}
                            >
                                <StyledListItem
                                    secondaryAction={
                                        <IconButton edge="end" onClick={() => dispatch(rmvItem(todo.id))}>
                                            <ClearIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemIcon onClick={() => dispatch(toggleItem(todo.id))}>
                                        {todo.completed ? <DoneIcon color="success" /> : <UndoIcon />}
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: todo.completed ? palette.grey[500] : 'inherit' }}>
                                        {todo.text}
                                    </ListItemText>
                                </StyledListItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </List>


                
            </Paper>
        </Container >
    )
}

//=============================================================================
const StyledListItem = styled(ListItem)(({ theme }) => ({
    // stripe, 產生條紋
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.grey[100],
    },
    '&:hover': {
        backgroundColor: theme.palette.action.focus
    },
}));
