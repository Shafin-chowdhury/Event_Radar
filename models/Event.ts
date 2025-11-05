import mongoose, { type Document, Schema } from "mongoose"

export interface IEvent extends Document {
  title: string
  description: string
  category: "music" | "tech" | "sports" | "business" | "art" | "food"
  location: string
  date: Date
  price: number
  maxTickets: number
  availableTickets: number
  featured: boolean
  imageUrl?: string
  createdAt: Date
}

const EventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: [true, "Please provide an event title"],
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide an event description"],
    maxlength: [1000, "Description cannot be more than 1000 characters"],
  },
  category: {
    type: String,
    required: [true, "Please provide an event category"],
    enum: ["music", "tech", "sports", "business", "art", "food"],
  },
  location: {
    type: String,
    required: [true, "Please provide an event location"],
    maxlength: [200, "Location cannot be more than 200 characters"],
  },
  date: {
    type: Date,
    required: [true, "Please provide an event date"],
  },
  price: {
    type: Number,
    required: [true, "Please provide an event price"],
    min: [0, "Price cannot be negative"],
  },
  maxTickets: {
    type: Number,
    required: [true, "Please provide maximum tickets"],
    min: [1, "Maximum tickets must be at least 1"],
  },
  availableTickets: {
    type: Number,
    required: [true, "Please provide available tickets"],
    min: [0, "Available tickets cannot be negative"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema)
