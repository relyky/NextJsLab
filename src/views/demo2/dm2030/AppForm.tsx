// type
import type { TodoItem } from 'views/demo2/dm2030/todoListSlice'
//
import { Container, Stack, Box, Divider, Paper, IconButton, Button } from '@mui/material'
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import { OutlinedInput } from '@mui/material'
import { H3, P1 } from 'components/highorder'
import RadioField from './RadioFiled'
// hooks
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { addItem, rmvItem, toggleItem, activeCount, clearCompleted } from 'views/demo2/dm2030/todoListSlice'
// icons
import DoneIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/RadioButtonUnchecked';
import ClearIcon from '@mui/icons-material/Clear'
// CSS
import clsx from 'clsx'
import { styled, useTheme } from '@mui/material/styles'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export default (props) => {
    const todoList = useAppSelector(store => store.todoList)
    const todoActiveCount = useAppSelector(activeCount)
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
                                            <IconButton edge="end" onClick={() => dispatch(rmvItem(todo.id))}>
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
                                        }}
                                    >
                                        <ListItemIcon onClick={() => dispatch(toggleItem(todo.id))}>
                                            {todo.completed ? <DoneIcon color="success" /> : <UndoIcon />}
                                        </ListItemIcon>
                                        <ListItemText sx={{ color: todo.completed ? palette.grey[500] : 'inherit' }}>
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
                    <Button variant="text" onClick={() => dispatch(clearCompleted())}>Clear completed</Button>
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
