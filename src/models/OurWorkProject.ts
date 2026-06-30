import mongoose from "mongoose"

const ourWorkProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  division: { type: String, required: true, index: true },
  shortDescription: { type: String },
  description: { type: String },
  location: { type: String },
  status: { type: String, enum: ["Completed", "Ongoing", "Upcoming"], default: "Completed" },
  coverImage: { type: String },
  galleryImages: [{ type: String }],
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true })

const OurWorkProject = mongoose.models.OurWorkProject || mongoose.model("OurWorkProject", ourWorkProjectSchema, "portfolioprojects")
export default OurWorkProject
