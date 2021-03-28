import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import { encryptPassword, makeSalt } from '../../utils/cryptogram';
import sequelize from '../../database/sequelize';

@Injectable()
export class UserService {
  /**
   * 查询是否有该用户
   * @param {string} username
   * @returns
   */
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
      const user = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT,
          raw: true,
          logging: false,
        })
      )[0];
      return user;
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

  /**
   * 注册
   * @param requestBody
   * @returns
   */
  async register(requestBody: any): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    const bodyArr = Object.entries({
      accountName,
      realName,
      password,
      repassword,
      mobile,
    });
    for (const [k, v] of bodyArr) {
      if (!v) {
        return {
          code: 400,
          msg: `${k} must be input`,
        };
      }
    }
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }
    const user = await this.findOne(accountName);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);
    const registerSQL = `
      INSERT INTO admin_user
        (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      VALUES
        ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
    `;
    try {
      await sequelize.query(registerSQL, { logging: false });
      return {
        code: 200,
        msg: 'success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
