import type { Theme } from "@mui/material";
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<{ param0: boolean }>()(
  (theme: Theme, params) => {
    const { palette } = theme
    return {
      root: {
      },
      todoItem: {
        '&:nth-of-type(odd)': {
          backgroundColor: palette.grey[100],
        },
        '&:hover': {
          backgroundColor: palette.action.focus
        },
        '& button': {
          color: 'transparent'
        },
        '&:hover button': {
          color: palette.error.main
        },
        '&.completed span': {
          color: palette.grey[500],
          textDecoration: 'line-through'
        },
      },
    }
  }
);
