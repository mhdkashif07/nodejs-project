const express = require('express');

const { channel, auth } = require('../controllers/index');

const router = express.Router();

router
  .route('/')
  //   .get(channel.createChannel)
  .post(
    auth.protect,
    channel.uploadChannelPhoto,
    channel.resizeChannelPhoto,
    channel.createChannel
  );

router.route('/:id').get(channel.getChannel).delete(channel.deleteChannel);
// .patch(category.updateCategory);

module.exports = router;
