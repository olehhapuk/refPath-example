const Post = require('../models/Post');
const Notification = require('../models/Notification');

exports.create = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    const notification = await Notification.create({
      target: post,
      targetModel: 'post',
    });

    await notification.populate('target');
    req.io.to('id1').emit('new notification', notification);
    res.json(post);
  } catch (error) {
    next(error);
  }
};
