import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

interface MainFeaturedPostProps {
  post: {
    description: string;
    image: string;
    imageText: string;
    linkText: string;
    title: string;
  };
}

export default function MainFeaturedPost({videoData: {contentId, metadata, thumbnails}}) {

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${thumbnails[2].url})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{display: 'none'}} src={thumbnails[2].url} alt={metadata.title}/>}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.7)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: {xs: 3, md: 6},
              pr: {md: 0},
            }}
          >
            <Typography component="h1" variant="h5" color="inherit" gutterBottom>
              {metadata.title}
            </Typography>
            <Typography variant="body1" color="inherit" paragraph>
              {metadata.description.length > 250 ? metadata.description.substring(0, 250) + "..." : metadata.description}
            </Typography>

          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
