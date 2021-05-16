import React from 'react';

export const CreateContentPost = (props) => {
  return <div className={props.classes.content} dangerouslySetInnerHTML={{__html: props.text}}></div>
}