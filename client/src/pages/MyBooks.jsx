import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookCard from "../components/BookCard";

function MyBooks() {
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["myBooks"],
    queryFn: () =>
      axios
        .get("http://localhost:5500/api/books/my", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => res.data),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard key={book._id} book={book} isOwner={true} />
        ))}
      </div>
    </div>
  );
}

export default MyBooks;
