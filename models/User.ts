// import mongoose, { type Document, Schema } from "mongoose"

// export interface IUser extends Document {
//   name: string
//   email: string
//   password: string
//   role: "user" | "admin"
//   createdAt: Date
// }

// const UserSchema = new Schema<IUser>({
//   name: {
//     type: String,
//     required: [true, "Please provide a name"],
//     maxlength: [60, "Name cannot be more than 60 characters"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please provide an email"],
//     unique: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Please provide a password"],
//     minlength: [6, "Password must be at least 6 characters"],
//   },
//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user",
//   },
//   wantsNewEventNotifications: {
//   type: Boolean,
//   default: false,
//  },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
  
// })

// export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)




import mongoose, { type Document, Schema } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: "user" | "admin"
  createdAt: Date
  wantsNewEventNotifications: boolean // <-- THIS LINE WAS MISSING
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  wantsNewEventNotifications: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)