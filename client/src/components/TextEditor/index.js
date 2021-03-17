import React, { useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import SunEditor from 'suneditor-react';

const options = {
  "rtl": false,
	"katex": "window.katex",
	"imageResizing": false,
	"imageHeightShow": false,
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
			// "formatBlock",
			// "paragraphStyle",
			// "blockquote",
			"bold",
			"underline",
			"italic",
			// "strike",
			// "subscript",
			// "superscript",
			"fontColor",
			"hiliteColor",
			"textStyle",
			// "removeFormat",
			// "outdent",
			// "indent",
			"align",
			// "horizontalRule",
			"list",
			// "lineHeight",
			"table",
			"link",
			"image",
			"video",
			// "audio",
			// "math",
			// "imageGallery",
			"fullScreen",
			"showBlocks",
			// "codeView",
			"preview",
			// "print",
			"save",
			// "template"
		]
	],
}

const MyComponent = ({
  handleSubmit,
  text
}) => {
    const editorRef = useRef();

    useEffect(() => {
        // Get underlining core object here
        // Notice that useEffect is been used because you have to make sure the editor is rendered.
        console.log(editorRef.current.editor.core);
    }, []);

    options.callBackSave = handleSubmit

    return (
        <div>
            <p> Контент статьи </p>
            <SunEditor
              setOptions={options}
              ref={editorRef}
              defaultValue={text}
            />
        </div>
    );
};

MyComponent.propTypes = {
  handleSubmit: PropTypes.func,
  text: PropTypes.string,
}

export default MyComponent;
