import React from "react";
import { render } from "react-dom";
import App from "./app/App";
import InitApp from "./app/components/InitApp";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import fbConfig from "./config/fbConfig";

/* eslint-disable no-underscore-dangle */
// const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
// const devtoolMiddleware = ext && ext();
/* eslint-enable */

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk.withExtraArgument({ getFirebase, getFirestore }),
      logger
    ),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, {
      useFirestoreForProfile: true,
      userProfile: "users",
      attachAuthIsReady: true
    }),
    // devtoolMiddleware
  )
);

store.firebaseAuthIsReady.then(() => {
  render(<Main />, document.getElementById("root"));
});

const Main = () => (
  <Provider store={store}>
		{/*<InitApp> */}
     <App />
		{/*</InitApp> */}
  </Provider>
);

serviceWorker.unregister();
