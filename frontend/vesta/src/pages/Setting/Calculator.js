export const recommendedCalorie = (age, sex, height, weight) => {
  if (sex === 'M') {
    return 66.47 + 13.75 * weight + 5 * height - 6.76 * age;
  }
  if (sex === 'F') {
    return 655.1 + 9.56 * weight + 1.85 * height - 4.68 * age;
  }
  return undefined; // value of sex is invalid
};

export const recommendedCarbs = (recommendedCalorie) => {
  return ((recommendedCalorie*0.5) / 4)  // carbs: 4 kcal per 1g
};

export const recommendedProtein = (recommendedCalorie) => {
  return ((recommendedCalorie*0.3) / 4)  // protein: 4 kcal per 1g
};

export const recommendedFat = (recommendedCalorie) => {
  return ((recommendedCalorie*0.2) / 9)  // fat: 9 kcal per 1g
};
