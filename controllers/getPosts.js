const users = [
  { id: 1, name: "Post 1" },
  { id: 2, name: "post 2" },
  { id: 2, name: "post 3" },
];

export const getPosts = (req, res) => {
  res.json(users);
};

export const getPost = (req, res) => {
  const post = users.find((u) => u.id == req.params.id);

  if (!post) return res.status(404).send("post not found jaale ");

  res.json(post);
};