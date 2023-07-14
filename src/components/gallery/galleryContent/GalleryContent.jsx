// import PropTypes from 'prop-types';
import { LoadMoreBTN } from '../../button/LoadMoreBTN';

import { GalleryApi } from '../../../helpers/galery-fech';
import { DisplayImage } from '../displayImage/DisplayImage';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';
import  './Gallery.css';
import React, { useState, useEffect } from 'react';


const GalleryContent = ({ query }) => {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setStatus('pending');
      setPage(1);

      try {
        const { hits, total } = await GalleryApi(query, 1);

        Notiflix.Loading.standard();
        if (total === 0) {
          const error = new Error(
            'Sorry, there are no images matching your search query.'
          );
          Notiflix.Loading.remove();
          setError(error);
          setStatus('rejected');
          return;
        }

        setGallery(hits);
        setStatus('resolved');
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }

      Notiflix.Loading.remove();
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  const loadMoreHandler = async () => {
    try {
      const { hits } = await GalleryApi(query, page);
      setGallery((prevGallery) => [...prevGallery, ...hits]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error);
      setStatus('rejected');
    }
  };

  if (status === 'pending') {
    return <div>jd</div>;
  }

  if (status === 'rejected') {
    Notify.failure(`${error.message}`);
    return null;
  }

  if (status === 'resolved') {
    return (
      <>
        <div className={'Gallery'}>
          {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
            <DisplayImage
              key={id}
              url={webformatURL}
              alt={tags}
              largeImage={largeImageURL}
            />
          ))}
        </div>
        <LoadMoreBTN onClick={loadMoreHandler}>Load more</LoadMoreBTN>
      </>
    );
  }

  return null;
};

export default GalleryContent;