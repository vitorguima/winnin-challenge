import React from 'react';

import PropTypes from 'prop-types';

import '../styles/postCardStyle.css';

import noThumbnail from '../images/no-thumbnail.png';

function treatsTitleCharacters(postTitle) {
  const decodedTitle = postTitle.replace(/&amp;/g, '&');
  return decodedTitle;
}

function convertCreationDate(dateInUnix) {
  const convertParam = 1000;
  const dateToIso = new Date(dateInUnix * convertParam);
  return dateToIso;
}

function calculateTopicPostAge(dateInUnix) {
  const topicCreateTime = convertCreationDate(dateInUnix);
  const convertMinutesToHour = 3600000;
  const currentTime = new Date();
  const diferenceInHours = currentTime - topicCreateTime;
  const hoursSinceCreation = Math.round((diferenceInHours) / (convertMinutesToHour));
  return hoursSinceCreation;
}

function isValidHttpUrl(string) {
  try {
    const url = new URL(string);
    return url.href;
  } catch (_) {
    return false;
  }
}

export default function PostCard(props) {
  const {
    media,
    title,
    createdUtc,
    author,
    postUrl,
    thumbnail,
    testId,
  } = props;

  const validateLinkVisibility = () => (media ? 'hidden-link' : 'visible-link');

  const renderThumbnail = () => {
    const checkThumbUrl = isValidHttpUrl(thumbnail);
    if (!checkThumbUrl) {
      return (
        <img
          src={ noThumbnail }
          alt="no-post-preview"
          className="thumb-not-available"
          data-testid={ `thumbnail-${testId}` }
        />
      );
    } return (
      <img
        src={ thumbnail }
        alt="post-preview"
        className="thumb-available"
        data-testid={ `thumbnail-${testId}` }
      />
    );
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
        <p
          className="post-creation-time"
          data-testid={ `since-creation-${testId}` }
        >
          enviado há menos de uma hora por
          {' '}
          {redirectUrl}
        </p>
      );
    }

    if (hoursSinceCreation === 1) {
      return (
        <p
          className="post-creation-time"
          data-testid={ `since-creation-${testId}` }
        >
          enviado há 1 hora por
          {' '}
          {redirectUrl}
        </p>
      );
    }

    if (hoursSinceCreation > 1 && hoursSinceCreation < oneDayInHour) {
      return (
        <p
          className="post-creation-time"
          data-testid={ `since-creation-${testId}` }
        >
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
      <p
        className="post-creation-time"
        data-testid={ `since-creation-${testId}` }
      >
        enviado há mais de um dia por
        {' '}
        {redirectUrl}
      </p>
    );
  };

  return (
    <article
      className="postcard-wrapper"
    >
      <div
        className="post-thumbnail-wrapper"
        data-testid={ `postcard-${testId}` }
      >
        <div className="post-thumbnail">
          {renderThumbnail()}
        </div>
      </div>
      <div className="post-details-wrapper">
        <div className="creation-data-wrapper">
          <p className="post-title">{treatsTitleCharacters(title)}</p>
          {renderCreationTime(createdUtc, author)}
        </div>
        <div className="reddit-link-wrapper">
          <a
            href={ `https://www.reddit.com${postUrl}` }
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
  testId: PropTypes.number,
}.isRequired;
