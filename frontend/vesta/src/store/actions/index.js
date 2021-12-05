export {
  saveUserSetting, getUserSetting, deleteUserAccount, signUp, getUserNutrition, createUserNutrition, editUserNutrition,
} from './User/user';
export {
  getMenu, getRecommendedMenus, getCountAll, changeRecommendation,
} from './Menu/menu';
export {
  getRecord, getRecords, addRecord, toggleRecord, getReview, createReview, editReview, deleteReview,
} from './Record/record';
export { detect } from './ML/ml';
export { logIn, logout } from './User/user';
