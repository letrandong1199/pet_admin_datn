import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from '@mui/material';
import { Download as DownloadIcon } from '../../icons/download';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';

export const ProductListToolbar = (props) => {
  const handleClickSearch = (e) => {
    e.preventDefault();
    console.log('Click......', e.target);
  }
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      props.setSearch(e.target.value)
    }

  }
  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Posts
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon
                          onClick={handleClickSearch} />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search post"
                variant="outlined"
                onKeyDown={handleEnter}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

