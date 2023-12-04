import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";


const Reviews = ({ gigId }) => {

    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery({
      queryKey: ["reviews"],
      queryFn: () =>
        newRequest.get(`/reviews/${gigId}`).then((res) => {
          return res.data;
        }),
    });

  const mutation = useMutation({
    mutationFn: (review) => {
      console.log({review})
      return newRequest.post("/reviews", review);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["reviews"])
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star,userId:data.userId });
  };
//  console.log({"dr":data})

  return (
    <div className="reviews">
      <h2>Reviews</h2>
     
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : 
        data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write your opinion" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button type="submit" >Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
