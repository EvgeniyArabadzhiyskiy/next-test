import GlobalLayout from "@/components/GlobalLayout";
import NestedLayout from "@/components/NestedLayout";

const Post = () => {
  return (
    <>
      <h1>POST</h1>
      <h2>Contact</h2>
      <h2>Users</h2>
    </>
  );
};

export default Post;

// Post.Layout = NestedLayout;

Post.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
