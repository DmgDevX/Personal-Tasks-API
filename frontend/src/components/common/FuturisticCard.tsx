import { Card, type CardProps } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function FuturisticCard(props: CardProps) {
  return (
    <Card
      {...props}
      sx={{
        position: "relative",
        overflow: "hidden",
        border: `1px solid ${alpha("#7c9cff", 0.14)}`,
        background: `linear-gradient(180deg, ${alpha("#0f172a", 0.86)} 0%, ${alpha("#111827", 0.78)} 100%)`,
        backdropFilter: "blur(16px)",
        boxShadow: `0 20px 70px ${alpha("#000", 0.28)}`,
        ...props.sx,
      }}
    />
  );
}