import { useEffect, useMemo, useState } from "react";
import { fetchPending, fetchAssigned, fetchCompleted, acceptReq, completeReq, cancelReq } from "../services/requestService";
import { toast } from "react-toastify";
import {
  Handshake,
  CheckCircle2,
  Clock3,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Search,
  Loader2,
  Undo2,
} from "lucide-react";

const chip = (status) => {
  const map = {
    Pending: "bg-yellow-100 text-yellow-800",
    Accepted: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
  };
  return `inline-block px-2 py-0.5 text-xs rounded-full font-semibold ${map[status] || "bg-gray-100 text-gray-700"}`;
};

const fmtDate = (iso) => new Date(iso).toLocaleString();

export default function VolunteerDashboard() {
  const [tab, setTab] = useState("pending"); // pending | assigned | completed
  const [pending, setPending] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [p, a, c] = await Promise.all([fetchPending(), fetchAssigned(), fetchCompleted()]);
      setPending(p);
      setAssigned(a);
      setCompleted(c);
    } catch (e) {
      toast.error("Failed to load requests");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // Optional: polling every 20s for fresh pending
    // const t = setInterval(load, 20000);
    // return () => clearInterval(t);
  }, []);

  const list = useMemo(() => {
    const source = tab === "pending" ? pending : tab === "assigned" ? assigned : completed;
    if (!q.trim()) return source;
    const s = q.toLowerCase();
    return source.filter((r) =>
      [r.title, r.description, r.type, r.urgency, r.destination, r?.createdBy?.name]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(s))
    );
  }, [tab, pending, assigned, completed, q]);

  const onAccept = async (id) => {
    try {
      await acceptReq(id);
      toast.success("Request accepted");
      load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to accept");
    }
  };

  const onComplete = async (id) => {
    try {
      await completeReq(id);
      toast.success("Marked completed");
      load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to complete");
    }
  };

  const onCancel = async (id) => {
    try {
      await cancelReq(id);
      toast.success("Unassigned and returned to pending");
      load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to unassign");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-yellow-500" />
            Volunteer Dashboard
          </h1>
          <p className="text-gray-600">Review pending requests, manage your assigned ones, and close completed tasks.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title, type, person…"
              className="pl-9 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            onClick={load}
            className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black transition flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUpRight className="w-4 h-4" />}
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex overflow-x-auto">
          {[
            { key: "pending", label: "Pending", icon: Clock3, count: pending.length },
            { key: "assigned", label: "Assigned", icon: Handshake, count: assigned.length },
            { key: "completed", label: "Completed", icon: CheckCircle2, count: completed.length },
          ].map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 min-w-[140px] px-4 py-3 font-semibold flex items-center justify-center gap-2
                ${tab === key ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
            >
              <Icon className="w-4 h-4" />
              {label}
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${tab === key ? "bg-white/20" : "bg-gray-200"}`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* List */}
        <div className="p-4 sm:p-6 grid gap-4">
          {loading && (
            <div className="text-center text-gray-500 py-8">
              <Loader2 className="w-6 h-6 animate-spin inline-block mr-2" />
              Loading…
            </div>
          )}

          {!loading && list.length === 0 && (
            <div className="text-center text-gray-500 py-10">No requests found.</div>
          )}

          {!loading &&
            list.map((r) => (
              <div
                key={r._id}
                className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-gray-900">{r.title}</h3>
                      <span className={chip(r.status)}>{r.status}</span>
                      <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700 font-semibold">
                        {r.type || "General"}
                      </span>
                      {r.urgency && (
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-red-50 text-red-700 font-semibold">
                          {r.urgency} urgency
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mt-1">{r.description || "—"}</p>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      {r.destination && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {r.destination}
                        </span>
                      )}
                      <span>By: {r?.createdBy?.name || "Unknown"}</span>
                      <span>Created: {fmtDate(r.createdAt)}</span>
                      {r.updatedAt && <span>Updated: {fmtDate(r.updatedAt)}</span>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 sm:self-start">
                    {r.status === "Pending" && (
                      <button
                        onClick={() => onAccept(r._id)}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        Accept
                      </button>
                    )}

                    {r.status === "Accepted" && (
                      <>
                        <button
                          onClick={() => onComplete(r._id)}
                          className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => onCancel(r._id)}
                          className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 transition flex items-center gap-1"
                          title="Unassign"
                        >
                          <Undo2 className="w-4 h-4" />
                          Unassign
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
