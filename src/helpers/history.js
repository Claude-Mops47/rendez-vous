
// export const history ={
//     navigate: null,
//     location: null
// }

import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

export const history = {
  ...browserHistory,
  navigate: browserHistory.push,
  location: browserHistory.location
};
