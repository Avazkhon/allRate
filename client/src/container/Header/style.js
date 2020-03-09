export default {
  header:  {
    display: 'grid',
    'grid-template-columns': '10fr 2fr',
    'border-bottom': '.5px solid #dcdcdc',
  },

  'header__navbar': {
    'list-style-type': 'none',
    display: 'grid',
    'grid-template-columns': '1fr 1fr 1fr 1fr',
  },

  'header__item:hover': {
    opacity: '.6',
  },

  'header__item a': {
    color: 'black',
  },

  'header__auth-btn': {
    'min-width': '100px',
    'border-radius': '5px',
    cursor: 'pointer',
  },

  'header__auth': {
    width: '200px',
    position: 'relative',
  },

  'header_container': {
    position: 'absolute',
    'background-color': 'white',
    'z-index': 1,
  },

  // 'header__auth': {
  // },
}