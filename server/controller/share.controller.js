import Share from "../model/share.model.js"

const  shareLog=async (req,res)=>{
    try {
        const { caseId, platform, timestamp } = req.body;
        const newShare = new Share({ caseId, platform, timestamp });
        await newShare.save();
        res.status(200).json({ success: true, message: "Share logged successfully" });
      } catch (error) {
        res.status(500).json({ success: false, message: "Error logging share", error });
      }
}

export {
    shareLog,
}