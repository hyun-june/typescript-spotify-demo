import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      sidebar
      <Outlet />
    </div>
  );
};

export default AppLayout;
