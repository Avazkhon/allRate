export default {
  'me-page': {
    marginTop: '20px',
  },
  'me-page__container': {
    'max-width': '1240px',
    margin: 'auto',
    display: 'grid',
    'grid-template-areas': `"sitebar profile"
                         "sitebar content"
                         "sitebar content"`,
    'grid-template-rows': '200px 100%',
    'grid-template-columns': '2fr 10fr',
  },

  'profile-user': {
    'grid-area': 'profile'
  },

  'sitebar': {
    'grid-area': 'sitebar',
    border: '.5px solid #dcdcdc',
  },

  'sitebar-links': {
    'margin-left': '5px'
  },

  'sitebar-link': {
    margin: '5px 0 0 5px',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.6',
    }
  },


  'content-user': {
    'grid-area': 'content',
    border: '.5px solid #dcdcdc',
  },
}
