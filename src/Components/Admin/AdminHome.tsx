import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="space-y-4">
        <button
          onClick={() => navigate("createmenu")}
          className="w-full px-4 py-2 btn btn-outline btn-primary"
        >
          Create Menu
        </button>
        <button
          onClick={() => navigate("editmenu")}
          className="w-full px-4 py-2 btn btn-outline"
        >
          Edit Menu
        </button>
        <button
          onClick={() => navigate("deletemenu")}
          className="w-full px-4 py-2 btn btn-outline btn-error"
        >
          Delete Menu
        </button>
      </div>
    </div>
  );
}

export default AdminHome;
