import Users from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      // memasang Attribut yang berguna untuk menentukan kolom mana yang akan diambil dari tabel basis data yang dituju untuk ditampilkan pada response
      attributes: ['id', 'name', 'email'],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword) {
    res.status(400).json({ message: 'Password not match' });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      await Users.create({
        name: name,
        email: email,
        password: hashPassword,
      });
      res.json({ msg: 'Register Success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const Login = async (req, res) => {
  try {
    // cari user menggunakan email
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    // jiak email ditemukan kita akan bandingkan password yang diinputkan dengan password yang ada di database
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: 'Wrong Password' });
    //  jika passwordnya cocok
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    // access token
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '20s' }
    );
    // refresh token
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    //simpan refresh tokennya kedalam database
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    // http cookie yang dikirim ke client
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // kirim response ke client
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: 'User not found' });
  }
};
