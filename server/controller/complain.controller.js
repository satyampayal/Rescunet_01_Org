import cloudinary from "cloudinary";
import fs from "fs/promises";
import Complain from "../model/complain.model.js";
const complainRegister = async (req, res) => {
  const {
    firstName,
    lastName,
    fatherName,
    age,
    contactAddress,
    missingSince,
    nearPoliceStationName,
    Nationality,
    gender,
    missingFrom,
    languageKnown,
    isStudent,
    schoolName,
    collegeName,
    contactNumber,
    placeOfRegularVisit,
    height,
    hairColor,
    built,
    face,
    identificationMarks,
    health,
    meantalHealth,
    reportFill,
    reportNo,
    stationName,
    dateAndTime,
    gdeNo,
    lastSeenwithWhomeAndbyWhome,
    apparentCauseofLeaving,
    dreesAtTimeOfLeaving,
    otherEmail,
  } = req.body;

  if (
    !firstName ||
    !fatherName ||
    !age ||
    !contactAddress ||
    !missingSince ||
    !nearPoliceStationName ||
    !Nationality ||
    !gender ||
    !languageKnown ||
    !isStudent ||
    !height ||
    !hairColor ||
    !built ||
    !face ||
    !identificationMarks ||
    !health ||
    !meantalHealth ||
    !reportFill
  ) {
    return res.json({
      status: false,
      message: "All nesscery Field are required !",
    });
  }

  const complian = await Complain.create({
    firstName,
    lastName,
    fatherName,
    age,
    contactAddress,
    missingSince,
    nearPoliceStationName,
    Nationality,
    gender,
    missingFrom,
    languageKnown,
    isStudent,
    schoolName,
    collegeName,
    contactNumber,
    placeOfRegularVisit,
    height,
    hairColor,
    built,
    face,
    identificationMarks,
    health,
    meantalHealth,
    reportFill,
    reportNo,
    stationName,
    dateAndTime,
    gdeNo,
    lastSeenwithWhomeAndbyWhome,
    apparentCauseofLeaving,
    dreesAtTimeOfLeaving,
    otherEmail,
  });

  if (req.files) {
    try {
      for(const file of req.files){
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "MissingPersonImages",
          gravity: "faces",
        });
        complian.images.push({
          public_id:result.public_id,
          secure_url:result.secure_url,
        })
        fs.rm(file.path);
      }
    
    
     

     
    } catch (error) {
      console.log(error);
    }
  }

  await complian.save();
  return res.json({
    status: true,
    message: "Complain Register Successfully",
    complian
  });
};
const getAllComplain = async (req, res) => {
  try {
    //  const response=await Complains.find({});
    //  res.json({
    //   status:"Success",
    //   Message:"Get All Complaints",
    //   complains:response
    //  })
  } catch (error) {
    console.log(error);
    res.jsn({
      status: "Failed",
      message: "Get All Complaint error in Request",
    });
  }
};

export { complainRegister };
