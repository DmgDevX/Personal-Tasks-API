import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import type { PropsWithChildren } from "react";
import type { User } from "../../types/user";

interface AppShellProps extends PropsWithChildren {
  user: User;
  onLogout: () => void;
}

export default function AppShell({ user, onLogout, children }: AppShellProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(108,99,255,0.18), transparent 25%), radial-gradient(circle at bottom right, rgba(0,229,255,0.12), transparent 25%), linear-gradient(135deg, #060912 0%, #0A1020 45%, #05070E 100%)",
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: alpha("#08101D", 0.75),
          borderBottom: `1px solid ${alpha("#8AA4FF", 0.14)}`,
          backdropFilter: "blur(16px)",
        }}
      >
        <Toolbar>
          <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: "0 !important" }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar sx={{ bgcolor: "primary.main", color: "white" }}>
                <BoltOutlinedIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Task Manager</Typography>
                <Typography variant="caption" color="text.secondary">
                  Panel de productividad
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Box textAlign="right" sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography variant="body2" fontWeight={700}>
                  {user.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
              <Button variant="outlined" startIcon={<LogoutRoundedIcon />} onClick={onLogout}>
                Salir
              </Button>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}