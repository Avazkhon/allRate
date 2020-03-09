export default {
  'profile-user': {
    width: '100%',
    height: '200px',
    border: '.5px solid #dcdcdc',
  },

  'profile-user__container': {
    margin: 'auto',
    display: 'grid',
    'grid-template-areas': `"avatar content"
                         "avatar content"
                         "edit content"`,
    'grid-template-rows': '50px 100px',
    'grid-template-columns': '4fr 8fr',
  },

  avatar: {
    'grid-area': 'avatar',
  },

  'profile-user_edit': {
    'grid-area': 'edit',
  },

  'profile-user__content': {
    'grid-area': 'content',
  },

}
