import { model, Schema } from 'mongoose';
import { User } from './user.model';

const userSchema = new Schema<User>({
    _id: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    password: { type: Schema.Types.String, required: true },
    salt: { type: Schema.Types.String, required: true },
    role: { type: Schema.Types.String, required: true }
})

export const userContext = model<User>('user', userSchema);