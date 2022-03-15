import { useAuth } from "../app/authContext";
import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { CircularProgress, Backdrop } from "@mui/material";

const publicRoutes = ["/"];

const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading)
      if (!isAuthenticated) router.push("/");
      else if (publicRoutes.includes(router.pathname)) router.push("/dashboard");
  }, [isAuthenticated, loading]);
  if (loading) {
    return (
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (isAuthenticated && !publicRoutes.includes(router.pathname)) ||
    (!isAuthenticated && publicRoutes.includes(router.pathname)) ? (
    children
  ) : (
    <Fragment />
  );
};

export default ProtectRoute;
