import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
    private fakeUsers = [{username: 'Jawk',  email: 'jawkawume@gmail.com'}]
    fetchUsers() {
        return this.fakeUsers;
    }

    createUser(userDetails : CreateUserType) {
        return this.fakeUsers.push(userDetails);
      
    }

    fetchUserById(id: number) {
        return {id: 1, username:"Jawk"}
    }

}
