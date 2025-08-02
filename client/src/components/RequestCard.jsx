import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import API_URL from "../utils/api";

function RequestCard({ request, isOwner }) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (status) =>
      axios.put(
        `${API_URL}/api/requests/${request._id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["sentRequests"]);
      queryClient.invalidateQueries(["receivedRequests"]);
      alert(data.data.message);
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-bold">{request.book.title}</h3>
      <p>Author: {request.book.author}</p>
      <p>Condition: {request.book.condition}</p>
      <p>
        Status:{" "}
        <span
          className={`font-semibold ${
            request.status === "accepted"
              ? "text-green-500"
              : request.status === "declined"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {request.status}
        </span>
      </p>
      {isOwner ? (
        <>
          <p>Requested by: {request.requester.username}</p>
          {request.status === "pending" && (
            <div className="space-x-2 mt-2">
              <button
                onClick={() => updateMutation.mutate("accepted")}
                className="bg-green-500 text-white p-2 rounded flex items-center"
                disabled={updateMutation.isLoading}
              >
                <FaCheck className="mr-1" /> Accept
              </button>
              <button
                onClick={() => updateMutation.mutate("declined")}
                className="bg-red-500 text-white p-2 rounded flex items-center"
                disabled={updateMutation.isLoading}
              >
                <FaTimes className="mr-1" /> Decline
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Requested from: {request.owner.username}</p>
      )}
      <p className="text-sm text-gray-500 mt-2">
        Last updated: {new Date(request.updatedAt).toLocaleString()}
      </p>
    </div>
  );
}

export default RequestCard;
