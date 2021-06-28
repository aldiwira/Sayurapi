const yup = require("yup");

module.exports = {
  LoginValidator: () => {
    return yup.object().shape({
      username: yup.string().trim().min(5).required(),
      password: yup
        .string()
        .trim()
        .min(7)
        .matches(
          /^[a-zA-Z0-9]*$/gm,
          "Password must be format alphanumeric without space"
        )
        .required(),
    });
  },
  RegisterValidator: () => {
    return yup.object().shape({
      username: yup.string().trim().min(5).required(),
      password: yup
        .string()
        .trim()
        .min(7)
        .matches(
          /^[a-zA-Z0-9]*$/gm,
          "Password must be format alphanumeric without space"
        )
        .required(),
      name: yup.string().trim().required(),
    });
  },
  changePassword: () => {
    return yup.object().shape({
      oldpassword: yup
        .string()
        .trim()
        .min(7)
        .matches(
          /^[a-zA-Z0-9]*$/gm,
          "Password must be format alphanumeric without space"
        )
        .required(),
      newpassword: yup
        .string()
        .trim()
        .min(7)
        .matches(
          /^[a-zA-Z0-9]*$/gm,
          "Password must be format alphanumeric without space"
        )
        .required(),
    });
  },
};
