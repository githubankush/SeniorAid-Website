import api from "../api";

// Fetch by status
export const fetchPending = () =>
  api.get("/requests?status=Pending", { withCredentials: true }).then((r) => r.data);

export const fetchAssigned = () =>
  api.get("/requests?status=Accepted", { withCredentials: true }).then((r) => r.data);

export const fetchCompleted = () =>
  api.get("/requests?status=Completed", { withCredentials: true }).then((r) => r.data);

// Generic update (not used directly but kept for compatibility)
export const updateReqStatus = (id, status) => {
  let endpoint = "";

  if (status === "Accepted") endpoint = `/requests/${id}/accept`;
  else if (status === "Completed") endpoint = `/requests/${id}/complete`;
  else if (status === "Pending") endpoint = `/requests/${id}/cancel`;

  return api.put(endpoint, {}, { withCredentials: true }).then((r) => r.data);
};

// Helpers (wrappers for readability)
export const acceptReq = (id) => updateReqStatus(id, "Accepted");
export const completeReq = (id) => updateReqStatus(id, "Completed");
export const cancelReq = (id) => updateReqStatus(id, "Pending");
