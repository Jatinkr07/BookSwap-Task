import BookForm from "../components/BookForm";

function AddBook() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <BookForm />
    </div>
  );
}

export default AddBook;
