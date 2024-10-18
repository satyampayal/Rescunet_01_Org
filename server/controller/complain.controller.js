
const complainRegister=async (req,res)=>{
    const {name,
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
    }=req.body

  }
  const getAllComplain=async (req,res)=>{
    try{
      //  const response=await Complains.find({});
      //  res.json({
      //   status:"Success",
      //   Message:"Get All Complaints",
      //   complains:response
      //  })
  
    }catch(error){
      console.log(error)
      res.jsn({
        status:"Failed",
        message:"Get All Complaint error in Request"
      })
    }
  }