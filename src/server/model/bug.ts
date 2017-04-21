import { Document, Schema, model} from 'mongoose';

interface Bug extends Document {
  state: number;
  presenter: string;
  title: string;
  rank: string;
  category: string[];
  desc: string;
  images: string[];
  resolver: string;
  rdate: Date;
  closeDate: Date;
  message: string;
}

const bugSchema = new Schema({
  state: { type: Number, default: 1 },
  presenter: String,
  title: String,
  project: String,
  rank: String,
  category: [String],
  desc: String,
  images: [String],
  resolver: String,
  message: String,
  resolvedAt: Date,
  closedAt: Date,
}, {
  timestamps: true,
});

export default model<Bug>('Bug', bugSchema);
