import mongoose, { PipelineStage } from "mongoose"
import { PropertyInput } from "../constants"
import { Property } from "../model/property.model"

const createProperty = async (userId: string, property: PropertyInput) => {
    return await Property.create({
        ...property,
        owner: userId,
    })
}

const getProperty = async () => {
    return await Property.find();
}

const getOwnProperty = async (userId: string) => {
    return await Property.findOne({ owner: new mongoose.Types.ObjectId(userId) });
}

const getAllProperty = async (page: number, limit: number, keyword: string, rating: string, amenities: String, sortby: string) => {
    let star = Number(rating)
    const amenity = amenities
        ? amenities.split(',').map((item) => item.trim()) // Split by comma and trim spaces
        : [];
    star = star || 0;

    const pipeline: PipelineStage[] = [];
    if (keyword) {
        pipeline.push({
            $match: {
                $or: [
                    { name: { $regex: new RegExp(keyword, 'i') } },
                    { description: { $regex: new RegExp(keyword, 'i') } }
                ]
            }
        })
    }
    if (amenity.length > 0) {
        pipeline.push({
            $match: {
                amenities: { $all: amenity }
            }
        });
    }
    pipeline.push(
        {
            $lookup: {
                from: "reviews",
                localField: "review",
                foreignField: "_id",
                as: "reviews"
            }
        },
        {
            $unwind: {
                path: '$reviews',
                preserveNullAndEmptyArrays: true
            }
        },
        {

            $project: {
                _id: 1,
                name: 1,
                street: 1,
                city: 1,
                country: 1,
                amenities: 1,
                purpose: 1,
                amount: 1,
                photos: { $first: "$photos" },
                rating: {
                    $round: [
                        {
                            $ifNull: [
                                {
                                    $avg: '$reviews.rating'
                                },
                                0
                            ]
                        },
                        1
                    ]
                }
            }

        },
    )
    if (star === 0) {
        pipeline.push({
            $sort: {
                star: -1
            }
        })
    } else {
        pipeline.push({
            $match: {
                rating: { $eq: star }
            }
        })
    }
    if (sortby === 'asc') {
        pipeline.push({
            $sort: {
                amount: 1
            }
        })
    } else if (sortby === 'desc') {
        pipeline.push({
            $sort: {
                amount: -1
            }
        })
    } else {
        pipeline.push({
            $sort: {
                star: -1
            }
        })
    }
    pipeline.push({
        $skip: (page - 1) * limit
    }, {
        $limit: limit
    })

    return await Property.aggregate(pipeline)
}

export default {
    createProperty,
    getProperty,
    getOwnProperty,
    getAllProperty
}