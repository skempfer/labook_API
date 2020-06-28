import { BaseDataBase } from "./BaseDatabase";

export class RefreshTokenDataBase extends BaseDataBase {
    
    private static TABLE_NAME = "refresh_token";

    public convertIntToBoolean(value: number):boolean {
        return value ===1;
    };
    public convertBooleanToInt(value: boolean): number {
        return value ? 1 : 0;
    };

    public async createRefreshToken(
        token:string,
        user_id: string,
        device: string,
        is_active: boolean
    ): Promise<void> {
        await this.getConnection().insert({
            token,
            user_id,
            device,
            is_active: this.convertBooleanToInt(is_active),
        })
        .into(RefreshTokenDataBase.TABLE_NAME);
    }

    public async getRefreshToken(token: string): Promise<any>{
        const result = await this.getConnection().raw(`
        SELECT * FROM "${RefreshTokenDataBase.TABLE_NAME}"
        WHERE token = "${token}"
        `);

        const retrivedToken = result[0][0];

        if(retrivedToken === undefined){
            return undefined;
        };

        return {
            token: retrivedToken.refresh_token,
            user_id: retrivedToken.user_id,
            device: retrivedToken.device,
            is_active: this.convertIntToBoolean(retrivedToken.is_active)
        }
    };

    public async getRefreshTokenByIdAndDevide(user_id: string, device: string): Promise<any>{
        const result = await this.getConnection().raw(`
        SELECT * FROM ${RefreshTokenDataBase.TABLE_NAME}
        WHERE user_id = "${user_id}"
        AND device = "${device}"
        `);

        const retrivedToken = result[0][0];

        if(retrivedToken === undefined){
            return undefined;
        };

        return {
            token: retrivedToken.refresh_token,
            user_id: retrivedToken.user_id,
            device: retrivedToken.device,
            is_active: this.convertIntToBoolean(retrivedToken.is_active)
        };
    };

    public async deleteToken(token: string): Promise<any>{
        await this.getConnection()
        .from(RefreshTokenDataBase.TABLE_NAME)
        .where({token : token})
        .del();
    };

};