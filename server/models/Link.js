import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    title: { 
        type: String, 
        required: true 
    },
    url: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Link", linkSchema);
