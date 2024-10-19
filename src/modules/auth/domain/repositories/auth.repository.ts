import { ISignupDto } from '@modules/auth';
import { AuthCredentials } from '../value-objects';

export interface IAuthRepository {
  login(username: string, password: string): Promise<AuthCredentials>;
  signup(command: ISignupDto): Promise<void>;
  logout(userId: string): Promise<void>;
  renewToken(refreshToken: string): Promise<AuthCredentials>;
}
