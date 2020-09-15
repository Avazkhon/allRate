import colorLib from 'utils/colorLib';
const {
  WHITE,
  MEDIUM_BLUE,
  NAVY,
  ORANGE_RED,
} = colorLib;

export default {
  'btn-group': {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'space-between',

    '& button': {
      background: MEDIUM_BLUE,
      color: WHITE,
      borderStyle: 'none',
      borderRadius: '7%',
      padding: '5px',

      '&:hover': {
        background: NAVY,
      },
    },
  },
  isNotFilled: {
    border: `1px solid ${ORANGE_RED}`,
  }
}
