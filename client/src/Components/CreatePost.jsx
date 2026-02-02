import { useState } from "react";
import axios from "axios";

const CreatePost = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async () => {
    if (!message && !file) return;
    const token = sessionStorage.getItem("token");

    const formData = new FormData();
    formData.append("message", message);
    if (file) {
      formData.append("media", file);
    }
    axios
      .post("http://localhost:5000/api/posts", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Post créé avec succès", res.data);
        alert("Post créé avec succès !");
        setMessage("");
        setFile(null);
        setPreview(null);
        onClose();
      })
      .catch((error) => {
        console.error("Erreur lors de la création du post", error);
        alert("Erreur lors de la création du post");
      });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl p-5 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Créer un post</h2>

        {/* Text */}
        <textarea
          placeholder="Quoi de neuf ?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full border rounded-lg p-3 resize-none outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Preview */}
        {preview && (
          <div className="mt-4 rounded-lg overflow-hidden">
            {file.type.startsWith("image") ? (
              <img
                src={preview}
                alt="preview"
                className="w-full max-h-[250px] object-cover"
              />
            ) : (
              <video src={preview} controls className="w-full max-h-[250px]" />
            )}
          </div>
        )}

        {/* Upload */}
        <div className="mt-4">
          <label className="block font-semibold mb-2">Image ou Vidéo</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Actions */}
        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={!message && !file}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600"
          >
            Publier
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
