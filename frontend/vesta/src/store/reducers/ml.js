import * as actionTypes from '../actions/actionType';

const initialState = {
  detectedMenu: [
    {'id': 2059, 'name': 'point cream cake', 'prob': 0.09235107995766156, 'subclasses': []},
    {'id': 849, 'name': 'nut cake', 'prob': 0.09169057958570193, 'subclasses': []},
    {'id': 293, 'name': 'chocolate turron', 'prob': 0.08746091571309081, 'subclasses': []},
    {'id': 2120, 'name': 'sugar', 'prob': 0.07843130274501164, 'subclasses': []},
    {'id': 1836, 'name': 'chocolate flakes', 'prob': 0.0383072764154349, 'subclasses': []},
    {'id': 1857, 'name': 'cream', 'prob': 0.009033033847299522, 'subclasses': []}
  ],
};
const mlReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DETECT:
      return { ...state, detectedMenu: action.detectedMenu };
    default:
      break;
  }
  return state;
};

export default mlReducer;
