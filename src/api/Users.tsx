import * as React from "react";

import { useState, useEffect } from "react";

// import ErrorModal from "../../shared/components/UIElements/ErrorModal";
// import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {useHttpClient} from "./http-hook";



type videoDataType = {
  count: number,
  startIndex: number,
  data: [{
    contentId: string,
    contentType: string,
    assets:[{
      height: number,
      width: number,
      url: string,
    }],
    thumbnails:[{
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
  }]
}

export const Users = () => {


  const [videoData, setVideoData] = useState<videoDataType>();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();


  useEffect(() => { //useEffect do not want async here
    const fetchUsers = async () => {
      try {
        const data = await sendRequest("https://cors-anywhere.herokuapp.com/https://ign-apis.herokuapp.com/videos", 'GET', null, {contentType: "application/json; charset=utf-8"});// Default: GET
        console.log(data);
        setVideoData(data);
      } catch (err) {
        console.log(error + err);
      }
    };
    fetchUsers();
  }, [sendRequest]);// Never re-run


  return (
    <React.Fragment>
      {/*//errorHandler(), means you call the errorHandler and pass the return to the onClear*/}
      {/*cause a useState re-render*/}
      {isLoading && (
        <div className={'center'}>LOADING
        </div>
      )}
      {!isLoading && !error && videoData && videoData.data.map(d => {
        return(
        <div className={'center'}>
          {d.metadata.title}

        </div>)
      } )}
      {!!error &&  <div className={'center'}>
          {JSON.stringify(error)}
        </div>
      }




    </React.Fragment>

  );
};

