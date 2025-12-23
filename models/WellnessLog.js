const mongoose = require("mongoose");

const wellnessLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    waterGlasses: { type: Number, default: 0 },
    exerciseMinutes: { type: Number, default: 0 },
    sleepHours: { type: Number, default: 0 },
  },
  { timestamps: true }
);

wellnessLogSchema.index({ userId: 1, date: 1 }, { unique: true });
module.exports = mongoose.model("WellnessLog", wellnessLogSchema);