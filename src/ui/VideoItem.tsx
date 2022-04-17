import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


export const VideoItem = ({videoData: {contentId, metadata, thumbnails}}) => {

  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="a" href={`/videos/${encodeURI(contentId)}`}>
        <Card sx={{display: 'flex', height: 110}}>
          {/*<Grid container>*/}
            {/*<Grid item xs={4}>*/}
              <CardMedia
                component="img"
                sx={{maxHeight: 110, maxWidth: 192, display: {xs: 'flex', sm: 'flex'}}}
                image={thumbnails[0].url}
                alt={metadata.title}

              />
            {/*</Grid>*/}
            {/*<Grid item xs={8}>*/}
              <CardContent sx={{flex: 1}}>
                <Typography component="h2" variant="subtitle2">
                  {metadata.title}
                </Typography>
              </CardContent>
            {/*</Grid>*/}
          {/*</Grid>*/}


        </Card>
      </CardActionArea>
    </Grid>
    // <Grid item xs={12} md={12}
    //       sx={{display: {xs: 'none', sm: 'block'}}}>
    //   <CardActionArea component="a" href={`/videos/${encodeURI(contentId)}`}>
    //     <Card sx={{display: 'flex', height: 90, width: 430}}>
    //       <CardMedia
    //         component="img"
    //         sx={{flex: 0, height: 90, width: 157, align: "center", display: {xs: 'none', sm: 'block'}}}
    //         image={thumbnails[0].url}
    //         alt={metadata.title}
    //       />
    //       <CardContent sx={{
    //         flex: 1
    //       }}>
    //         <Box sx={{
    //           position: "absolute",
    //           top: "50%",
    //           transform: "translate(0, -50%)"
    //         }}>
    //           <Typography component="h1" variant="subtitle2">
    //             {metadata.title}
    //           </Typography>
    //         </Box>
    //       </CardContent>
    //
    //     </Card>
    //   </CardActionArea>
    // </Grid>
  );
}
