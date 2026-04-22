import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { saveAuthData } from "../utils/auth";

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const id = searchParams.get("id");
    const fullName = searchParams.get("fullName");
    const email = searchParams.get("email");
    const role = searchParams.get("role");

    if (!token || !id || !fullName || !email || !role) {
      navigate("/login");
      return;
    }

    saveAuthData(token, {
      id,
      fullName,
      email,
      role,
    });

    navigate("/dashboard");
  }, [navigate, searchParams]);

  return (
    <section style={{ padding: "60px 24px", textAlign: "center" }}>
      <h2>Duke përfunduar login me Google...</h2>
    </section>
  );
};

export default GoogleAuthSuccess;