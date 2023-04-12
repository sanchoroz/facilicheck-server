import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    isActivated: { type: String, required: false },
    activationLink: { type: String },
    roles: [{ type: String, ref: 'Role' }],
  },
  { timestamps: true },
);

export default mongoose.model('User', UserSchema);
