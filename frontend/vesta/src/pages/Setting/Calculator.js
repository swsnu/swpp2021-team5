export const recommendedCalorie = (age, sex, height, weight) => {
  if (sex === 'M') {
    return 66.47 + 13.75 * weight + 5 * height - 6.76 * age;
  }
  if (sex === 'F') {
    return 655.1 + 9.56 * weight + 1.85 * height - 4.68 * age;
  }
  return undefined; // value of sex is invalid
};

export const recommendedCarbs = (age, sex, height, weight) => {
  if (sex === 'M') {
    return 350; // not implemented
  }
  if (sex === 'F') {
    return 300; // not implemented
  }
  return undefined; // value of sex is invalid
};

export const recommendedProtein = (age, sex, height, weight) => {
  if (sex === 'M') {
    return 100; // not implemented
  }
  if (sex === 'F') {
    return 50; // not implemented
  }
  return undefined; // value of sex is invalid
};

export const recommendedFat = (age, sex, height, weight) => {
  if (sex === 'M') {
    return 30;// not implemented
  }
  if (sex === 'F') {
    return 15; // not implemented
  }
  return undefined; // value of sex is invalid
};
