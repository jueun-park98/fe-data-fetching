export const delay: (ms: number) => void = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateRandomNumber: (min: number, max: number) => number = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomBoolean: () => boolean = () => {
  return Math.random() >= 0.5 ? true : false;
}