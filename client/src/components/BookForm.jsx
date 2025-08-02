import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../utils/api";

function BookForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    condition: "Good",
    image: null,
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => {
      const form = new FormData();
      for (const key in data) form.append(key, data[key]);
      return axios.post(`${API_URL}/api/books`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myBooks"]);
      setFormData({ title: "", author: "", condition: "Good", image: null });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block">Author</label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block">Condition</label>
        <select
          value={formData.condition}
          onChange={(e) =>
            setFormData({ ...formData, condition: e.target.value })
          }
          className="border p-2 w-full"
        >
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
      </div>
      <div>
        <label className="block">Image</label>
        <input
          type="file"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
          className="border p-2 w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={mutation.isLoading}
      >
        Add Book
      </button>
    </form>
  );
}

export default BookForm;
