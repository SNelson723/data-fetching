import { get } from "./utils/http";
import { ReactNode, useEffect, useState } from "react";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const App = () => {
  const [posts, setPosts] = useState<BlogPost[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        // set the type of the fetched data
        const data = (await get(
          "https://jsonplaceholder.typicode.com/posts"
        )) as RawDataBlogPost[];

        // Then use that fetched data to map to the type of the state
        const blogPosts: BlogPost[] = data.map((post) => ({
          id: post.id,
          title: post.title,
          text: post.body,
        }));

        // Then set the state with the desired data
        setPosts(blogPosts);
      } catch (error) {
        // If the error is an instance of Error, set the error message
        if (error instanceof Error) {
          setError(error.message);
        }
        // setError((error as Error).message);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  // If the posts are not yet fetched, show the fetching image without the BlogPosts component
  let content: ReactNode;

  if (error) {
    content = <ErrorMessage text={error} />;
  }

  if (posts) {
    content = <BlogPosts posts={posts} />;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <main>
      <img src={fetchingImg} alt="Data fetching image" />
      {content}
    </main>
  );
};

export default App;
