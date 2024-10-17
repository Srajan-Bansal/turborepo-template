import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '@repo/ui/PrimaryButton';
import { SecondaryButton } from '@repo/ui/SecondaryButton';
import { Header } from './../components/Header';

export const Home = () => {
	const navigate = useNavigate();

	return (
		<>
			<Header />
			<div>
				<div className='flex justify-center'>
					<div className='text-5xl font-semibold text-center pt-8 max-w-xl'>
						Automate as fast as you can type
					</div>
				</div>
				<div className='flex justify-center pt-2'>
					<div className='text-xl font-normal text-center pt-8 max-w-2xl'>
						AI gives you automation superpowers, and Zapier puts
						them to work. Pairing AI and Zapier helps you turn ideas
						into workflows and bots that work for you.
					</div>
				</div>

				<div className='flex justify-center pt-4'>
					<div className='flex'>
						<PrimaryButton
							onClick={() => {
								navigate('/signup');
							}}
							size='big'
						>
							Get Started free
						</PrimaryButton>
						<div className='pl-4'>
							<SecondaryButton
								onClick={() => {}}
								size='big'
							>
								Contact Sales
							</SecondaryButton>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
