import  { Document, Schema, model } from 'mongoose';

interface User extends Document {
  name: string;
  password: string;
  group: number;
};

const userSchema = new Schema({
  name: String,
  password: String,
  group: { type: Number, default: 1 },
}, {
  timestamps: true,
});

export default model<User>('User', userSchema);
