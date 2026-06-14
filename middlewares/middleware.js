export const middleware = (req, res, next) => {
  console.log("middleware running");

  next();
};
