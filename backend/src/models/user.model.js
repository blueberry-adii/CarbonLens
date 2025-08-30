const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profile: {
      avatar: String,
      bio: String,
      location: String,
      joinDate: {
        type: Date,
        default: Date.now,
      },
    },
    settings: {
      dailyReminders: {
        type: Boolean,
        default: true,
      },
      weeklyReports: {
        type: Boolean,
        default: false,
      },
      carbonGoal: {
        type: Number,
        default: 50, // kg CO2 per week
      },
    },
    stats: {
      totalEntries: {
        type: Number,
        default: 0,
      },
      totalCarbonTracked: {
        type: Number,
        default: 0,
      },
      carbonSaved: {
        type: Number,
        default: 0,
      },
      achievements: [
        {
          name: String,
          description: String,
          unlockedAt: Date,
          icon: String,
        },
      ],
      streak: {
        current: {
          type: Number,
          default: 0,
        },
        longest: {
          type: Number,
          default: 0,
        },
        lastEntry: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
