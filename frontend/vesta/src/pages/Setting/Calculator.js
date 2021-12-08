/* eslint-disable */
export const recommendedCalorie = (age, sex, height, weight) => {
  if (sex === true) {
    return 66.47 + 13.75 * weight + 5 * height - 6.76 * age;
  }
  else (sex === false) {
    return 655.1 + 9.56 * weight + 1.85 * height - 4.68 * age;
  }
};

export const recommendedCarbs = (recommendedCalorie_) => ((recommendedCalorie_ * 0.5) / 4); // carbs: 4 kcal per 1g

export const recommendedProtein = (recommendedCalorie_) => ((recommendedCalorie_ * 0.3) / 4); // protein: 4 kcal per 1g

export const recommendedFat = (recommendedCalorie_) => ((recommendedCalorie_ * 0.2) / 9);
