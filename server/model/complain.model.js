import mongoose, { Schema } from "mongoose";

const complainSchema=new Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
      
    },
    fatherName:{
        type:String,
        require:true,
    },
    age:{
        type:Number,
        require:true,
    },
    contactAddress:{
        type:String,
        require:true,
    },
    missingSince:{
        type:String,
        require:true,
    },
    nearPoliceStationName:{
        type:String,
        require:true,
    },
    Nationality:{
        type:String,
        require:true,
    },
    gender:{
        type:String,
        require:true,
    },
    missingFrom:{
        type:String,
        require:true,
    },
    images:[
        {
            public_id: {
                type: String,
            },
            secure_url: {
                type: String,
            }
        }
       
    ],
    languageKnown:{
        type:String,
        require:true,
    },
    habitsAddicationsHobbies:{
         type:String,
       
    },
    isStudent:{
         type:String,
        require:true,
    },
    schoolName:{
         type:String,
     
    },
    collegeName:{
         type:String,
        
    },
    placeOfRegularVisit:{
         type:String,
     
    },
    contactNumber:{
        type:Number,
        require:true,
    },
    height:{
         type:String,
        require:true,
    },
    hairColor:{
         type:String,
         require:true,
      
    },
    built:{
         type:String,
        require:true,
    },
    face:{
         type:String,
        require:true,
    },
    identificationMarks:{
         type:String,
        require:true,
    },
    health:{
         type:String,
        require:true,
    },
    meantalHealth:{
         type:String,
        require:true,
    },
    reportFill:{
        type:Boolean,
        default:false,
        require:true
    },
    reportNo:{
         type:String,    
    },
    stationName:{
        type:String,  
   },
   StringAndTime:{
    type:String,  
    },
    gdeNo:{
        type:String,  
   },
   lastSeenwithWhomeAndbyWhome:{
    type:String,  
    },
    apparentCauseofLeaving:{
        type:String,  
   },
   dreesAtTimeOfLeaving:{
    type:String,  
    },
    otherEmail:{
        type:String,
    },
})

const Complain=mongoose.model("Complaints",complainSchema)

export default Complain;