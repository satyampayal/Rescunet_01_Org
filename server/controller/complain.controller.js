import cloudinary from "cloudinary";
import fs from "fs/promises";
import Complain from "../model/complain.model.js";

// Register Complains

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

  // take userId from token whichis destructer in req.user done in Auth.mddleware
  const { id } = req.user;
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
    postedBy: id,
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
      for (const file of req.files) {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "MissingPersonImages",
          gravity: "faces",
        });
        complian.images.push({
          public_id: result.public_id,
          secure_url: result.secure_url,
        });
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
    complian,
  });
};

// Get All Complains

const getAllComplain = async (req, res) => {
  try {
    const response = await Complain.find({});
    return res.json({
      status: "Success",
      Message: "Get All Complaints",
      complains: response,
    });
  } catch (error) {
    console.log(error);
    return res.josn({
      status: "Failed",
      message: "Get All Complaint error in Request",
    });
  }
};

//update Complain

const updateComplain = async (req, res) => {
  const {id}=req.user;
  const userId=id;
  const { complainId } = req.params;
  if(complainId.length<24){
    return res.json({
      success: false,
      message: "Complain Id or User Id  Not Found",
    });
  }
  if (!complainId || !userId) {
    return res.json({
      success: false,
      message: "Complain Id or User Id  Not Found",
    });
  }
  const complainExists = await Complain.findOne({ _id: complainId });
  if (!complainExists) {
    return res.status(500).json({
      message: "Complain Not found please try again",
    });
  }
  const  postedBy  = complainExists.postedBy;
  const verifyUserAndComplain = userId == postedBy;
  if (!verifyUserAndComplain) {
    return res.status(200).json({
      message: "You not have permission to write in This Complain ",
    });
  }
  const {
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

  complainExists.reportFill = reportFill;
  complainExists.reportNo = reportNo;
  complainExists.stationName = stationName;
  complainExists.dateAndTime = dateAndTime;
  complainExists.dreesAtTimeOfLeaving=dreesAtTimeOfLeaving;
  complainExists.gdeNo = gdeNo;
  if (lastSeenwithWhomeAndbyWhome != "")
    complainExists.lastSeenwithWhomeAndbyWhome = lastSeenwithWhomeAndbyWhome;
  if (apparentCauseofLeaving != "")
    complainExists.apparentCauseofLeaving = apparentCauseofLeaving;
  if (otherEmail != "") complainExists.otherEmail = otherEmail;
  await complainExists.save();
  return res.status(200).json({
    success:true,
    message:"Update Complain Successfully",
    complainExists
  })
};

export { complainRegister, getAllComplain, updateComplain };
