const routes = require('express').Router();
const multer = require('multer');
const multeConfig = require('./config/multer');

const Post = require('./models/Post');

routes.get('/posts', async (request, response) => {
  const posts = await Post.find();

  return response.json(posts);
});

routes.post(
  '/posts',
  multer(multeConfig).single('file'),
  async (request, response) => {
    const { originalname: name, size, key, url = '' } = request.file;

    const post = await Post.create({
      name,
      size,
      key,
      url,
    });

    return response.json(post);
  }
);

routes.delete('/posts/:id', async (request, response) => {
  const post = await Post.findById(request.params.id);
  await post.remove();

  return response.send();
});

module.exports = routes;
