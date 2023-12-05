import mangoose from 'mongoose';

const RoleSchema = mangoose.Schema(
    {
        role:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mangoose.model('Role', RoleSchema);