import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import API_URL from "../utils/api";

function BookCard({ book, isOwner }) {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const requestMutation = useMutation({
    mutationFn: () =>
      axios.post(
        `${API_URL}/api/requests`,
        { bookId: book._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      queryClient.invalidateQueries(["sentRequests"]);
      alert("Book request sent successfully!");
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      axios.delete(`${API_URL}/api/books/${book._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["myBooks"]);
      alert("Book deleted successfully!");
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={`${API_URL}${book.image}`}
        alt={book.title}
        className="w-full h-48 object-cover mb-2"
      />
      <h3 className="text-lg font-bold">{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Condition: {book.condition}</p>
      <p>Posted by: {book.user.username}</p>
      {isOwner ? (
        <button
          onClick={() => deleteMutation.mutate()}
          className="bg-red-500 text-white p-2 rounded mt-2 flex items-center"
          disabled={deleteMutation.isLoading}
        >
          <FaTrash className="mr-1" /> Delete
        </button>
      ) : (
        <button
          onClick={() => requestMutation.mutate()}
          className="bg-blue-500 text-white p-2 rounded mt-2"
          disabled={requestMutation.isLoading || !token}
        >
          {requestMutation.isLoading ? "Requesting..." : "Request Book"}
        </button>
      )}
    </div>
  );
}

export default BookCard;
