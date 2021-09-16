import React from 'react';

import '../styles/postCardStyle.css';

export default function PostCard(props) {
  const {
    media,
    title,
    created_utc,
    author,
    postUrl,
    lastPostRef,
  } = props;

  const validateLinkVisibility = () => {
    return media ? 'hidden-link' : 'visible-link'
  };

  const convertCreationDate =  (dateInUnix) => {
    const convertParam =  1000;
    const dateToIso = new Date(dateInUnix * convertParam);
    return dateToIso;
  };

  const calculateTopicPostAge = (dateInUnix) =>  {
    const topicCreateTime  = convertCreationDate(dateInUnix);
    const convertMinutesToHour = 3600000;
    const currentTime = new Date();
    const diferenceInHours = Math.round((currentTime - topicCreateTime) / (convertMinutesToHour));
    return diferenceInHours;
  };

  const renderCreationTime = (dateInUnix, authorName) => {
    const hoursSinceCreation = calculateTopicPostAge(dateInUnix);
    const userUrl = `https://www.reddit.com/user/${authorName}/`;
    const authorUrl = <a href={userUrl} className="author-name" target="_blank" rel="noreferrer">{authorName}</a>;

    if (hoursSinceCreation < 1) {
      return (
        <p className="post-creation-time">
          enviado há menos de uma hora por {authorUrl}
        </p>
      );
    };

    if (hoursSinceCreation === 1) {
      return (
        <p className="post-creation-time">
          enviado há 1 hora por {authorUrl}
        </p>
      );
    };

    if (hoursSinceCreation > 1 && hoursSinceCreation < 24) {
      return (
        <p className="post-creation-time">
          enviado há {hoursSinceCreation} horas por {authorUrl}
        </p>
      );
    }

    return (
      <p className="post-creation-time">
        enviado há mais de um dia por {authorUrl}
      </p>
    );
  };

  const treatsTitleCharacters = (title) => {
    const decodedTitle = title.replace(/&amp;/g, '&');
    return decodedTitle;
  } 
  
  return (
    <article 
      className="postcard-wrapper"
      ref={lastPostRef}
    >
      <div>
        <p className="post-title">{treatsTitleCharacters(title)}</p>
        {renderCreationTime(created_utc, author)}
      </div>
      <div>
        <a
          href={postUrl} 
          target="blank"
          className={`${validateLinkVisibility()} link-to-reddit`}
        >
          reddit.com
        </a>
      </div>
    </article>
  );
}
