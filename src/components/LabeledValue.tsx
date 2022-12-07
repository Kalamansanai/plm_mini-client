import React, { useEffect, useRef } from "react";

import { Box, Typography } from "@mui/material";

import "./anim.css";

type Props = {
    value: any;
    label: string;
    icon?: React.ReactElement;
    animate?: boolean;
};

export function LabeledValue({ value, label, icon, animate }: Props) {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (ref.current && animate) {
            ref.current.classList.remove("labeled-value-flash-out");
            ref.current.classList.add("labeled-value-flash-in");
        }

        setTimeout(() => {
            if (ref.current && animate) {
                ref.current.classList.remove("labeled-value-flash-in");
                ref.current.classList.add("labeled-value-flash-out");
            }
        }, 50);
    }, [value]);

    return (
        <Box
            ref={ref}
            display="flex"
            alignItems="center"
            bgcolor="background.subtle"
            sx={{
                p: 1,
                borderRadius: "8px",
            }}
        >
            {icon ? icon : null}
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                sx={{ ml: icon ? 1 : 0 }}
            >
                <Typography fontSize="1.6em">{value}</Typography>
                <Typography
                    fontSize="1em"
                    sx={{ lineHeight: 1.25, color: "text.secondary" }}
                    variant="overline"
                >
                    {label}
                </Typography>
            </Box>
        </Box>
    );
}
