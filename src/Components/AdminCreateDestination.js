import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Quill from "quill";
import "quill/dist/quill.snow.css";

function AdminCreateDestination() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    fetchPosts();
    initQuill();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/desti");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const initQuill = () => {
    if (!quillRef.current) return;
    const quill = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["clean"],
          ["link", "image", "video"],
        ],
      },
    });

    quill.getModule("toolbar").addHandler("image", () => {
      const range = quill.getSelection(true);
      const url = prompt("Enter the image URL");
      if (url && range) {
        quill.insertEmbed(range.index, "image", url);
      }
    });

    quill.on("text-change", () => {
      setContent(quill.root.innerHTML);
    });
  };

  const handlePostSelectChange = async (e) => {
    const postId = e.target.value;
    setSelectedPostId(postId);

    if (!postId) {
      setTitle("");
      setContent("");
      if (quillRef.current) quillRef.current.quill.setText('');
      return;
    }

    try {
      const { data } = await axios.get(`/api/desti/${postId}`);
      setTitle(data.title);
      setContent(data.content);
      if (quillRef.current) quillRef.current.quill.root.innerHTML = data.content;
    } catch (error) {
      console.error("Failed to fetch post details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, content };

    try {
      if (selectedPostId) {
        await axios.put(`/api/desti/${selectedPostId}`, postData);
      } else {
        await axios.post("/api/desti", postData);
      }
      fetchPosts();
      clearForm();
    } catch (error) {
      console.error("Error saving the blog post:", error);
}
};

const handleDelete = async () => {
if (!selectedPostId) return;

try {
  await axios.delete(`/api/desti/${selectedPostId}`);
  fetchPosts();
  clearForm();
} catch (error) {
  console.error("Error deleting the blog post:", error);
}
};

const clearForm = () => {
setSelectedPostId("");
setTitle("");
setContent("");
if (quillRef.current && quillRef.current.quill) {
quillRef.current.quill.setText('');
}
};

return (
<div>
<h1>{selectedPostId ? "Edit Destination Post" : "Create New Destination Post"}</h1>
<select value={selectedPostId || ""} onChange={handlePostSelectChange}>
<option value="">Select a post or create new</option>
{posts.map((post) => (
<option key={post._id} value={post._id}>
{post.title}
</option>
))}
</select>
<input
type="text"
placeholder="Enter post title"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>
<div ref={quillRef} style={{ height: 200 }}></div>
<button onClick={handleSubmit}>{selectedPostId ? "Update" : "Create"}</button>
{selectedPostId && <button onClick={handleDelete}>Delete</button>}
</div>
);
}

export default AdminCreateDestination;