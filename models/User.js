import mongoose from "mongoose";
import validator from "validator";


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username must not exceed 30 characters"],
      // unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      // validate: {
      //   validator: validator.isEmail,
      //   message: "Please provide a valid email address",
      // },
      // match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],

    },


    // password: {
    //   type: String,
    //   required: [true, "Password is required"],
    //   minlength: [8, "Password must be at least 8 characters long"],
    //   validate: {
    //     validator: function (value) {
    //       // Ensure password contains at least one uppercase letter, one lowercase letter, one digit, and one special character
    //       const strongPasswordRegex =
    //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //       return strongPasswordRegex.test(value);
    //     },
    //     message:
    //       "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
    //   },
    // },




    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      enum: ["super-admin", "admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);












// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     username: { 
//         type: String, 
//         required: true, 
//         unique: true 
//     },
//     email: { 
//         type: String, 
//         required: true, 
//         unique: true },
//     password: { 
//         type: String, 
//         required: true },
//     role: {
//       type: String,
//       enum: ["super-admin", "admin", "user"],
//       default: "user",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);
