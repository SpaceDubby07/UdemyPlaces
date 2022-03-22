import React from "react";
import PlacesNavigator from "./navigation/PlacesNavigator";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import placesReducers from "./store/places-reducers";
import { init } from "./helpers/db";

// check if db is working
init()
  .then(() => {
    console.log("db initialized");
  })
  .catch((err) => {
    console.log("db initialization failed");
    console.log(err);
  });

//Create our root reducer
const rootReducer = combineReducers({
  places: placesReducers,
});

//Create our store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
