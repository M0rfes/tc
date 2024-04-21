import { FC } from "react";
import { useParams } from "react-router";

const BoardPage: FC = () => {
  const props = useParams();
  console.log(props);
  return (
    <div>
      <h1>Board Page</h1>
    </div>
  );
};

export default BoardPage;
