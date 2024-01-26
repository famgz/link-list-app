import { Schema, model, models } from 'mongoose';

const PageSchema = new Schema(
  {
    uri: { type: String, required: true, min: 1, max: 30, unique: true },
    owner: { type: String, required: true },
    displayName: { type: String, default: '' },
    location: { type: String, default: '' },
    bio: { type: String, default: '' },
    bgType: { type: String, enum: ['color', 'image'], default: 'color' },
    bgColor: { type: String, default: '#8db7fa' },
    bgImage: { type: String, default: '' },
    buttons: { type: Object, default: {} },
    links: { type: Object, default: [] },
  },
  { timestamps: true, minimize: false }
);

export const Page = models?.Page || model('Page', PageSchema);
