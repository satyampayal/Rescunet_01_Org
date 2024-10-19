import cloudinary  from 'cloudinary'
import fs from 'fs/promises'
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

    if(req.file){
      try {
        const result=await cloudinary.v2.uploader.upload(req.file.path,{
          folder:'MissingPersonImages',
          gravity:'faces',
        })
        fs.rm(`uploads/${result.original_filename}`)
        console.log(result)
        return res.json({
          status:true,
          message:"Complain Register Successfully",
    
        })
        
      } catch (error) {
        console.log(error)
      }
   

    }
   


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

  export {complainRegister};