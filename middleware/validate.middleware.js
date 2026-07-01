export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.issues?.map((e) => e.message),
    });
  }
};
export const validate1 = (schema) => (req, res, next) => {
  try {
    req.params = schema.parse(req.params);
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.issues?.map((e) => e.message),
    });
  }
};
