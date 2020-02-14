import * as Yup from 'yup';

export const ValidatorSession = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(422)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
