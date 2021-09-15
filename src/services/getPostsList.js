export default async function getPostsList(topicType, paginationParam) {
  const ENDPOINT = `https://www.reddit.com/r/reactjs/${topicType}.json?after=${paginationParam}&limit=9`;
  try {
    const getPostsRequest = await fetch(ENDPOINT);
    const response = await getPostsRequest.json();
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
}
