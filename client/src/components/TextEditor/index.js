import React, { useRef } from "react";
import PropTypes from 'prop-types';
import SunEditor from 'suneditor-react';

const options = {
  "rtl": false,
	"katex": "window.katex",
	"imageFileInput": false,
	"videoFileInput": false,
	"tabDisable": false,
	"mediaAutoSelect": false,
	"buttonList": [
		[
			"undo",
			"redo",
			"font",
			"fontSize",
			"formatBlock",
			"paragraphStyle",
			"bold",
			"underline",
			"italic",
			"fontColor",
			"hiliteColor",
			"textStyle",
			"align",
			"list",
			"table",
			"link",
			"image",
			"video",
			"fullScreen",
			"showBlocks",
			"preview",
			"save"
		]
	],
}

const TextEditor = ({
  handleSubmit,
  text
}) => {
    const editorRef = useRef();
    options.callBackSave = handleSubmit;
    return (
        <div>
            <p> Контент статьи </p>
            <SunEditor
              setOptions={options}
              ref={editorRef}
              defaultValue={text}
							setContents={text}
							height="200px"
            />
        </div>
    );
};

TextEditor.propTypes = {
  handleSubmit: PropTypes.func,
  text: PropTypes.string,
}

export default TextEditor;
