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
    const userUrl = `https://www.reddit.com/user/${authorName}/`

    if (hoursSinceCreation < 1) {
      return (
        <p>
          enviado há menos de uma hora por <a href={userUrl}>{authorName}</a>
        </p>
      );
    };

    if (hoursSinceCreation === 1) {
      return (
        <p>
          enviado há 1 hora por <a href={userUrl}>{authorName}</a>
        </p>
      );
    };

    if (hoursSinceCreation > 1 && hoursSinceCreation < 24) {
      return (
        <p>
          enviado há {hoursSinceCreation} horas por <a href={userUrl}>{authorName}</a>
        </p>
      );
    }

    return (
      <p>
        enviado há mais de um dia por <a href={userUrl}>{authorName}</a>
      </p>
    );
  };

  // Criar uma função para tratar o tamanho do título, setando um length máx de caracteres
  return (
    <article 
      className="postcard-wrapper"
      ref={lastPostRef}
    >
      <p>{title}</p>
      {renderCreationTime(created_utc, author)}
      <a
        href={postUrl} 
        target="blank"
        className={validateLinkVisibility()}
      >
        reddit.com
      </a>
    </article>
  );
}
