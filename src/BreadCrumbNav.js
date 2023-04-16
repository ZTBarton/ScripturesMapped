import { Breadcrumbs, Typography, useTheme, Link } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function BreadCrumbNav({ currentLocation, navigateTo }) {
    const theme = useTheme();

  return (
    <Breadcrumbs separator={<NavigateNextIcon sx={{color: theme.palette.secondary.main}} />}>
        <Link 
            onClick={() => navigateTo({volume: null, book: null, chapter: null})} 
            sx={{color: theme.palette.secondary.main }}
        >
                Home
        </Link>
        {currentLocation.volume && (
            <Link
                onClick={() => navigateTo({volume: currentLocation.volume, book: null, chapter: null})}
                sx={{color: theme.palette.secondary.main }} 
            >
                {currentLocation.volume.fullName}
            </Link>
        )}
        {currentLocation.book && (
            <Link 
                onClick={() => navigateTo({volume: currentLocation.volume, book: currentLocation.book, chapter: null})}
                sx={{color: theme.palette.secondary.main }} 
            >
                {currentLocation.book.fullName}
            </Link>
        )}
        {currentLocation.chapter && (
            <Typography sx={{ color: theme.palette.secondary.main }} >{`Chapter ${currentLocation.chapter}`}</Typography>
        )}
    </Breadcrumbs>
  );
}

export default BreadCrumbNav;
