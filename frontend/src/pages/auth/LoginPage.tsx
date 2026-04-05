import { useState, type FormEvent } from "react";
import {
  Alert,
  Button,
  Link as MuiLink,
  Stack,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import type { AxiosError } from "axios";
import AuthLayout from "../../components/auth/AuthLayout";
import { useAuth } from "../../hooks/useAuth";
import type { ApiErrorResponse } from "../../types/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      enqueueSnackbar("Sesión iniciada correctamente", {
        variant: "success",
      });
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        "No se pudo iniciar sesión";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Iniciar sesión"
      subtitle="Accede a tu espacio de organización personal."
    >
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" size="large" disabled={loading}>
          Entrar
        </Button>

        <MuiLink
          component={Link}
          to="/register"
          underline="hover"
          sx={{ alignSelf: "center" }}
        >
          ¿No tienes cuenta? Regístrate
        </MuiLink>
      </Stack>
    </AuthLayout>
  );
}