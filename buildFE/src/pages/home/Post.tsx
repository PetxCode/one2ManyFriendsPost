import { useSelector } from "react-redux";
import { useOneReadUser, useReadPost } from "../../hooks/useReadPost";
import { FC, useState } from "react";
import { ceratePost } from "../../api/postAPI";
import moment from "moment";
import { mutate } from "swr";
const Post = () => {
  const user = useSelector((state: any) => state.user);

  const { data } = useReadPost(user?._id);

  console.log(data);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handlePost = () => {
    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("image", image);

    ceratePost(user?._id, formData)
      .then((res) => {
        if (res.status === 201) {
          mutate(`read-post/${user?._id}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="m-4">
      <main>
        <h1>Make Post</h1>
        <textarea
          className="border rounded-md outline-none h-[100px] w-full resize-none p-2"
          placeholder="What's on your mind"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <label
            className="bg-black text-white px-10 py-2 text-[12px] rounded-md"
            htmlFor="image"
          >
            Add Image
            <input
              id="image"
              type="file"
              accept="image/jpg, image/png, image/jpeg"
              onChange={handleImage}
              hidden
            />
          </label>
          <button
            className="bg-black text-white px-10 py-2 text-[12px] rounded-md"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </main>

      {/* contents */}

      <main className="mt-10">
        {data?.data?.map((el: any) => (
          <div className="my-2" key={el?._id}>
            <Profile id={el?.userID} time={moment(el.createdAt).fromNow()} />

            <div className="mt-5">{el?.title}</div>
            <img
              src={el.postImage}
              alt={el.title}
              className="h-[400px] w-full border rounded-md mt-2 object-cover"
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Post;

export const Profile: FC<any> = ({ time, id }) => {
  const { data } = useOneReadUser(id);

  return (
    <div>
      <div className="flex gap-4">
        <img
          src={data?.avatar}
          className="w-16 h-16 rounded-full bg-red-300 object-cover"
          alt={"ll"}
        />
        <div>
          <p>{data?.userName}</p>
          <p className="text-[12px] font-semibold">Time Posted: {time}</p>
        </div>
      </div>
    </div>
  );
};
