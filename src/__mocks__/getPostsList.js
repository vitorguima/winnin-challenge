/* eslint-disable max-len */
const mockPostsList = {
  data: {
    after: 't3_pq2ke4',
    children: [
      {
        data: {
          title: 'Beginner\'s Thread / Easy Questions (September 2021)',
          created_utc: 1630513875,
          author: 'dance2die',
          url: 'https://www.reddit.com/r/reactjs/comments/pfxhmm/beginners_thread_easy_questions_september_2021/',
          media: null,
          thumbnail: 'self',
        },
      },
      {
        data: {
          title: 'Who\'s Available? [September 2021]',
          created_utc: 1631817503,
          author: 'dance2die',
          url: 'https://www.reddit.com/r/reactjs/comments/ppj8c7/whos_available_september_2021/',
          media: null,
          thumbnail: 'self',
        },
      },
      {
        data: {
          title: 'New Material-UI v5 not working with styled-components and typescript. Help!',
          created_utc: 1631880895,
          author: 'StraightZlat',
          url: 'https://www.reddit.com/r/reactjs/comments/ppz0eo/new_materialui_v5_not_working_with/',
          media: null,
          thumbnail: 'self',
        },
      },
      {
        data: {
          title: 'Vanilla Js → Redux → React → React Redux. New update on the project to redo the same tiny app 11 different ways.',
          created_utc: 1631900647,
          author: 'celueworld',
          url: 'https://www.reddit.com/r/reactjs/comments/pq4yfi/vanilla_js_redux_react_react_redux_new_update_on/',
          media: 'null',
          thumbnail: 'self',
        },
      },
    ],
  },
};

export default {
  getPostsList: jest.fn().mockResolvedValue(mockPostsList),
};
