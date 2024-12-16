import { useParams } from "react-router-dom";
import { useOneReadUser } from "../../hooks/useReadPost";

const FriendDetails = () => {
  const { id } = useParams();

  const { data } = useOneReadUser(id!);

  console.log(data);
  return (
    <div>
      <p>Name: {data?.userName}</p>
      <p>Name: {data?.email}</p>
    </div>
  );
};

export default FriendDetails;
