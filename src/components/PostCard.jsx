import React from 'react';

import '../styles/postCardStyle.css';

export default function PostCard(props) {
  const {
    title,
    created_utc,
    author,
    url,
  } = props;

  // Criar uma função para tratar o tamanho do título, setando um length máx de caracteres
  // Criar uma função para tratar o created_utc, tranformá-lo em horas e gerar a diferença entre (current date - created_utc);

  return (
    <article className="postcard-wrapper">
      <p>{title}</p>
      <p>enviado há {created_utc} horas por {author}</p>
      <a href={url} target="blank">redddit.com</a>
    </article>
  );
}
