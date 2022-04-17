import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from "@mui/material/Stack/Stack";


// @ts-ignore
import FeaturedPost from './FeaturedPost.tsx';
// @ts-ignore
import Footer from './Footer.tsx';
// @ts-ignore
import Player from './Player.tsx'
// @ts-ignore
import Header from "./Header.tsx";
// @ts-ignore
import MainFeaturedPost from "./MainFeaturedPost.tsx";


import {useHttpClient} from "../api/http-hook";
import {useParams} from "react-router-dom";
// @ts-ignore
import {VideoItem} from "./VideoItem.tsx";
import Typography from "@mui/material/Typography";

const sections = [
  {title: 'Technology', url: '#'},
  {title: 'Design', url: '#'},
  {title: 'Culture', url: '#'},
  {title: 'Business', url: '#'},
  {title: 'Politics', url: '#'},
  {title: 'Opinion', url: '#'},
  {title: 'Science', url: '#'},
  {title: 'Health', url: '#'},
  {title: 'Style', url: '#'},
  {title: 'Travel', url: '#'},
];
const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};
const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Po1st title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Po123st title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];
const theme = createTheme();

export type videoDataType = {
  contentId: string,
  contentType: string,
  assets: [{
    height: number,
    width: number,
    url: string,
  }],
  thumbnails: [{
    height: number,
    width: number,
    size: string,
    url: string,
  }],
  tags: string[],
  metadata: {
    description: string,
    duration: number,
    networks: string[],
    publishDate: string,
    slug: string,
    state: string,
    title: string,
    videoSeries: string,
  }
}


type videoListType = {
  count: number,
  startIndex: number,
  data: videoDataType[]
}


export const AmainPage = () => {
  const [videoList, setVideoList] = useState<videoListType>();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [video, setVideo] = useState<videoDataType>();
  const videoRef = useRef<videoDataType>();

  useEffect(() => { //useEffect do not want async here
    const fetchVideos = async () => {
      try {
        const data = await sendRequest(
          "https://cors-anywhere.herokuapp.com/https://ign-apis.herokuapp.com/videos",
          'GET',
          null,
          {contentType: "application/json; charset=utf-8"});
        (data.data.map(i => console.log(i.metadata)));
        setVideoList(data);

      } catch (err) {
        console.log(error + err);
      }
    };
    fetchVideos();
  }, []);// Never re-run


  const vid = useParams().vid;
  const getVideo = () => {
    videoList.data.map(d => {
      if (d.contentId === vid) {
        videoRef.current = d;
      }
    })
    if (!videoRef.current) {
      videoRef.current = videoList.data[0];
    }
  }



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>


      {!isLoading && !error && videoList ? (

        <Container maxWidth="xl">
          <Header title="VIDEO" sections={sections}/>
          <main>
            {/*// @ts-ignore*/}
            <React.Fragment>
              {getVideo()}
              <MainFeaturedPost videoData={videoRef.current}/>

              {/*{videoList.data.map(d => {*/}
              {/*  return (*/}
              {/*    <div className={'center'}>*/}
              {/*      {d.metadata.title}*/}
              {/*      <Button href={`/videos/${encodeURI(d.contentId)}`}>Edit</Button>*/}
              {/*    </div>)*/}
              {/*}) }*/}

              {/*<Grid container spacing={4}>*/}
              {/*  {featuredPosts.map((post) => (*/}
              {/*    <FeaturedPost key={post.title} post={post}/>*/}
              {/*  ))}*/}
              {/*</Grid>*/}

              <Grid container spacing={5} sx={{mt: 1}} rowSpacing={1}>
                <Grid item container xs={12} md={12} lg={8} spacing={5}>
                  <Grid item xs={12}>
                    <Player url={videoRef.current.assets[0].url} muted={false}/>
                  </Grid>
                  <Grid item container xs={12}>
                    <Stack spacing={3}>

                      <Typography variant="h4">
                        {videoRef.current.metadata.title}
                      </Typography>
                      <Typography variant="h6">
                        {videoRef.current.metadata.publishDate}
                        {videoRef.current.metadata.videoSeries}
                      </Typography>
                      <Typography variant="body2">
                        {videoRef.current.metadata.description}
                      </Typography>

                    </Stack>


                  </Grid>

                </Grid>
                <Grid item xs={12} lg={4} container spacing={2}>
                  <Box>
                    <ImageList sx={{
                      width: "100%",
                      height: 820,
                      borderTop: "2px solid",
                      borderBottom: "2px solid",
                      borderColor: '#BBBBBB',
                      borderRadius: 1
                    }}
                               cols={1}>
                      {videoList.data.map((d, i) => (
                        <ImageListItem key={d.metadata.title}>
                          <VideoItem key={d.metadata.title} videoData={d}/>
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                </Grid>
              </Grid>

              {/*  <Grid item xs={12} lg={4} container spacing={2}>*/}
              {/*    /!*<Box>*!/*/}
              {/*    /!*<ImageList sx={{width: "100%", height: 580, border: 0, borderColor: '#BBBBBB', borderRadius: 1}}*!/*/}
              {/*    /!*           cols={1}>*!/*/}
              {/*    {videoList.data.map((d, i) => (*/}
              {/*      // <ImageListItem key={d.metadata.title}>*/}
              {/*      <Grid item xs={12}  spacing={2}>*/}
              {/*        <VideoItem key={d.metadata.title} videoData={d}/>*/}
              {/*      </Grid>*/}
              {/*      // </ImageListItem>*/}
              {/*    ))}*/}
              {/*    /!*</ImageList>*!/*/}
              {/*    /!*</Box>*!/*/}
              {/*  </Grid>*/}
              {/*</Grid>*/}

            </React.Fragment>
          </main>

        </Container>) : (
        <div className={'center'}>LOADING
        </div>
      )


      }
      {!!error && <div className={'center'}>
        {JSON.stringify(error)}
      </div>
      }


      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
