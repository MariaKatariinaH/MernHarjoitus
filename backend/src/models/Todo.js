import mongoose from 'mongoose';

const thingSchema = mongoose.Schema(
  {
  title: {
    type: String,
    required: true,
  },
}
);

export const Thing = mongoose.model('Thing', thingSchema);