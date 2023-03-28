const { Schema, model } = require('mongoose');

const notificationSchema = new Schema({
  target: {
    type: String,
    refPath: 'targetModel',
  },
  targetModel: {
    type: String,
    enum: ['post'],
    required: true,
  },
});

module.exports = model('notification', notificationSchema);
