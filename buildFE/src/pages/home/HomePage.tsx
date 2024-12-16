import React, { FC } from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import { useOneReadUser, useReadUser } from "../../hooks/useReadPost";
import { addFriend } from "../../api/userAPI";
import { Link, Outlet } from "react-router-dom";

const HomePage = () => {
  // ;
  return (
    <div>
      <main className="grid grid-cols-8 gap-3 m-2">
        <main className="overflow-hidden col-span-2 rounded-md border min-h-[400px] bg-slate-100">
          <div>
            <div className="border rounded-md  bg-white m-4 p-4 flex gap-2">
              {/* <div className="w-[4rem] h-[4rem] rounded-full border" /> */}
              <div>
                <p className="line-clamp-2 text-[12px] mb-4 ">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut
                  animi doloribus explicabo! Architecto totam esse quam labore
                  corrupti maiores consectetur?
                </p>
                <div className=" text-[12px]">comments</div>
                <div className=" text-[12px]">date</div>
              </div>
            </div>
          </div>

          <div className="m-4 text-[12px]">
            <p>Add Friends</p>

            <div className="mt-5">
              <AddFriends />
            </div>
          </div>
        </main>
        <main className="col-span-4 rounded-md border min-h-[400px] bg-slate-50">
          <Outlet />
        </main>
        <main className="col-span-2 rounded-md border min-h-[400px] bg-slate-100">
          <ViewFriends />
        </main>
      </main>
    </div>
  );
};

export default HomePage;

const ViewFriends = () => {
  const user = useSelector((state: any) => state.user);
  const { data } = useOneReadUser(user?._id);

  console.log("reading: ", data);
  return (
    <div className="mt-5">
      <h1 className="m-4">Friends</h1>
      {/* list of friends */}

      {data?.friends?.length > 0 ? (
        <div>
          {data?.friends?.map((el: any, i: number) => (
            <div>
              <div className="border rounded-md bg-white m-4 p-4 flex gap-2">
                <div className="w-16 h-16 rounded-full border" />
                <div>
                  <p>name</p>
                  <button
                    className=" bg-black text-white px-6 py-2 rounded-md text-[12px]"
                    onClick={() => {
                      console.log("hjjj: ", el);
                    }}
                  >
                    <Link to={`/${el}`}>View Detail</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="m-4">You have No friends yet </div>
      )}
    </div>
  );
};

const AddFriends = () => {
  const { data } = useReadUser();

  return (
    <div>
      {data?.map((el: any, i: number) => (
        <div>
          {i <= 4 && (
            <div>
              <Prof id={el?._id} file={el} />
            </div>
          )}
        </div>
      ))}
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
