import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RequestCard from "../components/RequestCard";
import API_URL from "../utils/api";

function MyRequests() {
  const { data: sentRequests = [], isLoading: sentLoading } = useQuery({
    queryKey: ["sentRequests"],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/requests/my`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => res.data),
  });

  const { data: receivedRequests = [], isLoading: receivedLoading } = useQuery({
    queryKey: ["receivedRequests"],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/requests/received`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => res.data),
  });

  if (sentLoading || receivedLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Requests</h1>
      <h2 className="text-xl font-semibold mb-2">Sent Requests</h2>
      {sentRequests.length === 0 ? (
        <p className="mb-8">
          No sent requests. Browse{" "}
          <a href="/" className="underline">
            available books
          </a>{" "}
          to request one.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {sentRequests.map((request) => (
            <RequestCard key={request._id} request={request} isOwner={false} />
          ))}
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2">Received Requests</h2>
      {receivedRequests.length === 0 ? (
        <p>
          No received requests.{" "}
          <a href="/add-book" className="underline">
            Add a book
          </a>{" "}
          to receive requests.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {receivedRequests.map((request) => (
            <RequestCard key={request._id} request={request} isOwner={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRequests;
