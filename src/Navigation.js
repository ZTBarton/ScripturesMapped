import { Box, Stack } from "@mui/material";

function Navigation({ children }) {
    return (
    <Box
        id='scriptures'
        sx={{
            width: 500,
            backgroundColor: 'secondary.light',
            overflow: 'scroll'
        }}
    >
        <Stack m={2}>
            {typeof children === 'string' ? 
                <Box dangerouslySetInnerHTML={{__html: children}}></Box> :
                children  
            }
        </Stack>
    </Box>
    );
}

export default Navigation;
