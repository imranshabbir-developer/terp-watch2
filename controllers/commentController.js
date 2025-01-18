import Blog from "../models/Blog.js";

// Post a comment
export const postComment = async (req, res) => {
  const { blogId } = req.params;
  const { text } = req.body;

  if (!text || text.trim().length < 3) {
    return res.status(400).send({ message: "Comment must be at least 3 characters long." });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send({ message: "Blog not found." });
    }

    const comment = {
      user: req.user.id, // From the verifyToken middleware
      text,
    };

    blog.comments.push(comment);
    await blog.save();

    res.status(201).send({ message: "Comment added successfully.", comment });
  } catch (error) {
    res.status(500).send({ message: "Error adding comment.", error });
  }
};

// Edit a comment
export const editComment = async (req, res) => {
  const { blogId, commentId } = req.params;
  const { text } = req.body;

  if (!text || text.trim().length < 3) {
    return res.status(400).send({ message: "Comment must be at least 3 characters long." });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send({ message: "Blog not found." });
    }

    const comment = blog.comments.id(commentId);

    if (!comment) {
      return res.status(404).send({ message: "Comment not found." });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).send({ message: "Unauthorized to edit this comment." });
    }

    comment.text = text;
    await blog.save();

    res.status(200).send({ message: "Comment updated successfully.", comment });
  } catch (error) {
    res.status(500).send({ message: "Error updating comment.", error });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { blogId, commentId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send({ message: "Blog not found." });
    }

    const comment = blog.comments.id(commentId);

    if (!comment) {
      return res.status(404).send({ message: "Comment not found." });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).send({ message: "Unauthorized to delete this comment." });
    }

    comment.remove();
    await blog.save();

    res.status(200).send({ message: "Comment deleted successfully." });
  } catch (error) {
    res.status(500).send({ message: "Error deleting comment.", error });
  }
};
