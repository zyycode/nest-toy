import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(username: string) {
    if (username === 'zyycode') {
      return 'zyycode is here.';
    }
    return 'No on here.';
  }
}
