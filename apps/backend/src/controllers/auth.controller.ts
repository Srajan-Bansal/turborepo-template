import { Request, Response, NextFunction, CookieOptions } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import bcrypt from 'bcryptjs';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

const generateToken = (id: string): string => {
	return jwt.sign({ id }, process.env.JWT_SECRET as string, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const sendCookie = (res: Response, token: string): void => {
	const cookieOptions: CookieOptions = {
		maxAge:
			parseInt(process.env.JWT_COOKIE_EXPIRES_IN as string) *
			24 *
			60 *
			60 *
			1000,
		httpOnly: true,
		sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
		secure: process.env.ENVIRONMENT === 'production',
	};
	res.cookie('jwt', token, cookieOptions);
};

export const signup = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return next(
				new AppError({
					statusCode: 400,
					message: 'Name, email and password are required',
				})
			);
		}

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
			},
		});

		if (!user) {
			return next(
				new AppError({
					statusCode: 500,
					message: 'Error creating user',
				})
			);
		}

		const token = generateToken(user.id);
		sendCookie(res, token);

		res.status(201).json(user);
	}
);

export const login = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(
				new AppError({
					statusCode: 400,
					message: 'Email and password are required',
				})
			);
		}

		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (
			!user ||
			!(await bcrypt.compare(password, user.password as string))
		) {
			return next(
				new AppError({
					statusCode: 401,
					message: 'Invalid email or password',
				})
			);
		}

		const token = generateToken(user.id);
		sendCookie(res, token);

		res.status(200).json(user);
	}
);

export const logout = async (req: Request, res: Response) => {
	res.cookie('jwt', '', {
		maxAge: 0,
		httpOnly: true,
	});
	res.status(200).send('User is logout');
};
