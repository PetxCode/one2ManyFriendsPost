import { Link, useParams } from "react-router-dom";
import { useOneReadUser, useReadUser } from "../../hooks/useReadPost";
import { addFriend } from "../../api/userAPI";
import { useSelector } from "react-redux";
import _ from "lodash";
import { FC } from "react";

const FriendDetails = () => {
  const { id } = useParams();

  const { data } = useOneReadUser(id!);

  console.log(data);
  return (
    <div className="m-2">
      <Link
        to="/"
        className="bg-black text-white px-8 py-2 text-[12px] rounded-md my-5 "
      >
        Back
      </Link>
      <p className="mt-5">Name: {data?.userName}</p>
      <p>Name: {data?.email}</p>

      <img
        src={data?.avatar}
        className="w-full object-cover rounded-t-md h-[300px] border mt-10"
      />

      <div className="flex gap-4 text-[12px] font-semibold mt-5 ">
        <p>Friends: {data?.friends.length}</p>
        <p>Followers: {data?.follower.length}</p>
        <p>Followings: {data?.following.length}</p>
      </div>

      <div>
        {data?.friends?.map((el: any) => (
          <div>
            <AddFriends el={el} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendDetails;

const AddFriends: FC<any> = ({ el }) => {
  return (
    <div className="grid grid-cols-2">
      <Prof id={el} />
    </div>
  );
};

const Prof: FC<any> = ({ id }) => {
  const user = useSelector((state: any) => state.user);
  const { data } = useOneReadUser(id);

  return (
    <div className="border rounded-md bg-white m-4 p-4 flex gap-2">
      <img
        className="w-10 h-10 rounded-full border object-cover"
        src={data?.avatar}
      />
      <div>
        <p>{data?.userName}</p>
        <button
          className=" bg-black text-white px-6 py-1 rounded-md text-[10px]"
          onClick={() => {
            console.log("click");
            addFriend(user?._id, id).then((res) => {
              if (res.status === 201) {
                alert("Friends as been added successfully");
              } else {
                alert("User already");
              }
            });
          }}
        >
          Add as Frd
        </button>
      </div>
    </div>
  );
};
