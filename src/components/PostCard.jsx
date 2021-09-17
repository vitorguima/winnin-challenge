import React from 'react';

import PropTypes from 'prop-types';

import '../styles/postCardStyle.css';

import noThumbnail from '../images/no-thumbnail.png';

export default function PostCard(props) {
  const {
    media,
    title,
    createdUtc,
    author,
    postUrl,
    thumbnail,
    testid,
  } = props;

  const validateLinkVisibility = () => (media ? 'hidden-link' : 'visible-link');

  const validateThumbnailUrl = () => {
    if (thumbnail === 'self') {
      return (
        <img
          src={ noThumbnail }
          alt="no-post-preview"
          className="thumb-not-available"
        />
      );
    } return (
      <img
        src={ thumbnail }
        alt="post-preview"
        className="thumb-available"
      />
    );
  };

  const convertCreationDate = (dateInUnix) => {
    const convertParam = 1000;
    const dateToIso = new Date(dateInUnix * convertParam);
    return dateToIso;
  };

  const calculateTopicPostAge = (dateInUnix) => {
    const topicCreateTime = convertCreationDate(dateInUnix);
    const convertMinutesToHour = 3600000;
    const currentTime = new Date();
    const diferenceInHours = currentTime - topicCreateTime;
    const hoursSinceCreation = Math.round((diferenceInHours) / (convertMinutesToHour));
    return hoursSinceCreation;
  };

  const renderCreationTime = (dateInUnix, authorName) => {
    const hoursSinceCreation = calculateTopicPostAge(dateInUnix);
    const userUrl = `https://www.reddit.com/user/${authorName}/`;
    const oneDayInHour = 24;
    const redirectUrl = (
      <a
        href={ userUrl }
        className="author-name"
        target="_blank"
        rel="noreferrer"
      >
        {authorName}
      </a>);

    if (hoursSinceCreation < 1) {
      return (
        <p className="post-creation-time">
          enviado há menos de uma hora por
          {' '}
          {redirectUrl}
        </p>
      );
    }

    if (hoursSinceCreation === 1) {
      return (
        <p className="post-creation-time">
          enviado há 1 hora por
          {' '}
          {redirectUrl}
        </p>
      );
    }

    if (hoursSinceCreation > 1 && hoursSinceCreation < oneDayInHour) {
      return (
        <p className="post-creation-time">
          enviado há
          {' '}
          {hoursSinceCreation}
          {' '}
          horas por
          {' '}
          {redirectUrl}
        </p>
      );
    }

    return (
      <p className="post-creation-time">
        enviado há mais de um dia por
        {' '}
        {redirectUrl}
      </p>
    );
  };

  const treatsTitleCharacters = (postTitle) => {
    const decodedTitle = postTitle.replace(/&amp;/g, '&');
    return decodedTitle;
  };

  return (
    <article
      className="postcard-wrapper"
    >
      <div
        className="post-thumbnail-wrapper"
        data-testid={ `postcard-${testid}` }
      >
        <div className="post-thumbnail">
          {validateThumbnailUrl()}
        </div>
      </div>
      <div className="post-details-wrapper">
        <div className="creation-data-wrapper">
          <p className="post-title">{treatsTitleCharacters(title)}</p>
          {renderCreationTime(createdUtc, author)}
        </div>
        <div className="reddit-link-wrapper">
          <a
            href={ postUrl }
            target="blank"
            className={ `${validateLinkVisibility()} link-to-reddit` }
          >
            reddit.com
          </a>
        </div>
      </div>
    </article>
  );
}

PostCard.propTypes = {
  media: PropTypes.string,
  title: PropTypes.string,
  createdUtc: PropTypes.string,
  author: PropTypes.string,
  postUrl: PropTypes.string,
  thumbnail: PropTypes.string,
  testid: PropTypes.number,
}.isRequired;
