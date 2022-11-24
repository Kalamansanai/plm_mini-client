import React, { useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { Box, Typography } from "@mui/material";

import "./anim.css";

type Props = {
    value: any;
    label: string;
    icon?: React.ReactElement;
    color?: string;
    animate?: boolean;
};

export function LabeledValue({ value, label, icon, color, animate }: Props) {
    const ref = useRef<HTMLElement | null>(null);
    const colorRef = useRef<string>(color ? color : "background.subtle");

    if (ref.current && animate) {
        colorRef.current = "primary.light";
        ref.current.style.transition = "background-color 300ms ease-in-out";
    }

    setTimeout(() => {
        if (ref.current && animate) {
            colorRef.current = "secondary.main";
            ref.current.style.transition = "";
        }
    }, 300);

    return (
        <Box
            display="flex"
            ref={ref}
            alignItems="center"
            sx={{
                bgcolor: colorRef.current,
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
                <Typography fontSize="1.1em">{value}</Typography>
                <Typography sx={{ lineHeight: 1.25, color: "text.secondary" }} variant="overline">
                    {label}
                </Typography>
            </Box>
        </Box>
    );
}
