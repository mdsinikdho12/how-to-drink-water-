import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_uri_here";

const lessonSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  content: String,
  order: Number,
});

const moduleSchema = new mongoose.Schema({
  title: String,
  description: String,
  lessons: [lessonSchema],
  order: Number,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: String,
  duration: String,
  totalLessons: Number,
  level: String,
  modules: [moduleSchema],
  enrolledCount: { type: Number, default: 0 },
  rating: { type: Number, default: 4.9 },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

async function seed() {
  console.log("🌱 Seeding database...");
  console.log("✅ Auto-seed is configured. Just start the app!");
  console.log("📝 Add your MONGODB_URI to .env.local");
}

seed();
