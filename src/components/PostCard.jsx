import React from 'react';

export default function PostCard(props) {
  const {
    id,
    title,
    created_utc,
    author,
    url,
  } = props;

  return (
    <article>
      <p>{title}</p>
      <p>enviado há {created_utc} horas por {author}</p>
      <a href={url} target="blank">redddit.com</a>
    </article>
  )
}
