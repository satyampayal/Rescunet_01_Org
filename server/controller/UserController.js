//mongoDb user Model
import User from "../model/userModel.js";
import UserVerification from "../model/userVirefication.js";
import bcrypt from "bcryptjs";
// unique id

import { v4 } from "uuid";
import sendEmail from "../utils/sendEmail.js";

const emailSend=(id,email)=>{
  const currenturl = "https://rescunet-01-org-4.onrender.com";
  const uniqueString = v4() + id;
  const subject = "Verify Your Email";
  const body = `<p>Verify your Email address to complete the signup and login into your account.</p><p>This is link <b>experies in 6 hours </b></p><p>Press <a href=${
    currenturl + "/user/verify/" + id + "/" + uniqueString
  } >here</a> to proceed.</p>`;
  bcrypt
  .hash(uniqueString, 10)
  .then((hashedUniqueString) => {
    const newUserVerification = new UserVerification({
      userId: id,
      uniqueString: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000,
    });
    newUserVerification
      .save()
      .then(() => {
        sendEmail(email, subject, body)
          .then(() => {
            return {
              status: "Pending",
              message: "Email verification sent ",
            }
          })
          .catch((error) => {
            console.log(error);
            return {
              status: "failed",
              message: "could'nt send email ",
            }
          });
      })})
  
}
const register = async (req, res) => {
  const { firstName, lastName, email, password, dob } = req.body;
  if (firstName == "" || email == "" || password == "" || dob == "") {
   return  res.json({
      status: "Failed",
      message: "Empty input filed!",
    });
  } else if (!/^[a-zA-Z]*$/.test(firstName)) {
   return  res.json({
      status: "Failed",
      message: "Invalid  Name Enterd ",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return  res.json({
      status: "Failed",
      message: "Invalid Email Enterd  ",
    });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {// one thing more i have to done if user alredy register then you should send emil verfication sent again if its is not verfied till
      if(!userExists.verified){
          // send email 
         emailSend(userExists._id,email)
          
          
          return res.json({
            status:"pending",
            message:"email sent succesfully"
          })
          
         }
         else {
          return  res.json({
        status: "failed",
        message: "User email alredy register  ",
            });}
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
    const currenturl = "https://rescunet-01-org-4.onrender.com";
    const uniqueString = v4() + user._id;
    const subject = "Verify Your Email";
    const body = `<p>Verify your Email address to complete the signup and login into your account.</p><p>This is link <b>experies in 6 hours </b></p><p>Press 
    <a href=${
      currenturl + "/user/verify/" + user._id + "/" + uniqueString
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
  }
   catch (err) {
    return res.json(400).json({
      status:"failed",
      message:"Something wrong with system"

    })
  }
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
                  res.json({
                    status:false,
                    message,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  let message =
                    "clearing User with expired unique strinng failed ";
                  // res.redirect(`/user/verified/error=true&message=${message}`);
                  res.json({
                    status:false,
                    message,
                  });
                });
            })
            .catch((error) => {
              console.log(error);
              let message =
                "An error occured while clearing expired user verification record!  ";
              // res.redirect(`/user/verified/error=true&message=${message}`);
              res.json({
                status:false,
                message,
              });
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
                        res.send("<p style={{textAlign:'center',textSize:'18px'}}>Your Email verfied successfully!</p>")
                        // status(200)
                        // .json({status:"true",
                        //   message:"Email verfied Successfully!"
                        // });
                      })
                      .catch((error) => {
                        console.log(error);
                        let message =
                          "An error occured while";
                        // res.redirect(`/user/verified/error=true&message=${message}`);
                        res.json({
                          status:true,
                          message,
                        });
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    let message =
                      "An error occured while updating user record to show verfied!";
                    // res.redirect(`/user/verified/error=true&message=${message}`);
                    res.json({
                      status:true,
                      message,
                    });
                  });
              } else {
                let message = "Invalid link ,check your InBox";
                // res.redirect(`/user/verified/error=true&message=${message}`);
                res.json({
                  status:true,
                  message,
                });
              }
            })
            .catch((error) => {
              let message = "An error occured while comaping unique string";
              // res.redirect(`/user/verified/error=true&message=${message}`);
              res.json({
                status:true,
                message,
              });
            });
        }
      } else {
        let message =
          "email  has been verified already.  ";
        // res.redirect(`/user/verified/error=true&message=${message}`);
        res.json({
          status:true,
          message,
        });
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
   return  res.json({
      status: "Failed",
      message: "Empty input filed!",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
   return  res.json({
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
          res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            samesite:'None'
          })
          return res.json({
            status: "success",
            message: "Successfully Logeed in account ",
            user: result,
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
  console.log(email)
  User.findOne({ email })
    .then(async (result) => {
      if (result.verified) {
        const uniqueString = v4() + result._id;
        const cureentUrl = "https://rescunet-01-org-4.onrender.com/";
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
          return res.send({
            status: "pending",
            message: "Email is sent for reset password",
            body
          });
        } else {
          return res.json({
            status: "Failed",
            message: "Email not sent due to some reason" + response,
          });
        }
      } else {
        return res.json({
          status: "failed",
          message: "You are not verfiy yet, please verify  your email",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "Failed",
        message: "email not register  ",
      });
    });
};

const getReSetPasswordPage=async (req,res)=>{

  res.send(`
      <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Password Form</title>
      <style>
        body {
          background: linear-gradient(to bottom right, #4f46e5, #06b6d4);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
        }
      </style>
    </head>
    <body>
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 class="text-2xl font-bold text-center mb-6 text-gray-700">Set Your Password</h1>
        <form  method="POST">
          <div class="mb-4">
            <label for="password" class="block text-gray-600 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div class="mb-4">
            <label for="confirmPassword" class="block text-gray-600 font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </body>
    </html>
    `)
}
const verifyResetPassword = async (req, res) => {
  const { userId, uniqueString } = req.params;
  const {password,confirmPassword}=req.body;
  if(password !==confirmPassword){
    return res.send(`
      <div style="text-align: center; margin-top: 20px; font-family: Arial;">
        <h1 style="color: red;">Passwords do not match!</h1>
        <a href="https://rescunet-01-org-5.onrender.com/" style="color: blue; text-decoration: underline;">Go Back</a>
      </div>
    `);
  }
  console.log(password+"UserID "+userId)
  const newUserVerification = await UserVerification.findOne({ userId });
  // console.log(newUserVerification)
  if (!newUserVerification) {
    let message = " User already used this link  and link is expired  ";
    return res.send(`  <div style="text-align: center; margin-top: 20px; font-family: Arial;">
      <h1 style="color: green;">${message}</h1>
      <a href="https://rescunet-01-org-5.onrender.com/" style="color: blue; text-decoration: underline;">Go Back</a>
    </div>`);
  }else if(  !bcrypt.compare(uniqueString,newUserVerification.uniqueString)){
    let message = " link are inValid   ";
    return res.send(`  <div style="text-align: center; margin-top: 20px; font-family: Arial;">
      <h1 style="color: green;">${message}</h1>
      <a href="https://rescunet-01-org-5.onrender.com/" style="color: blue; text-decoration: underline;">Go Back</a>
    </div>`);
  }
  else  if (newUserVerification.expiresAt< Date.now()) {
        // delete the reset Token 
        await UserVerification.deleteOne({userId})
    let message = "Link is expire ";
    return res.send(`  <div style="text-align: center; margin-top: 20px; font-family: Arial;">
      <h1 style="color: green;">${message}</h1>
      <a href="https://rescunet-01-org-5.onrender.com/" style="color: blue; text-decoration: underline;">Go Back</a>
    </div>`);
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
    return res.send(`  <div style="text-align: center; margin-top: 20px; font-family: Arial;">
      <h1 style="color: green;">${message}</h1>
      <a href="https://rescunet-01-org-5.onrender.com/" style="color: blue; text-decoration: underline;">Go Back</a>
    </div>`);

  }
};

const logout=async (req,res)=>{
   res.cookie('token',"");
   return res.json({
    success:true,
    message:"User logout succefully"
   })
}

export { register, userVerify, login, resetPassword, verifyResetPassword,logout,getReSetPasswordPage };
