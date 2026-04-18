const User = require("./user.model");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    const user = new User({ name, email: email.toLowerCase(), password });
    await user.save();

    return res.status(201).json({ message: "User registered" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token: "dummy-jwt-token" // Add real JWT later if needed
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
