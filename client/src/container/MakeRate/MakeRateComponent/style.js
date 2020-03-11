import constants from 'style/constants';
export default {
  'make-rate': {
    marginTop: '20px',
  },

  'make-rate__container': {
    'max-width': '1240px',
    margin: 'auto',
    display: 'grid',
    'grid-template-areas': `
      "sitebar content"
      "sitebar content"
    `,
    'grid-template-rows': '200px 100%',
    'grid-template-columns': '2fr 10fr',
  },

  content: {
    'grid-area': 'content'
  },
}
