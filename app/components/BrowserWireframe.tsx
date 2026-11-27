"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { shimmerPulseKeyframes } from "./animations";

const SIDEBAR_ITEMS = ["76%", "64%", "70%", "52%"];

export default function BrowserWireframe() {
  return (
    <Paper
      elevation={0}
      aria-hidden="true"
      sx={{
        width: "100%",
        borderRadius: "12px",
        border: "1px solid #B299FC",
        bgcolor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Window Title Bar */}
      <Box
        sx={{
          height: 36,
          px: 2,
          display: "flex",
          alignItems: "center",
          position: "relative",
          borderBottom: "1px solid #ECE7FE",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          {[0, 1, 2].map((dot) => (
            <Box
              key={dot}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "1px solid #D4D4D8",
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "34%",
            height: 11,
            borderRadius: "999px",
            bgcolor: "#EFEFEF",
          }}
        />
      </Box>

      {/* Window Body */}
      <Box
        sx={{
          display: "flex",
          minHeight: { xs: 220, sm: 290, md: 345 },
        }}
      >
        {/* Left Sidebar */}
        <Box
          sx={{
            width: "21%",
            minWidth: 92,
            borderRight: "1px solid #F1EFF7",
            p: { xs: 1.75, sm: 2.5 },
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: "46%",
              height: 8,
              borderRadius: "999px",
              bgcolor: "#DCDCDC",
              mb: 1.25,
            }}
          />
          {SIDEBAR_ITEMS.map((width, index) => (
            <Box
              key={index}
              sx={{
                width,
                height: 7,
                borderRadius: "999px",
                bgcolor: "#EDEDED",
              }}
            />
          ))}
        </Box>

        {/* Main Content Canvas */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, sm: 2.75 },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          <Box
            sx={{
              width: "24%",
              height: 9,
              borderRadius: "999px",
              bgcolor: "#DCDCDC",
            }}
          />

          <Box
            sx={{
              flex: 1,
              minHeight: { xs: 110, sm: 160, md: 195 },
              borderRadius: "8px",
              bgcolor: "#EFEFEF",
              animation: `${shimmerPulseKeyframes} 3.2s ease-in-out infinite`,
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
              },
            }}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: { xs: 1.25, sm: 2 },
            }}
          >
            {[0, 1, 2].map((card) => (
              <Box
                key={card}
                sx={{
                  height: { xs: 54, sm: 76, md: 92 },
                  borderRadius: "8px",
                  bgcolor: "#EFEFEF",
                  animation: `${shimmerPulseKeyframes} 3.2s ease-in-out ${card * 250}ms infinite`,
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
