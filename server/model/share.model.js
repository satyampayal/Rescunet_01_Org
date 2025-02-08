import mongoose from "mongoose";

const shareSchema = new mongoose.Schema({
  caseId: { type: mongoose.Schema.Types.ObjectId, ref: "Complain", required: true },
  platform: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Share = mongoose.model("Share", shareSchema);
export default Share;
