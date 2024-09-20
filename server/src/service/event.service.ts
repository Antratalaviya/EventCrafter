import mongoose, { PipelineStage } from "mongoose";
import { EventInput } from "../constants";
import { Event } from "../model/event.model";
/**
 * @param userId 
 * @param event 
 * @returns 
 */
const createEvent = async (userId: string, event: EventInput) => {
    return await Event.create({
        ...event,
        owner: userId,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate)
    })
}

/**
 * @param userId 
 * @returns 
 */

/**
 title,category, type, photos,start-date, time-both, carCapacity, street, city, country,description, offers, 
 name, surname, subscriber, 
 */

const getOwnEventsByUserId = async (userId: string, page: number, limit: number, keyword: string, eventStatus: string, eventType: string, sortby: string) => {
    const pipeline: PipelineStage[] = [];
    pipeline.push({
        $match: { owner: new mongoose.Types.ObjectId(userId) }
    })
    if (keyword) {
        pipeline.push({
            $match: {
                $or: [
                    { title: { $regex: new RegExp(keyword, 'i') } },
                    { description: { $regex: new RegExp(keyword, 'i') } }
                ]
            }
        })
    }
    if (eventStatus) {
        pipeline.push({
            $match: { status: { $eq: eventStatus } }
        })
    }
    if (eventType) {
        pipeline.push({
            $match: { type: { $eq: eventType } }
        })
    }
    pipeline.push({
        $skip: (page - 1) * limit
    }, {
        $limit: limit
    })
    if (sortby === 'asc') {
        pipeline.push({
            $sort: {
                createdAt: 1
            }
        })
    } else {
        pipeline.push({
            $sort: {
                createdAt: -1
            }
        })
    }
    pipeline.push(
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                type: 1,
                title: 1,
                street: 1,
                city: 1,
                country: 1,
                status: 1,
                startDate: 1,
                photos: { $first: "$photos" },
                likedBy: {
                    $size: {
                        $ifNull: ["$likedBy", []]
                    }
                },
                price: 1,
                liked: {
                    $cond: {
                        if: {
                            $in: [
                                { $toObjectId: userId },
                                { $ifNull: ["$likedBy", []] }
                            ]
                        },
                        then: true,
                        else: false
                    }
                },
                saved: {
                    $cond: {
                        if: {
                            $in: ["$_id", { $ifNull: ["$user.savedEvent", []] }]
                        },
                        then: true,
                        else: false
                    }
                },
                participating: {
                    $cond: {
                        if: {
                            $in: [new mongoose.Types.ObjectId(userId), {
                                $ifNull: ["$participants", []]
                            }]
                        },
                        then: true,
                        else: false
                    }
                },
                participants: {
                    $size: {
                        $ifNull: ["$participants", []]
                    }
                }
            }
        }
    )

    return await Event.aggregate(pipeline)
}

const getFullEventByEventId = async (eventId: string) => {
    const pipeline: PipelineStage[] = [
        {
            $match: { _id: new mongoose.Types.ObjectId(eventId) }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                likedBy: {
                    $size: {
                        $ifNull: ['$likedBy', []]
                    }
                },
                vip: 1,
                economy: 1,
                vip_price: 1,
                economy_price: 1,
                category: 1,
                type: 1,
                photos: 1,
                name: '$user.name',
                surname: '$user.surname',
                subscriber: {
                    $size: {
                        $ifNull: ["$user.subscriber", []]
                    }
                },
                startDate: 1,
                startTime: 1,
                endTime: 1,
                street: 1,
                city: 1,
                country: 1,
                description: 1,
                offers: 1,
                carCapacity: 1,
                participants: {
                    $size: {
                        $ifNull: ["$participants", []]
                    }
                },
                status: 1
            }
        }
    ];
    return await Event.aggregate(pipeline)
}

const getEventById = async (eventId: mongoose.Types.ObjectId | string) => {
    return await Event.findById(eventId);
}

const getEventByUserId = async (userId: string) => {
    return await Event.find({ owner: [new mongoose.Types.ObjectId(userId)] });
}

