import { Document, Schema, model } from 'mongoose';

interface Journal extends Document {
  username: string;
  content: string;
  marked: boolean;
  date: Date;
};

const journalSchema = new Schema({
  username: String,
  content: String,
  marked: Boolean,
  date: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

export default model<Journal>('Journal', journalSchema);
