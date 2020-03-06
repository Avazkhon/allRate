import React from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';
// import styles from '';
const CustomDocumentHOC = (store) => {
  class CustomDocument extends React.Component {
    static async getInitialProps({ assets, data, renderPage }) {
      const page = await renderPage(App => props =>
        <App {...props} />
      );
      const css = "styles".toString();
      return { assets, data, ...page, css };
    }

    render() {
      const {
        helmet,
        assets,
        data,
        css,
      } = this.props;


      const htmlAttrs = helmet.htmlAttributes.toComponent();
      const bodyAttrs = helmet.bodyAttributes.toComponent();

      return (
        <html {...htmlAttrs}>
          <head>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta charSet="utf-8" />
            <title>British patterns</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            {assets.client.css && (
              <link rel="stylesheet" href={assets.client.css} />
            )}

            {process.env.NODE_ENV === 'production' ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: `<script src="${assets.client.js}" defer></script>`,
                }}
              />
            ) : (
              <span
                dangerouslySetInnerHTML={
                  { __html: `<script src="${assets.client.js}" defer crossorigin></script>` } // prettier-ignore
                }
              />
            )}
          </head>
          <body {...bodyAttrs}>
            <AfterRoot />
            <AfterData data={data} />
          </body>
          <style

            dangerouslySetInnerHTML={
              { __html: `html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}`}
            }
          />

          <style
            dangerouslySetInnerHTML={
              { __html: `.fa, .fab, .fad, .fal, .far, .fas {
                -webkit-font-smoothing: antialiased;
                display: inline-block;
                font-style: normal;
                font-variant: normal;
                text-rendering: auto;
                line-height: 1;
              }` }
            }
          />

          <style id="server-side-styles">
            {css}
          </style>

          <script
            // __PRELOADED_STATE__
            dangerouslySetInnerHTML={
              { __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}` } // prettier-ignore
            }
          />
          <style
            dangerouslySetInnerHTML={
              { __html: `@import url("https://use.fontawesome.com/releases/v5.11.1/css/all.css")` }
            }
          />

        </html>
      );
    }
  }
  return CustomDocument;
}

export default CustomDocumentHOC;
