import { SxProps, Theme, Typography } from "@mui/material";

type Props = {
    children: string;
    sx?: SxProps<Theme>;
};

export default function Title({ children, sx = [] }: Props) {
    return (
        <Typography
            fontSize="1.2em"
            variant="overline"
            lineHeight={1}
            sx={[...(Array.isArray(sx) ? sx : [sx])]}
        >
            {children}
        </Typography>
    );
}
