// type
import type { TodoItem } from 'views/demo2/dm2030/todoListSlice'
//
import { Container, Stack, Box, Divider, Paper, IconButton, Button, InputAdornment } from '@mui/material'
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import { OutlinedInput } from '@mui/material'
import { H3, P1 } from 'components/highorder'
import RadioField from './RadioFiled'
// hooks
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
//import { addItem, rmvItem, toggleItem, activeCount, clearCompleted, checkAllItem } from 'views/demo2/dm2030/todoListSlice'
import * as act from 'views/demo2/dm2030/todoListSlice'
// icons
import DoneIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/RadioButtonUnchecked';
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
// CSS
import clsx from 'clsx'
import { styled, useTheme } from '@mui/material/styles'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export default (props) => {
    const todoList = useAppSelector(store => store.todoList)
    const todoActiveCount = useAppSelector(act.activeCount)
    const dispatch = useAppDispatch()
    const { palette } = useTheme()
    const [newText, setNewText] = useState('')
    const [filterCond, setFilterCond] = useState('all')


    const filterHandler = (todo: TodoItem) => (
        filterCond === 'all' ||
        filterCond === 'active' && !todo.completed ||
        filterCond === 'completed' && todo.completed
    );

    return (
        <Container>
            <H3>Todos</H3>
            <P1>新增(mount)與移除(unmount)加入過場動畫。<br />
                並條紋化與hover。<br />
                參考：<a href="http://chenglou.github.io/react-motion/demos/demo3-todomvc-list-transition/" target="_blank">RedoMVC</a>
            </P1>

            <Paper sx={{ p: 2 }}>
                <OutlinedInput placeholder="What needs to bo done?"
                    fullWidth
                    value={newText}
                    onChange={e => setNewText(e.target.value)}
                    onKeyUp={e => {
                        if (e.key === 'Enter') {
                            dispatch(act.addItem(newText))
                            setNewText('')
                        }
                    }}
                    startAdornment={
                        <InputAdornment position="start">
                            <CheckIcon sx={{ cursor: 'pointer' }} onClick={() => dispatch(act.checkAllItem())} />
                        </InputAdornment>
                    }
                />
                <List>
                    <TransitionGroup>
                        {todoList.filter(filterHandler)
                            .filter(c => c.text && c.text.includes(newText))
                            .map((todo) => (
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
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" sx={{ color: 'transparent' }} onClick={() => dispatch(act.rmvItem(todo.id))}>
                                                <ClearIcon />
                                            </IconButton>
                                        }
                                        sx={{
                                            // stripe, 產生條紋
                                            '&:nth-of-type(odd)': {
                                                backgroundColor: palette.grey[100],
                                            },
                                            '&:hover': {
                                                backgroundColor: palette.action.focus
                                            },
                                            '&:hover button': {
                                                color: palette.error.main
                                            },
                                        }}
                                    >
                                        <ListItemIcon onClick={() => dispatch(act.toggleItem(todo.id))}>
                                            {todo.completed ? <DoneIcon color="success" /> : <UndoIcon />}
                                        </ListItemIcon>
                                        <ListItemText sx={todo.completed ? { color: palette.grey[500], textDecoration: 'line-through' } : null}>
                                            {todo.text}
                                        </ListItemText>
                                    </ListItem>
                                </CSSTransition>
                            ))}
                    </TransitionGroup>
                </List>

                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                    <P1>{todoActiveCount} items left</P1>
                    <RadioField value={filterCond} onChange={setFilterCond} />
                    <Button variant="text" onClick={() => dispatch(act.clearCompleted())}>Clear completed</Button>
                </Stack>
            </Paper>
        </Container >
    )
}

//=============================================================================
// const StyledListItem = styled(ListItem)(({ theme }) => ({
//     // stripe, 產生條紋
//     '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.grey[100],
//     },
//     '&:hover': {
//         backgroundColor: theme.palette.action.focus
//     },
// }));
