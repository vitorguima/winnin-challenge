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
  }
  // Criar uma função para tratar o tamanho do título, setando um length máx de caracteres
  // Criar uma função para tratar o created_utc, tranformá-lo em horas e gerar a diferença entre (current date - created_utc);
  return (
    <article 
      className="postcard-wrapper"
      ref={lastPostRef}
    >
      <p>{title}</p>
      <p>enviado há {created_utc} horas por {author}</p>
      <a
        href={postUrl} 
        target="blank"
        className={validateLinkVisibility()}
      >
        redddit.com
      </a>
    </article>
  );
}
