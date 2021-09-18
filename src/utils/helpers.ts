import { ObjectID } from 'typeorm-plus';
import { ObjectID as NativeObjectID } from 'mongodb';

export function convertToObjectID(identifier: string): ObjectID {
    try {
        return NativeObjectID(identifier);

    } catch (error) {
        return null;
    }
}
