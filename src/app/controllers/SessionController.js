import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    if (email === 'user@test.com' && password === '123456') {
      const token = jwt.sign(
        {
          email,
          password,
        },
        authConfig.secret,
        {
          expiresIn: authConfig.ttl,
        },
      );

      return res.status(200).send({ token });
    }

    return res.status(404).send({ message: 'user not found' });
  }
}

export default new SessionController();
