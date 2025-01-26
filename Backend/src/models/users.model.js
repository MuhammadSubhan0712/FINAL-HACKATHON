import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    cnic: {
      type: String,
      unique: true,
      required: [true, "cnic is required"],
      validate: {
        validator: function (value) {
            return /^[0-9]{5}-[0-9]{7}-[0-9]$/.test(value);
        },  
        message: "Invalid CNIC format"

    }
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    password:{
      type:String,
      required:true, // created by system
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", userSchema);
