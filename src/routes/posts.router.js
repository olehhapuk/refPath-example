const { Router } = require('express');

const postsController = require('../controllers/posts.controller');

const router = Router();

router.post('/', postsController.create);

module.exports = router;
