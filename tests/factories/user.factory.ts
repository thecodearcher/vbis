import { User } from '../../src/api';
import { Factory } from './factory';

const factory = new Factory<User>(User);

factory.define((faker) => {
    return {
        firstname: faker.name.firstName(1),
        lastname: faker.name.lastName(1),
        password: faker.random.alphaNumeric(),
        email: faker.internet.email(),
        dob: faker.date.past(10),
        lastLogIn: faker.date.recent(),
    };

});

export const UserFactory = factory;
