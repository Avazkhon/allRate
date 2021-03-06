import React from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';

import {
  JssProvider,
  SheetsRegistry,
} from 'react-jss';
import theme from '../theme';

import initStyle from './style.css';
import textEditorStyle from 'suneditor/dist/css/suneditor.min.css';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider, ServerStyleSheets } from '@material-ui/core/styles';



const CustomDocumentHOC = (store) => {
  class CustomDocument extends React.Component {
    static async getInitialProps({ assets, data, renderPage }) {
      const sheets = new SheetsRegistry();
      const sheetsMui = new ServerStyleSheets();

      const page = await renderPage(App => props =>
        sheetsMui.collect(
          <JssProvider
            registry={sheets}
            id={process.env.RAZZLE_APP_MINIMIZE_CLASSES && {minify: true}}
          >
            <ThemeProvider theme={theme}>
              <App {...props} />
            </ThemeProvider>
          </JssProvider>
        )
      );
      const css = sheets.toString();
      const cssMui = sheetsMui.toString();
      return { assets, data, ...page, css, cssMui };
    }

    render() {
      const {
        helmet,
        assets,
        data,
        css,
        cssMui,
      } = this.props;
      const htmlAttrs = helmet.htmlAttributes.toComponent();
      const bodyAttrs = helmet.bodyAttributes.toComponent();
      return (
        <html {...htmlAttrs}>
          <head>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta charSet="utf-8" />
            <title>Face Betting</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            {
              // assets.client.css && (
              //   <link rel="stylesheet" href={assets.client.css} />
              // )
            }
            {
              process.env.NODE_ENV === 'production' && (
                <>
                  <meta name="yandex-verification" content="5f3875621a0f30ed" />
                  <meta name="google-site-verification" content="aHSr_XmZNFRYAKnP5OE9XjAQtujXOLqPEd4r7jB1YQA" />
                  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-66498150-1"></script>
                </>
              )
            }

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
          <style id="server-side-styles">
          {css}
          </style>
          <style id="jss-server-side">
            {cssMui}
          </style>
          <style dangerouslySetInnerHTML={ { __html: bootstrap} } />
          <style dangerouslySetInnerHTML={ { __html: textEditorStyle} } />
          <style dangerouslySetInnerHTML={ { __html: initStyle} } />

          <body {...bodyAttrs}>
            <AfterRoot />
            <AfterData data={data} />
          </body>

          <script
            // __PRELOADED_STATE__
            dangerouslySetInnerHTML={
              { __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}` } // prettier-ignore
            }
          />

        </html>
      );
    }
  }
  return CustomDocument;
}

export default CustomDocumentHOC;
