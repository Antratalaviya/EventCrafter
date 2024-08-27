import mongoose, { PipelineStage } from "mongoose";
import { UserInput } from "../constants";
import { User } from "../model/user.model";

const getUserById = async (id: string | mongoose.Types.ObjectId) => {
  return await User.findById(id).select("-__v");
};

const getUserByEmail = async (email: string) => {
  return await User.findOne({ email }).select("-__v");
};

const register = async (body: UserInput) => {
  return await User.create(body);
};

const likeEventByUser = async (eventId: string, userId: string) => {
  let user = await User.findOne({
    likedEvent: { $in: [new mongoose.Types.ObjectId(eventId)] }
  })
  if (user) {
    return await User.findByIdAndUpdate(userId, {
      $pull: {
        likedEvent: new mongoose.Types.ObjectId(eventId)
      }
    }, { new: true })
  }
  return await User.findByIdAndUpdate(userId, {
    $push: {
      likedEvent: new mongoose.Types.ObjectId(eventId)
    }
  }, { new: true })

}

const saveEventByUser = async (eventId: string, userId: string) => {
  let user = await User.findOne({
    _id: userId,
    savedEvent: { $in: [new mongoose.Types.ObjectId(eventId)] }
  })
  if (user) {
    return await User.findByIdAndUpdate(userId, {
      $pull: {
        savedEvent: new mongoose.Types.ObjectId(eventId)
      }
    }, { new: true })
  }
  return await User.findByIdAndUpdate(userId, {
    $push: {
      savedEvent: new mongoose.Types.ObjectId(eventId)
    }
  }, { new: true })

}

const getSavedEventByUser = async (userId: string) => {
  const pipeline: PipelineStage[] = [
    {
      $match: { _id: new mongoose.Types.ObjectId(userId) }
    },
    {
      $lookup: {
        from: "events",
        localField: "savedEvent",
        foreignField: "_id",
        as: "savedEvents"
      }
    },
    {
      $unwind: {
        path: '$savedEvents',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 0,
        type: "$savedEvents.type",
        title: '$savedEvents.title',
        street: "$savedEvents.street",
        city: "$savedEvents.city",
        country: "$savedEvents.country",
        startDate: "$savedEvents.startDate",
        photos: { $first: "$savedEvents.photos" },
        likedBy: {
          $size: {
            $ifNull: ["$savedEvents.likedBy", []]
          }
        }
      }
    }
  ]

  return await User.aggregate(pipeline);
}

const getLikedEventByUser = async (userId: string) => {
  const pipeline: PipelineStage[] = [
    {
      $match: { _id: new mongoose.Types.ObjectId(userId) }
    },
    {
      $lookup: {
        from: "events",
        localField: 'likedEvent',
        foreignField: "_id",
        as: "eventLiked"
      }
    },
    {
      $unwind: {
        path: '$eventLiked',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 0,
        type: "$eventLiked.type",
        title: '$eventLiked.title',
        street: "$eventLiked.street",
        city: "$eventLiked.city",
        country: "$eventLiked.country",
        startDate: "$eventLiked.startDate",
        likedBy: {
          $size: {
            $ifNull: ["$eventLiked.likedBy", []]
          }
        }
      }
    }
  ]

  return await User.aggregate(pipeline);
}

const subscribeUser = async (subscriberId: string, subscribedToId: string) => {
  let user = await User.findOne({
    subscriber: { $in: [new mongoose.Types.ObjectId(subscribedToId)] }
  })
  if (user) {
    return await User.findByIdAndUpdate(subscriberId, {
      $pull: {
        subscriber: new mongoose.Types.ObjectId(subscribedToId)
      }
    }, { new: true })
  }
  return await User.findByIdAndUpdate(subscriberId, {
    $push: {
      subscriber: new mongoose.Types.ObjectId(subscribedToId)
    }
  }, { new: true })
}

const addEventToJoinedEvent = async (userId: mongoose.Types.ObjectId, eventId: mongoose.Types.ObjectId) => {
  await User.findByIdAndUpdate(userId,
    {
      $push: {
        joinedEvent: eventId
      }
    },
    { new: true }
  );
  return;
}

const getAllUsers = async (keyword: string) => {
  const pipeline: PipelineStage[] = [];
  if (keyword) {
    pipeline.push({
      $match: {
        $or: [
          { name: { $regex: new RegExp(keyword, 'i') } },
          { surname: { $regex: new RegExp(keyword, 'i') } }
        ]
      }
    })
  }
  pipeline.push(
    {
      $project: {
        _id: 1,
        avatar: 1,
        name: 1,
        surname: 1
      }
    }
  )

  return await User.aggregate(pipeline);
}

const getUserProfile = async (userId: string) => {
  const pipeline = [
    {
      $match: { _id: new mongoose.Types.ObjectId(userId) }
    },
    {
      $project: {
        email: 1,
        name: 1,
        surname: 1,
        subscriber: {
          $size: {
            $ifNull: ["$subscriber", []]
          }
        },
        subscribing: {
          $size: {
            $ifNull: ["$subscribing", []]
          }
        },
        joinedEvent: {
          $size: "$joinedEvent"
        }
      }
    }
  ]

  return await User.aggregate(pipeline)
}

export default {
  getUserById,
  getUserByEmail,
  register,
  likeEventByUser,
  saveEventByUser,
  getSavedEventByUser,
  subscribeUser,
  getLikedEventByUser,
  addEventToJoinedEvent,
  getAllUsers,
  getUserProfile
};
