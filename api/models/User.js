import mongoose, { Schema } from 'mongoose';

const UserSchema= mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        userName:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        profileImage:{
            type: String,
            required: false,
            default:"https://www.pngkey.com/detail/u2q8u2w7e6y3r5y3_default-profile-picture-avatar-png-green/#google_vignette"
        },
        isAdmin:{
            type: Boolean,
            default: false
        },
        roles:{
            type: [Schema.Types.ObjectId],
            required: true,
            ref: "Role"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', UserSchema);
