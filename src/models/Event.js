import { Schema, model, models } from 'mongoose';

const EventSchema = new Schema(
  {
    type: String, // click or view
    page: String, // username
    uri: String, // /pagename | https://
  },
  { timestamps: true }
);

export const Event = models?.Event || model('Event', EventSchema);
