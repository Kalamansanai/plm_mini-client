import { Box } from "@mui/material";

type Props = {
    children: React.ReactNode;
    currentIndex: number;
    index: number;
    [boxProps: string]: any;
};

export default function TabPanel({ children, currentIndex, index, ...boxProps }: Props) {
    console.log(`index ${index}: ${currentIndex === index}`);
    return (
        <Box display={currentIndex === index ? "flex" : "none"} {...boxProps}>
            {children}
        </Box>
    );
}
