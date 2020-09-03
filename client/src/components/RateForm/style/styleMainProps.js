import colorLib from 'utils/colorLib';
const {
  WHITE,
  NAVY,
  BLACK,
  YELLOW,
  YELLOW_GREEN,
} = colorLib;

export default {
  'main-props__btn-group': {
    marginTop: '15px',
    display: 'grid',
    'grid-template-columns': '4fr 2fr 2fr 4fr',

  },

  'size-text': {
    fontSize: '11px',
  },

  'main-props__radio-group': {
    display: 'flex',
    justifyContent: 'space-between',

    '& div': {
      justifyContent: 'center'
    }
  },

  'main-props_btn-default': {
    background: YELLOW,
    color: BLACK,
    borderStyle: 'none',
    borderRadius: '7%',
    padding: '5px',

    '&:hover': {
      background: NAVY,
    },
  },
  'main-props_btn-select': {
    background: YELLOW_GREEN,
    color: WHITE,
    borderStyle: 'none',

    '&:hover': {
      background: NAVY,
    },
  },
}