const eventLikedByUser = async (eventId: string, userId: string) => {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const event = await Event.findOne({
        _id: eventId,
        likedBy: { $in: [userObjectId] }
    });


    if (event) {
        return await Event.findByIdAndUpdate(
            eventId,
            { $pull: { likedBy: userObjectId } },
            { new: true }
        );
    }

    return await Event.findByIdAndUpdate(
        eventId,
        { $push: { likedBy: userObjectId } },
        { new: true }
    );
}

const addUserToParticipants = async (eventId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => {
    await Event.findByIdAndUpdate(eventId,
        {
            $push: {
                participants: userId
            }
        },
        { new: true }
    );
    return;
}

const cancelEvent = async (eventId: string) => {
    return await Event.findByIdAndUpdate(eventId,
        {
            $set: {
                status: 'cancelled'
            }
        }
    )
}

const getAllEvents = async (userId: string, page: number, limit: number, keyword: string, eventType: string, sortby: string) => {
    const pipeline: PipelineStage[] = [];
    pipeline.push({
        $match: {
            status: { $nin: ["cancelled", "draft"] },
            type: { $ne: "private" }
        }
    });
    if (keyword) {
        pipeline.push({
            $match: {
                $or: [
                    { title: { $regex: new RegExp(keyword, 'i') } },
                    { description: { $regex: new RegExp(keyword, 'i') } }
                ]
            }
        })
    }
    if (eventType) {
        pipeline.push({
            $match: { type: eventType }
        })
    }
    pipeline.push({
        $skip: (page - 1) * limit
    }, {
        $limit: limit
    })
    if (sortby === 'asc') {
        pipeline.push({
            $sort: {
                createdAt: 1
            }
        })
    } else if (sortby === 'desc') {
        pipeline.push({
            $sort: {
                createdAt: -1
            }
        })
    }
    pipeline.push(
        {
            $addFields: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                type: 1,
                status: 1,
                title: 1,
                street: 1,
                city: 1,
                country: 1,
                startDate: 1,
                photos: { $first: "$photos" },
                price: 1,
                likedBy: {
                    $size: {
                        $ifNull: ["$likedBy", []]
                    }
                },
                liked: {
                    $cond: {
                        if: {
                            $in: [
                                new mongoose.Types.ObjectId(userId),
                                { $ifNull: ["$likedBy", []] }
                            ]
                        },
                        then: true,
                        else: false
                    }
                },
                saved: {
                    $cond: {
                        if: {
                            $in: ["$_id", { $ifNull: ["$user.savedEvent", []] }]
                        },
                        then: true,
                        else: false
                    }
                },
                participating: {
                    $cond: {
                        if: {
                            $in: [new mongoose.Types.ObjectId(userId), {
                                $ifNull: ["$participants", []]
                            }]
                        },
                        then: true,
                        else: false
                    }
                },
                participants: {
                    $size: {
                        $ifNull: ["$participants", []]
                    }
                }
            }
        }
    )

    return await Event.aggregate(pipeline)
}

const getAllParticipants = async (userId: string, eventId: string) => {
    const pipeline: PipelineStage[] = [];
    pipeline.push({
        $match: {
            _id: new mongoose.Types.ObjectId(eventId),
            owner: { $ne: new mongoose.Types.ObjectId(userId) }
        }
    })
    pipeline.push(
        {
            $lookup: {
                from: 'users',
                localField: "participants",
                foreignField: '_id',
                as: "participant"
            }
        },
        {
            $unwind: {
                path: '$participant',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: "$participant._id",
                avatar: "$participant.avatar",
                name: "$participant.name",
                surname: "$participant.surname"
            }
        }
    )

    return await Event.aggregate(pipeline);
}



export default {
    createEvent,
    getEventByUserId,
    getFullEventByEventId,
    getOwnEventsByUserId,
    getEventById,
    eventLikedByUser,
    addUserToParticipants,
    cancelEvent,
    getAllEvents,
    getAllParticipants
}