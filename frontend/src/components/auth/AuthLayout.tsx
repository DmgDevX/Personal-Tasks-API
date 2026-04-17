import { Box, Container, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import FuturisticCard from "../common/FuturisticCard";

interface AuthLayoutProps extends PropsWithChildren {
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at top left, rgba(108,99,255,0.22), transparent 28%), radial-gradient(circle at bottom right, rgba(0,229,255,0.16), transparent 28%), linear-gradient(135deg, #060912 0%, #0A1020 45%, #05070E 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: { xs: "22px 22px", sm: "32px 32px" },
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.2))",
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          py: { xs: 3, sm: 4, md: 6 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Stack
          spacing={{ xs: 3, sm: 4 }}
          sx={{ minHeight: "100vh", justifyContent: "center" }}
        >
          <Stack spacing={1.25} textAlign="center">
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                lineHeight: 1.1,
                background: `linear-gradient(90deg, #FFFFFF 0%, ${alpha(
                  "#00E5FF",
                  0.95
                )} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Task Manager
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 520,
                mx: "auto",
                fontSize: { xs: "0.95rem", sm: "1rem" },
              }}
            >
              Organiza tus tareas con una experiencia moderna y futurista.
            </Typography>
          </Stack>

          <FuturisticCard sx={{ p: { xs: 2.25, sm: 3, md: 4 } }}>
            <Stack spacing={1} mb={{ xs: 2.5, sm: 3 }}>
              <Typography
                variant="h4"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            </Stack>
            {children}
          </FuturisticCard>
        </Stack>
      </Container>
    </Box>
  );
}