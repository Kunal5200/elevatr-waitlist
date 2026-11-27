"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { shimmerPulseKeyframes } from "./animations";

const LIST_ROWS = [
  { top: "54%", bottom: "84%" },
  { top: "56%", bottom: "36%" },
  { top: "62%", bottom: "40%" },
];

export default function MobileWireframe() {
  return (
    <Paper
      elevation={0}
      aria-hidden="true"
      sx={{
        width: { xs: 232, sm: 256, md: 272 },
        borderRadius: "36px",
        border: "1.5px solid #E2E2E6",
        p: "9px",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          borderRadius: "28px",
          border: "1px solid #ECECF0",
          bgcolor: "#FFFFFF",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Dynamic Island / Speaker Pill */}
        <Box
          sx={{
            width: 58,
            height: 12,
            borderRadius: "999px",
            bgcolor: "#DFDFE3",
            mx: "auto",
            mt: 1.75,
            mb: 2,
          }}
        />

        {/* Header Bar + Avatar */}
        <Box
          sx={{
            px: 2.25,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.75,
          }}
        >
          <Box
            sx={{
              width: "44%",
              height: 6,
              borderRadius: "999px",
              bgcolor: "#DCDCE0",
            }}
          />
          <Box
            sx={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              bgcolor: "#E5E5E9",
            }}
          />
        </Box>

        {/* Hero Media Placeholder */}
        <Box
          sx={{
            mx: 2.25,
            height: { xs: 118, sm: 132, md: 140 },
            borderRadius: "10px",
            bgcolor: "#EAEAEF",
            mb: 2.25,
            animation: `${shimmerPulseKeyframes} 3.2s ease-in-out infinite`,
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none",
            },
          }}
        />

        {/* List Rows */}
        <Box
          sx={{
            px: 2.25,
            display: "flex",
            flexDirection: "column",
            gap: 1.6,
            mb: 3.25,
          }}
        >
          {LIST_ROWS.map((row, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
              }}
            >
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  bgcolor: "#DCDCE0",
                  flexShrink: 0,
                }}
              />
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.65,
                }}
              >
                <Box
                  sx={{
                    width: row.top,
                    height: 5.5,
                    borderRadius: "999px",
                    bgcolor: "#DCDCE0",
                  }}
                />
                <Box
                  sx={{
                    width: row.bottom,
                    height: 5.5,
                    borderRadius: "999px",
                    bgcolor: "#ECECF0",
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom Tab Bar */}
        <Box
          sx={{
            mt: "auto",
            borderTop: "1px solid #F0F0F4",
            py: 1.75,
            px: 3.25,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {[0, 1, 2, 3].map((tab) => (
            <Box
              key={tab}
              sx={{
                width: 11,
                height: 11,
                borderRadius: "3px",
                border: "1.25px solid #D4D4D8",
              }}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
