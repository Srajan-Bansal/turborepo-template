import { UserProfile } from './types';

declare global {
	namespace Express {
		interface Request {
			user?: UserProfile;
		}
	}
}
