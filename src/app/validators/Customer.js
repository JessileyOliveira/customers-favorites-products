import * as Yup from 'yup';

const ValidatorCustomer = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      name: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(422)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};

export default ValidatorCustomer;
