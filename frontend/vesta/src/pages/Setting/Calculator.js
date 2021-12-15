/* eslint-disable */
export const recommendedCalorie = (age, sex, height, weight) => {
  if (sex === true) {
    return (height - 100) * 0.9 * 35;
  } else if (sex === false) {
    return (height - 100) * 0.9 * 30;
  }
};

export const recommendedCarbs = (recommendedCalorie_) => ((recommendedCalorie_ * 0.5) / 4); // carbs: 4 kcal per 1g

export const recommendedProtein = (recommendedCalorie_) => ((recommendedCalorie_ * 0.3) / 4); // protein: 4 kcal per 1g

export const recommendedFat = (recommendedCalorie_) => ((recommendedCalorie_ * 0.2) / 9);
