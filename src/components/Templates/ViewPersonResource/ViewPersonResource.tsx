import CreditsTableTitle from '../../Person/CreditsTable/CreditsTableTitle';
import { CreditsTable } from '../../Person';
import PersonSidebar from '../../Sidebars/PersonSidebar/PersonSidebar';
import { PersonKnownForCard } from '../../Cards';
import { SocialLink } from '../../../types/Social';
import { Credit } from '../../Person/CreditsTable/types';

type ViewPersonResourceProps = {
	person: {
		name: string;
		headshotUrl: string;
		knownForDepartment: string;
		numberOfCredits: number;
		gender: string;
		birthday: string;
		placeOfBirth: string;
		knownAs: string[];
		socials: SocialLink[];
		biography: string;
	};
	knownFor: { title: string; posterUrl: string }[];
	credits: { year: number; credits: Credit[] }[];
};

const ViewPersonResource = ({ person, knownFor = [], credits = [] }: ViewPersonResourceProps) => (
	<div className='md:m-auto md:max-w-[90rem]'>
		<aside className='md:absolute md:bottom-2 md:top-5 md:w-80'>
			<PersonSidebar
				name={person?.name}
				headshotUrl={person?.headshotUrl}
				knownForDepartment={person?.knownForDepartment}
				numberOfCredits={person?.numberOfCredits}
				gender={person?.gender}
				birthday={person?.birthday}
				placeOfBirth={person?.placeOfBirth}
				knownAs={person?.knownAs}
				socials={person?.socials}
			/>
		</aside>

		<main className='pb-4 md:ml-80 md:px-4 md:pr-8'>
			<section id='name'>
				<h3 className='my-4 hidden text-center text-4xl font-bold text-black md:block md:text-left'>
					{person?.name ?? ''}
				</h3>
			</section>

			<section id='biography'>
				<h3 className='py-4 text-2xl font-bold'>Biography</h3>

				<p>{person?.biography}</p>
			</section>

			<section className='border-b border-solid border-gray-400 pt-4' id='known-for'>
				<h3 className='py-4 text-2xl font-bold'>Known For</h3>

				<div className='flex w-full overflow-y-auto'>
					{knownFor?.map((resource) => (
						<PersonKnownForCard
							title={resource.title}
							image={resource.posterUrl}
							key={resource?.title}
						/>
					)) ?? null}
				</div>
			</section>

			<section id='credits'>
				<CreditsTableTitle
					allDropdownOptions={[
						{
							label: 'Movies',
							value: 'movies'
						},
						{
							label: 'TV Shows',
							value: 'tv-shows'
						}
					]}
					departmentDropdownOptions={[
						{
							label: 'Acting (40)',
							value: 'acting'
						},
						{
							label: 'Production (1)',
							value: 'production'
						}
					]}
					showClearAll
				/>

				<div style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }} id='credits-table'>
					{credits?.map((creditGroup) => (
						<CreditsTable
							credits={creditGroup.credits}
							year={creditGroup.year}
							key={creditGroup.year}
						/>
					))}
				</div>
			</section>
		</main>
	</div>
);

export default ViewPersonResource;
