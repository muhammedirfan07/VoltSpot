import React from 'react'
import { Star } from 'lucide-react';
const Reviewcard = ({review }) => {
  return (
    <>
        <div className="p-2 shadow bg-neutral-950 rounded-lg pb-4">
                  <div className="items-center gap-2 mb-2">
                    <h3 className="font-bold mb-2">{review?.user?.fullName || "Anonymous"}</h3>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={star <= review?.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400">
                    {review?.review}
                  </p>
                </div>
    </>
  )
}

export default Reviewcard