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

export default function AppShell({
  user,
  onLogout,
  children,
}: AppShellProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
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
        <Toolbar
          sx={{
            minHeight: { xs: 72, sm: 80 },
            px: { xs: 2, sm: 3 },
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1.5, sm: 2 },
              px: "0 !important",
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ width: "100%", minWidth: 0 }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  width: { xs: 40, sm: 44 },
                  height: { xs: 40, sm: 44 },
                }}
              >
                <BoltOutlinedIcon />
              </Avatar>

              <Box sx={{ minWidth: 0, textAlign: "left" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                    lineHeight: 1.2,
                    wordBreak: "break-word",
                  }}
                >
                  Task Manager
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block" }}
                >
                  Panel de productividad
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              justifyContent={{ xs: "space-between", sm: "flex-end" }}
              sx={{ width: "100%" }}
            >
              <Box
                textAlign="right"
                sx={{
                  display: { xs: "none", sm: "block" },
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={700}
                  noWrap
                  title={user.username}
                >
                  {user.username}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  title={user.email}
                >
                  {user.email}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                startIcon={<LogoutRoundedIcon />}
                onClick={onLogout}
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  maxWidth: { xs: "100%", sm: "none" },
                }}
              >
                Salir
              </Button>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 2.5, sm: 3, md: 4 },
          px: { xs: 2, sm: 3 },
        }}
      >
        {children}
      </Container>
    </Box>
  );
}