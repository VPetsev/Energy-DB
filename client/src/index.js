import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from "redux"
import { viewStates, categories } from "./config";
import { wells as data } from "./data"
import { SCATTERPLOT_CONTROLS } from "./Controls"


const initialState = {
  viewStates,
  data,
  hover: {
    x: 0,
    y: 0,
    hoveredObject: null
  },
  settings: Object.keys(SCATTERPLOT_CONTROLS).reduce(
      (accu, key) => ({
        ...accu,
        [key]: SCATTERPLOT_CONTROLS[key].value,
      })),
  categories: categories,
  activeLayer: 'scatter',
  activeMetric: 'wells',
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action;
  const stateCopy = { ...state }

  if (type === "SET_ACTIVE") {
      const { key, value } = payload;
      if (key === 'wells') {
         stateCopy.activeMetric = value;
      } else if (key === 'layer') {
         stateCopy.activeLayer = value;
      } else if (key === 'view') {
         stateCopy.activeView = value;
      }
   } else if (type === 'SET_CATEGORY') {
      const categories = [...stateCopy.categories];
        categories.forEach((category) => {
         if (category.name === payload) {
            category.active = !category.active;
         }
      });
      stateCopy.categories = categories;
  }
  return stateCopy;
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById("root")
);

