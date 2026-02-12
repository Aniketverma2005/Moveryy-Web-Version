import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineStar,
  MdOutlineSearch,
  MdOutlineReplyAll,
  MdOutlineVerified,
  MdOutlineMood,
} from "react-icons/md";
import {User} from "lucide-react"
import { fetchReviews } from "../../features/reviews/reviewsSlice";

/* ---------- Helpers ---------- */

const RatingDistributionBar = ({ stars, count, total }) => {
  const percentage = (count / total) * 100;
  return (
    <div className="flex items-center gap-2 mb-1">
      <span className="w-12 text-sm text-gray-500">{stars} stars</span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full">
        <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-xs text-gray-500 w-12 text-right">
        {count} ({percentage.toFixed(0)}%)
      </span>
    </div>
  );
};

const ReviewCard = ({ review }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <div className="flex justify-between mb-4">
      <div className="flex gap-3">
        <User  size={40} className="text-gray-100  bg-blue-600 rounded-full" />
        
        <div>
          <p className="font-semibold text-gray-800">{review.customerName}</p>
          <p className="text-xs text-gray-500">
            ID: {review.id} | {review.location}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`p-1 rounded-full ${review.isVerified ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
          <MdOutlineVerified size={16} />
        </span>
        <div className="flex text-yellow-500">
          {[...Array(review.rating)].map((_, i) => (
            <MdOutlineStar key={i} />
          ))}
        </div>
      </div>
    </div>

    <p className="text-sm text-gray-600 mb-4">{review.text}</p>

    <div className="flex justify-between text-xs text-gray-500">
      <span>{review.date}</span>
      <button className="flex items-center gap-1 text-blue-600">
        <MdOutlineReplyAll size={16} /> Reply
      </button>
    </div>
  </div>
);

/* ---------- Page ---------- */

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const ratingsCounts = data.reviews.reduce(
    (acc, r) => {
      acc[r.rating] += 1;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  const totalReviews = data.reviews.length;

  return (
    <div className="bg-gray-100 min-h-screen p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Reviews & Ratings</h1>
        <p className="text-sm text-gray-500">
          Track customer feedback and manage ratings
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
          <div className="flex justify-center text-yellow-500 mb-2">
            {[...Array(5)].map((_, i) => <MdOutlineStar key={i} size={24} />)}
          </div>
          <p className="text-5xl font-bold">4.1</p>
          <p className="text-sm text-gray-500">Based on {totalReviews} reviews</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="font-semibold mb-4">Rating Distribution</h2>
          {[5, 4, 3, 2, 1].map((s) => (
            <RatingDistributionBar
              key={s}
              stars={s}
              count={ratingsCounts[s]}
              total={totalReviews}
            />
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;



// import React from 'react';
// import {
//   MdOutlineStar, MdOutlineSearch, MdOutlineFilterList, MdOutlineReplyAll,
//   MdOutlineVerified, MdOutlineMood, MdOutlineThumbUp, MdOutlineSentimentDissatisfied
// } from 'react-icons/md';

// // Helper component for the rating distribution bars
// const RatingDistributionBar = ({ stars, count, total }) => {
//   const percentage = (count / total) * 100;
//   return (
//     <div className="flex items-center gap-2 mb-1">
//       <span className="text-sm font-medium text-gray-500 w-12">{stars} stars</span>
//       <div className="w-full bg-blue-100 h-2 rounded-full">
//         <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
//       </div>
//       <span className="text-xs text-gray-500 w-6 text-right">{count} ({percentage.toFixed(0)}%)</span>
//     </div>
//   );
// };

// // Helper component for an individual review card
// const ReviewCard = ({ review }) => (
//   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//     <div className="flex items-start justify-between mb-4">
//       <div className="flex items-center gap-2">
//         <MdOutlineMood size={40} className="text-gray-400" />
//         <div className="flex flex-col">
//           <span className="text-base font-semibold text-gray-800">{review.customerName}</span>
//           <div className="flex items-center gap-1 text-xs text-gray-500">
//             <span>ID: {review.id}</span>
//             <span>|</span>
//             <span>{review.location}</span>
//           </div>
//         </div>
//       </div>
//       <div className="flex items-center gap-2">
//         <div className={`p-1 rounded-full ${review.isVerified ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
//           <MdOutlineVerified size={16} />
//         </div>
//         <div className="flex text-yellow-500">
//           {[...Array(review.rating)].map((_, i) => <MdOutlineStar key={i} size={20} />)}
//         </div>
//       </div>
//     </div>

//     <p className="text-sm text-gray-600 mb-4">{review.text}</p>
    
//     <div className="flex items-center justify-between text-xs text-gray-500">
//       <span>{review.date}</span>
//       <div className="flex items-center gap-2">
//         <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors duration-200">
//           <MdOutlineReplyAll size={16} />
//           <span>Reply</span>
//         </button>
//       </div>
//     </div>
//   </div>
// );

// // Data to populate the reviews
// const reviewsData = [
//   { id: 'BK001', customerName: 'Robert Kumar', location: 'Pune - Hyderabad', rating: 5, isVerified: true, text: 'Excellent service! The team was very professional and delivered all my belongings with care...', date: '2025-09-20' },
//   { id: 'BK002', customerName: 'Priya Sharma', location: 'Bangalore - Chennai', rating: 4, isVerified: false, text: 'Service was overall fine, but the packing was a bit hurried...', date: '2025-09-20' },
//   { id: 'BK003', customerName: 'Amit Patel', location: 'Pune - Hyderabad', rating: 5, isVerified: true, text: 'Outstanding experience from the initial quote to final delivery, everything was smooth...', date: '2025-09-20' },
//   { id: 'BK004', customerName: 'Sunita Gupta', location: 'Kolkata - Bhubaneswar', rating: 3, isVerified: true, text: 'Average service. The move was completed but there were some issues with timing...', date: '2025-09-20' },
//   { id: 'BK005', customerName: 'Ravi Singh', location: 'Delhi - Gurugram', rating: 5, isVerified: true, text: 'Perfect office relocation service. They handled all the electronics...', date: '2025-09-20' },
//   { id: 'BK006', customerName: 'Meera Joshi', location: 'Andheri East - Mumbai', rating: 4, isVerified: false, text: 'Very satisfied with the service. Professional team, good packing quality...', date: '2025-09-20' },
//   { id: 'BK007', customerName: 'Deepak Verma', location: 'Civil Lines, Jaipur', rating: 2, isVerified: true, text: 'Had some issues with my move. Items were damaged and they were late...', date: '2025-09-20' },
//   { id: 'BK008', customerName: 'Kavya Reddy', location: 'Hyderabad - Secunderabad', rating: 5, isVerified: true, text: 'Everything went very smoothly. I have never had such a good experience...', date: '2025-09-20' },
// ];

// // Data for summary cards at the bottom
// const bottomStats = {
//   inactiveReviews: 0,
//   avgHelpfulVotes: 52,
//   verifiedReviews: reviewsData.filter(r => r.isVerified).length,
//   unverifiedReviews: reviewsData.filter(r => !r.isVerified).length,
// };

// const ReviewsPage = () => {
//   const ratingsCounts = { 5: 4, 4: 2, 3: 1, 2: 1, 1: 0 };
//   const totalReviews = Object.values(ratingsCounts).reduce((sum, count) => sum + count, 0);

//   return (
//     <div className="bg-gray-100 min-h-screen p-6 font-inter w-full">
//       {/* Header and Rating Summary Section */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Reviews & Ratings</h1>
//         <p className="text-gray-500 text-sm">Track customer feedback and manage your vehicle ratings.</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Rating Summary Box */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center lg:justify-start">
//           <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
//             <div className="flex text-yellow-500 mb-2">
//               {[...Array(5)].map((_, i) => <MdOutlineStar key={i} size={24} />)}
//             </div>
//             <span className="text-5xl font-bold text-gray-800">4.1</span>
//             <p className="text-sm text-gray-500">Based on {totalReviews} reviews</p>
//           </div>
//         </div>

//         {/* Rating Distribution Chart */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full" >
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Rating Distribution</h2>
//           <div className="flex flex-col gap-2">
//             <RatingDistributionBar stars="5" count={ratingsCounts[5]} total={totalReviews} />
//             <RatingDistributionBar stars="4" count={ratingsCounts[4]} total={totalReviews} />
//             <RatingDistributionBar stars="3" count={ratingsCounts[3]} total={totalReviews} />
//             <RatingDistributionBar stars="2" count={ratingsCounts[2]} total={totalReviews} />
//             <RatingDistributionBar stars="1" count={ratingsCounts[1]} total={totalReviews} />
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters Section */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="relative flex-grow mr-4">
//           <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search by customer, or booking ID..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="flex items-center gap-2">
//           <select className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600">
//             <option>All Ratings</option>
//             <option>5 Stars</option>
//             <option>4 Stars</option>
//           </select>
//           <select className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600">
//             <option>Latest First</option>
//             <option>Oldest First</option>
//           </select>
//         </div>
//       </div>
      
//       {/* Reviews Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         {reviewsData.map(review => (
//           <ReviewCard key={review.id} review={review} />
//         ))}
//       </div>

//       {/* Bottom Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
//           <span className="text-3xl font-bold text-gray-800 mb-1">{bottomStats.inactiveReviews}</span>
//           <p className="text-sm text-gray-500">inactive reviews</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
//           <span className="text-3xl font-bold text-gray-800 mb-1">{bottomStats.avgHelpfulVotes}</span>
//           <p className="text-sm text-gray-500">avg. helpful votes</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
//           <span className="text-3xl font-bold text-gray-800 mb-1">{bottomStats.verifiedReviews}</span>
//           <p className="text-sm text-gray-500">verified reviews</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
//           <span className="text-3xl font-bold text-gray-800 mb-1">{bottomStats.unverifiedReviews}</span>
//           <p className="text-sm text-gray-500">unverified reviews</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewsPage;