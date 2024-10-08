import mongoose, {mongo, Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
    videoFile:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    duration: {
        type:Number, //Cloudina
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.ObjectId,
        ref:'User'
    }
},{timestamps:true})
mongoose.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model('Video',videoSchema)