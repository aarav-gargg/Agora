import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/users.model.js';


export const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const exists = await User.findOne({ email: email });

    if (exists) {
      return res.status(400).json({ message: "Email already exists." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      message: "User created successfully",
    })

  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email does not exist.' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Password is incorrect.' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: '2d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        message: "USER NOT FOUND"
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      })
    }
    if (user) {
      return res.status(200).json(user)
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export const verifyToken = async (req,res) => {
  try {
     const {token} = req.body;
     if(!token){
      return res.status(400).json({message: "Token is required"})
     }
     const decoded = jwt.verify(token, process.env.SECRET_KEY);
     return res.status(200).json({ valid: true, userId: decoded.id });
  } catch (error) {
    return res.status(401).json({ valid: false, message: "Token is invalid or expired" });
  }
}

export const hitApi = async (req,res) => {
  try {
    return res.status(200).json({
      message : "API HIT SUCCESSFULLY"
    })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message : error.message });
  }
}
