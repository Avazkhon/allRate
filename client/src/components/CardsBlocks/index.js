import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Collapse,
  CardContent,
} from '@material-ui/core';

import CardBlock from 'components/CardBlock';

const useStyles = makeStyles({
  // root: {
  //   maxWidth: 345,
  // },
  // media: {
  //   height: 140,
  //   width: 200,
  // },
});

function CardsBlocks(
  {
    blocks,
  }
) {
  const classes = useStyles();

  return (
    < >
      {
        blocks.data._id && blocks.data.blocks.map((block) => {
          return (
            <Collapse in={true} key={block._id}>
              <CardContent>
                <CardBlock
                  block={block}
                  key={block._id}
                />
              </CardContent>
            </Collapse>
          )
        })
      }
    </>
  );
}

CardsBlocks.propTypes = {
  blocks: PropTypes.shape(),
}

export default CardsBlocks;