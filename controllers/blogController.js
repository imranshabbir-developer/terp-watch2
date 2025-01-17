import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file.path;

  try {
    const blog = new Blog({ title, description, image, author: req.user.id });
    await blog.save();
    res.status(201).send({ message: "Blog created successfully!", blog });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong.", error });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username");
    res.status(200).send(blogs);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong.", error });
  }
};

export const likeBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).send({ message: "Blog not found." });

    if (blog.likes.includes(req.user.id)) {
      blog.likes = blog.likes.filter((userId) => userId !== req.user.id);
    } else {
      blog.likes.push(req.user.id);
    }

    await blog.save();
    res.status(200).send({ message: "Blog updated successfully.", blog });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong.", error });
  }
};
