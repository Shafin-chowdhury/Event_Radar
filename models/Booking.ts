import mongoose, { type Document, Schema } from "mongoose"

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId
  eventId: mongoose.Types.ObjectId
  userName: string
  userEmail: string
  numberOfTickets: number
  totalAmount: number
  bookingDate: Date
  status: "confirmed" | "cancelled"
}

const BookingSchema = new Schema<IBooking>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: [true, "Event ID is required"],
  },
  userName: {
    type: String,
    required: [true, "User name is required"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  userEmail: {
    type: String,
    required: [true, "User email is required"],
  },
  numberOfTickets: {
    type: Number,
    required: [true, "Number of tickets is required"],
    min: [1, "Must book at least 1 ticket"],
  },
  totalAmount: {
    type: Number,
    required: [true, "Total amount is required"],
    min: [0, "Total amount cannot be negative"],
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
})

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema)
