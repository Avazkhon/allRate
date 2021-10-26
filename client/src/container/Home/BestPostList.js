import React from 'react';
import { Typography } from '@material-ui/core';
import { getAuthor } from 'utils';
import { CardPost } from 'components/CardPost';

export const BestPostList = (props) => {
  const {
    postsBest,
    classes,
    handleChangeRatingPost,
    handleAddCountViewsPost,
    users,
    lang,
    auth,
  } = props;
  return (
    <>
      {postsBest.docs && (
        <div>
          <Typography variant="h4" className={classes.bestPost}>
            Лучшие статьи
          </Typography>
          {postsBest.docs &&
            postsBest.docs.map((itm) => {
              return (
                <div key={itm._id} className={classes.postItem}>
                  <CardPost
                    changeRating={handleChangeRatingPost}
                    onAddCountViewsPost={() => handleAddCountViewsPost(itm._id)}
                    post={itm}
                    user={users.data?.docs && getAuthor(users.data.docs, itm)}
                    lang={lang}
                    auth={auth}
                  />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};
