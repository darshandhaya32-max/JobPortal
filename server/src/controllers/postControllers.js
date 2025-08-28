const db = require("../config/db");
const getPost = async (req, res) => {
  try {
    const userReop = db.getRepository("JobPost");

    res.json(await userReop.find());
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const getSinglePost = async (req, res) => {
  try {
    const userReop = db.getRepository("JobPost");
    const user = await userReop.findOne({
      where: { id: parseInt(req.params.id) },
    });

    res.json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const postes = async (req, res) => {
  try {
    
    const authRepo = db.getRepository("Auth");

    const authorId = parseInt(req.body.authorId);
    if (isNaN(authorId)) {
      return res.status(400).json({ message: "Invalid internId" });
    }

    const author = await authRepo.findOne({
      where: { id: authorId },
    });

    if (!author) {
      return res.status(404).json({ message: "JobPost not found" });
    }

    const posts = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
 authentication: author, 
    };
    const userReop = db.getRepository("JobPost");
    const saved = await userReop.save(posts);
    res.json(saved);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const EditPosts = async (req, res) => {
  try {
    const userId = parseInt(req.body.authorId); 
    const postId = parseInt(req.params.id);

    if (isNaN(userId) || isNaN(postId)) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const userRepo = db.getRepository("JobPost");

    const existingPost = await userRepo.findOne({
      where: { id: postId },
      relations: ["authentication"], 
    });

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (existingPost.authentication.id !== userId) {
      return res.status(403).json({ message: "You are not allowed to edit this post" });
    }

    const updatedData = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    };

    await userRepo.update({ id: postId }, updatedData);

    res.json({ message: "Post updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


const DeletePost = async (req, res) => {
  try {
    const userReop = db.getRepository("JobPost");
    const deleted = await userReop.delete({ id: parseInt(req.params.id) });
    res.json(deleted);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const MyPosts = async (req, res) => {
  try {
    const id = parseInt(req.params.id); 
    const userRepo = db.getRepository("JobPost");

    const result = await userRepo.find({
      where: { authentication: { id } }, 
      relations: ["authentication"],      
    });
    res.json(result); 
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getPost, getSinglePost, postes, DeletePost, EditPosts ,MyPosts};
