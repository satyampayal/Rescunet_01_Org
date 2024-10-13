//mongoDb user Model
import User from "../model/userModel.js";
import UserVerification from "../model/userVirefication.js";
import bcrypt from "bcryptjs";
// unique id

import { v4 } from "uuid";
import sendEmail from "../utils/sendEmail.js";

const register = async (req, res) => {
  const { firstName, lastName, email, password, dob } = req.body;
  if (firstName == "" || email == "" || password == "" || dob == "") {
    res.json({
      status: "Failed",
      message: "Empty input filed!",
    });
  } else if (!/^[a-zA-Z]*$/.test(firstName)) {
    res.json({
      status: "Failed",
      message: "Invalid  Name Enterd ",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "Failed",
      message: "Invalid Email Enterd  ",
    });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.json({
        status: "failed",
        message: "User email alredy register ",
      });
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      dob,
      verified: false,
    });
    if (!user) {
      return res.status(500).json({
        status: "falied",
        message: "registertion fail",
      });
    }
    // now send a email verfication
    const currenturl = "http://localhost:3000/";
    const uniqueString = v4() + user._id;
    const subject = "Verify Your Email";
    const body = `<p>Verify your Email address to complete the signup and login into your account.</p><p>This is link <b>experies in 6 hours </b></p><p>Press <a href=${
      currenturl + "user/verify/" + user._id + "/" + uniqueString
    } >here</a> to proceed.</p>`;
    bcrypt
      .hash(uniqueString, 10)
      .then((hashedUniqueString) => {
        const newUserVerification = new UserVerification({
          userId: user._id,
          uniqueString: hashedUniqueString,
          createdAt: Date.now(),
          expiresAt: Date.now() + 21600000,
        });
        newUserVerification
          .save()
          .then(() => {
            sendEmail(email, subject, body)
              .then(() => {
                return res.json({
                  status: "Pending",
                  message: "Email verification sent ",
                  body,
                });
              })
              .catch((error) => {
                console.log(error);
                return res.json({
                  status: "failed",
                  message: "could'nt send email ",
                });
              });
          })
          .catch((error) => {
            console.log(error);
            return res.json({
              status: "failed",
              message: "could'nt save verification email data",
            });
          });
      })
      .catch(() => {
        return res.json({
          status: "failed",
          message: "An Error occured while hashing email detail",
        });
      });
  } catch (err) {}
};

