import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from '../../database/sequelize';

@Injectable()
export class UserService {
  async findOne(username: string): Promise<any> | undefined {
    const sql = `
      SELECT
        user_id id, real_name realName, role
      FROM
        admin_user
      WHERE
        account_name = '${username}'
    `;
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: true,
      });
      const user = res[0];
      if (!user) {
        return {
          code: 600,
          msg: 'No one here.',
        };
      }
      return {
        code: 200,
        data: {
          user,
        },
        msg: 'success',
      };
    } catch (error) {
      return {
        code: 500,
        msg: `Service error: ${error}`,
      };
    }
  }
}
