import React from 'react';
import PropTypes from 'prop-types';

const  CreateMainProps = ({
  title,
  description,
  handleChange
}) => (
  <div className="creat-pain-props">
    <input
      value={title}
      onChange={handleChange}
      placeholder="Ввидите заголовок"
      className="create-rate_input"
      type="text"
      name="title"
    >
    </input>
    <textarea
      value={description}
      onChange={handleChange}
      placeholder="Ввидите описание"
      className="create-rate_textarea"
      name="description"
    >
    </textarea>
  </div>
)
CreateMainProps.propType = {
  title: PropTypes.string,
  description: PropTypes.string,
  handleChange: PropTypes.func,
}

export default CreateMainProps;
