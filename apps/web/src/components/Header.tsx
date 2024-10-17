import { useNavigate } from 'react-router-dom';
import { LinkButton } from '@repo/ui/LinkButton';
import { PrimaryButton } from '@repo/ui/PrimaryButton';

export const Header = () => {
	const navigate = useNavigate();

	return (
		<header className='flex border-b justify-between p-4'>
			<div className='flex flex-col justify-center text-2xl font-extrabold'>
				TaskFlow
			</div>
			<div className='flex'>
				<div className='pr-4'>
					<LinkButton onClick={() => {}}>Contact Sales</LinkButton>
				</div>
				<div className='pr-4'>
					<LinkButton
						onClick={() => {
							navigate('/app/login');
						}}
					>
						Login
					</LinkButton>
				</div>
				<PrimaryButton
					onClick={() => {
						navigate('/signup');
					}}
				>
					Signup
				</PrimaryButton>
			</div>
		</header>
	);
};
