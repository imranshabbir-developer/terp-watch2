import Blog from "../models/Blog.js";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : null;

    const blog = await Blog.create({
      title,
      description,
      image,
      createdBy: req.user.id, // Set creator based on logged-in user
    });

    res.status(201).send({ message: "Blog created successfully.", blog });
  } catch (error) {
    res.status(500).send({ message: "Server error.", error: error.message });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("createdBy", "name email role"); // Include creator details
    res.status(200).send({ message: "Blogs retrieved successfully.", blogs });
  } catch (error) {
    res.status(500).send({ message: "Server error.", error: error.message });
  }
};

// Get a specific blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate("createdBy", "name email role");

    if (!blog) {
      return res.status(404).send({ message: "Blog not found." });
    }

    res.status(200).send({ message: "Blog retrieved successfully.", blog });
  } catch (error) {
    res.status(500).send({ message: "Server error.", error: error.message });
  }
};

// Update a blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const image = req.file ? req.file.path : null;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).send({ message: "Blog not found." });
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    if (image) blog.image = image;

    await blog.save();

    res.status(200).send({ message: "Blog updated successfully.", blog });
  } catch (error) {
    res.status(500).send({ message: "Server error.", error: error.message });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).send({ message: "Blog not found." });
    }

    res.status(200).send({ message: "Blog deleted successfully." });
  } catch (error) {
    res.status(500).send({ message: "Server error.", error: error.message });
  }
};

// Like a blog
export const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).send({ message: "Blog not found." });
    }

    if (blog.likes.includes(req.user.id)) {
      blog.likes = blog.likes.filter((userId) => userId.toString() !== req.user.id);
      await blog.save();
      return res.status(200).send({ message: "Blog unliked successfully.", blog });
    }

    blog.likes.push(req.user.id);
    await blog.save();

    res.status(200).send({ message: "Blog liked successfully.", blog });
  } catch (error) {
    res.status(500).send({ message: "Server error.", error: error.message });
  }
};













