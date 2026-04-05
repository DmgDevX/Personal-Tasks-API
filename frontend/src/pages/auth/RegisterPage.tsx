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

export default function RegisterPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register({ username, email, password });
      enqueueSnackbar("Cuenta creada correctamente", {
        variant: "success",
      });
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        "No se pudo completar el registro";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Empieza a gestionar tus boards y tareas de forma inteligente."
    >
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
        />

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
          helperText="Mínimo 6 caracteres"
        />

        <Button type="submit" variant="contained" size="large" disabled={loading}>
          Registrarme
        </Button>

        <MuiLink
          component={Link}
          to="/login"
          underline="hover"
          sx={{ alignSelf: "center" }}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </MuiLink>
      </Stack>
    </AuthLayout>
  );
}