const userVerify = async (req, res) => {
  const { userId, uniqueString } = req.params;

  UserVerification.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        const { expiresAt } = result[0];
        const hashedUniqueString = result[0].uniqueString;
        if (expiresAt < Date.now()) {
          UserVerification.deleteOne({ userId })
            .then((result) => {
              User.deleteOne({ _id: userId })
                .then(() => {
                  let message = "Link has expire. Please signup again ";
                  // res.redirect(`/user/verified/error=true&message=${message}`);
                  res.send(`<p>${message}</p>`);
                })
                .catch((error) => {
                  console.log(error);
                  let message =
                    "clearing User with expired unique strinng failed ";
                  // res.redirect(`/user/verified/error=true&message=${message}`);
                  res.send(`<p>${message}</p>`);
                });
            })
            .catch((error) => {
              console.log(error);
              let message =
                "An error occured while clearing expired user verification record!  ";
              // res.redirect(`/user/verified/error=true&message=${message}`);
              res.send(`<p>${message}</p>`);
            });
        } else {
          bcrypt
            .compare(uniqueString, hashedUniqueString)
            .then((result) => {
              if (result) {
                User.updateOne({ _id: userId }, { verified: true })
                  .then(() => {
                    UserVerification.deleteOne({ userId })
                      .then(() => {
                        res.send("<h1>Email verified Successfully </h1>");
                      })
                      .catch((error) => {
                        console.log(error);
                        let message =
                          "An error occured while  finalizinf successfull verifivation";
                        // res.redirect(`/user/verified/error=true&message=${message}`);
                        res.send(`<p>${message}</p>`);
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    let message =
                      "An error occured while updateing user record to show verfied!";
                    // res.redirect(`/user/verified/error=true&message=${message}`);
                    res.send(`<p>${message}</p>`);
                  });
              } else {
                let message = "Invalid link ,check your InBox";
                // res.redirect(`/user/verified/error=true&message=${message}`);
                res.send(`<p>${message}</p>`);
              }
            })
            .catch((error) => {
              let message = "An error occured while comaping unique string";
              // res.redirect(`/user/verified/error=true&message=${message}`);
              res.send(`<p>${message}</p>`);
            });
        }
      } else {
        let message =
          "Account record doesn't exists or has been veriied already. Please sign up or login  ";
        // res.redirect(`/user/verified/error=true&message=${message}`);
        res.send(`<p>${message}</p>`);
      }
    })
    .catch((errror) => {
      console.log(errror);
      let message =
        "An error occured while checking for existing user verification record";
      // res.redirect(`/user/verified/error=true&message=${message}`);
      res.send(`<p>${message}</p>`);
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (email == "" || password == "") {
    res.json({
      status: "Failed",
      message: "Empty input filed!",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "Failed",
      message: "Invalid Email Enterd  ",
    });
  }

  User.findOne({ email })
    .then(async (result) => {
      const checkPassword = await result.comparePassword(password);
      result.password = undefined;
      if (checkPassword) {
        if (result.verified) {
          const token = await result.generateToken();
          return res.json({
            status: "success",
            message: "Successfully Logeed in account ",
            user: result,
            token,
          });
        } else {
          return res.json({
            status: "failed ",
            message: "First plaese verify your email ",
          });
        }
      } else {
        return res.json({
          status: "failed",
          message: "Enter Password are wrong",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        status: "failed",
        message: "An error to find user reacord ",
      });
    });
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  if (email == "") {
    return res.json({
      status: "Failed",
      message: "Input Fileds are empty,please fill ",
    });
  }
  User.findOne({ email })
    .then(async (result) => {
      if (result.verified) {
        const uniqueString = v4() + result._id;
        const cureentUrl = "http://localhost:3000/";
        const subject = "Reset your password";
        const body = `<h1>Reset Your Password</h1>
                  <p>we heared that you loast the password 
                  </br> Dont't woory. user the lik below to reset it the link 
                  <b>expires in 60 minutes</b>
                  </br> Press <a href=${
                    cureentUrl + "user/reset/" + result._id + "/" + uniqueString
                  }>here</a>
                  </p> `;
        const response = sendEmail(email, subject, body);
        if (response) {
          const hashedUniqueString = await bcrypt.hash(uniqueString, 10);
          const newUserVerification = await UserVerification.create({
            userId: result._id,
            uniqueString: hashedUniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() +3600000 ,
          });

          await newUserVerification.save();
          return res.json({
            status: "pending",
            message: "Email is sent for reset password",
            body
          });
        } else {
          return res.json({
            status: "Failed",
            message: "Email not sent due to some reseon" + response,
          });
        }
      } else {
        return res.json({
          status: "failed",
          message: "You are not verfiy as real user yet pleaes verify email",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "Failed",
        message: "An error to find email of user ",
      });
    });
};

const verifyResetPassword = async (req, res) => {
  const { userId, uniqueString } = req.params;
  const {password}=req.body;

  const newUserVerification = await UserVerification.findOne({ userId });
  // console.log(newUserVerification)
  if (!newUserVerification) {
    let message = " User already used the lin and reset the password and link is expired  ";
    return res.send(`<h1>${message}</h1>`);
  }else if(  !bcrypt.compare(uniqueString,newUserVerification.uniqueString)){
    let message = " link are inValid   ";
    return res.send(`<h1>${message}</h1>`);
  }
  else  if (newUserVerification.expiresAt< Date.now()) {
        // delete the reset Token 
        await UserVerification.deleteOne({userId})
    let message = "Link is expire ";
    return res.send(`<h1>${message}</h1>`);
  }
  else {
    const user= await User.findOne({_id:userId})
    if(!user){
      return res.json({
        status:"failed",
        message:"User not found "
      })
    }
    user.password=password;
    await user.save();
    // now delete the record from verifyModel
    await UserVerification.deleteOne({userId})
    let message = "Password is reset succesffuly ";
    return res.send(`<h1>${message}</h1>`);

  }
};

const complainRegister=async (req,res)=>{
  const {}=req.body;
}

export { register, userVerify, login, resetPassword, verifyResetPassword };
