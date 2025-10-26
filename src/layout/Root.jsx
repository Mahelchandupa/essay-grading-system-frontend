import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";

export const Root = () => {
  const { user, logOut } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar (only show when authenticated) */}
      {user && (
        <Header student={user.student} onLogout={logOut} />
      )}
      
      {/* Main content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};