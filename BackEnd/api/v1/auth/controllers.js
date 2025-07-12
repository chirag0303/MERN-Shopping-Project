const { UserModel } = require("../../../models/user_Schema");
const bcrypt = require("bcrypt");

const userRegistrationController = async (req, res) => {
  const data = req.body;
  if (!data.email || !data.password) {
    res.status(400).json({
      isSuccess: false,
      message: "Email and Password is required!",
      data: {},
    });
    return;
  }

  try {
    const newUser = await UserModel.create(data);

    console.log("User: ", newUser._doc);
    const { password, ...safeData } = newUser._doc;
    // delete newUser.password;
    // console.log("NewUser: ", safeData);

    res.status(201).json({
      isSuccess: true,
      message: "User is Created",
      data: {
        user: safeData,
      },
    });
  } catch (err) {
    console.log("Error in userRegistrationController ", err.message);
    res.status(501).json({ isSuccess: false, message: err.message, data: {} });
  }
};

const userLoginController = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    const reqUser = req.body;
    console.log("------ Wait for Login ------");

    console.log("Requested Login: ", reqUser);

    for(let user of allUsers){
      const checkPass = bcrypt.compare(reqUser.password, user.password);
      
      if (user.email == reqUser.email && checkPass) {
        res.status(201).json({
          isSuccess: true,
          message: "Login Successful",
          data: {
            user: user.email,
          },
        });
        console.log("Login Successful with user: ", user.email);
        return;
      }
    };

    res.status(400).json({
      isSuccess: false,
      message: "Incorrect email or Password",
      data: {},
    });
    console.log("Incorrect email or Password");
    console.log("-------------------------------")


  } catch (err) {
    console.log("---- Error in userLoginController  ------");
    console.log(err);

    res.status(500);
    res.json({
      isSuccess: false,
      message: "Internal Server error",
      data: {},
    });
  }
};

module.exports = { userRegistrationController, userLoginController };
