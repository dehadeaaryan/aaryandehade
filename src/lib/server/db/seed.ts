import { db } from './index';
import { experience, project, academic, contact } from './schema';

const initialExperiences = [
	{
		company: 'Apple',
		link: 'https://www.apple.com',
		title: 'Software Development Engineer in Test',
		dates: 'June 2026 - Present',
		description: [
			'Designing and automating robust Maps UI test cases for Android using Espresso and Jetpack Compose, focusing on flake reduction and overall test reliability.',
			'Owning testing features and collaborating closely with cross-functional Android development teams to improve application testability, triage failures, and solve complex automation challenges.',
			'Building and maintaining modern, scalable automation frameworks across app, SDK, and API levels to establish comprehensive CI readiness.',
			'Developing stable automation patterns—such as reliable selectors and synchronization architectures—and contributing to internal documentation to ensure long-term maintainability.'
		],
		logo: '/logos/apple-logo.jpg',
		sortOrder: 1
	},
	{
		company: 'Apple',
		link: 'https://www.apple.com',
		title: 'Software Development Engineer in Test',
		dates: 'July 2025 - May 2026',
		description: [
			'Designed and automated functional, end-to-end UI, and API tests for the Apple Maps Data platform, adding 70+ targeted regression tests to strengthen coverage of critical Places data workflows.',
			'Enhanced an internal triage web portal using Python and JavaScript, adding multiple diagnostic tools and improving an existing scheduler system to make system health and test results 40% faster to access.',
			'Built AI agents and reusable skills to generate test cases from test plan links, reducing manual test authoring time by ~50%.',
			'Collaborated with international and cross-functional teams to deliver automation and quality targets.'
		],
		logo: '/logos/apple-logo.jpg',
		sortOrder: 2
	},
	{
		company: 'iPELiNT',
		link: 'https://www.ipelint.com',
		title: 'Senior Design Project',
		dates: 'Sept 2024 - May 2025',
		description: [
			'Created and enhanced machine learning models to detect and classify patents with 99% top-5 accuracy, improving the patent search experience for users.',
			'Contributed to the development of a web application using Vue, node.js and MongoDB, enabling users to easily search and analyze patent data with an intuitive and modern interface.',
			'Collaborated with a team of 4 to design and implement new features, fix bugs, and optimize performance, resulting in a more robust and user-friendly product.'
		],
		logo: '/logos/ipelint-logo.jpeg',
		sortOrder: 3
	},
	{
		company: 'Qualcomm',
		link: 'https://www.qualcomm.com',
		title: 'SWE Intern (2024)',
		dates: 'May 2024 - Aug 2024',
		description: [
			'Collaborated on a testing team to deliver 4 critical features boosting user efficiency by 100%.',
			'Introduced new functionality and optimized performance for teams under modem technology.',
			'Captained a team of 5 interns in developing an AI-powered application to enhance meeting productivity.',
			'Represented 200+ interns on a six-member committee liaising with senior leadership.'
		],
		logo: '/logos/qualcomm-logo.jpg',
		sortOrder: 4
	},
	{
		company: 'Qualcomm',
		link: 'https://www.qualcomm.com',
		title: 'SWE Intern (2023)',
		dates: 'May 2023 - Aug 2023',
		description: [
			'Improved development efficiency by 20% across 5+ teams by creating tools using React.',
			'Accelerated frontend delivery by 50% using Micro Frontends while managing 3 Agile projects.'
		],
		logo: '/logos/qualcomm-logo.jpg',
		sortOrder: 5
	}
];

const initialProjects = [
	// webAndFullStack
	{
		title: 'DropThatClass',
		description: 'Up-to-date class reviews for students',
		link: 'https://www.dropthatclass.com/',
		categories: ['Web', 'Database', 'AI/ML'],
		groupCategory: 'webAndFullStack',
		sortOrder: 1
	},
	{
		title: 'iPELiNT',
		description: 'Created patent classification models using TensorFlow and Keras',
		link: 'https://www.ipelint.com/',
		categories: ['Web', 'Database', 'AI/ML'],
		groupCategory: 'webAndFullStack',
		sortOrder: 2
	},
	{
		title: 'SuperFrog Scheduler Frontend',
		description: 'Vue frontend for SuperFrog Scheduler project with Spring',
		link: 'https://github.com/dehadeaaryan/superfrog-scheduler-backend',
		categories: ['Web', 'Utilities'],
		groupCategory: 'webAndFullStack',
		sortOrder: 3
	},
	{
		title: 'F1 Stats',
		description: 'Find live Formula 1 statistics',
		link: 'https://github.com/dehadeaaryan/openf1client',
		categories: ['Web', 'Utilities'],
		groupCategory: 'webAndFullStack',
		sortOrder: 4
	},
	{
		title: 'TCU Utils',
		description: 'Miscellaneous utilities for TCU students',
		link: 'https://github.com/dehadeaaryan/tcu-utils',
		categories: ['Web', 'Utilities'],
		groupCategory: 'webAndFullStack',
		sortOrder: 5
	},
	{
		title: 'Campus Concierge',
		description: 'Concierge platform for campus housing services',
		link: 'https://github.com/dehadeaaryan/campus-concierge',
		categories: ['Web', 'Utilities'],
		groupCategory: 'webAndFullStack',
		sortOrder: 6
	},
	{
		title: 'F1Stats',
		description: 'API client for Formula 1 race results and statistics',
		link: 'http://github.com/dehadeaaryan/f1-client',
		categories: ['Web', 'Utilities'],
		groupCategory: 'webAndFullStack',
		sortOrder: 7
	},
	{
		title: 'Hogwarts Artifacts Online',
		description: 'Java-based website with artifacts from Hogwarts',
		link: 'https://github.com/dehadeaaryan/hogwarts-artifacts-online',
		categories: ['Java', 'Web'],
		groupCategory: 'webAndFullStack',
		sortOrder: 8
	},
	{
		title: 'AaryanDehade.me',
		description: 'My older personal website',
		link: 'https://github.com/dehadeaaryan/aaryandehade-portfolio',
		categories: ['Web'],
		groupCategory: 'webAndFullStack',
		sortOrder: 9
	},
	{
		title: 'ai.tcu.edu',
		description: 'Application for TCU AI labs',
		link: 'https://github.com/dehadeaaryan/tcu-ai',
		categories: ['Web'],
		groupCategory: 'webAndFullStack',
		sortOrder: 10
	},

	// dataAndBackend
	{
		title: 'SuperFrog Scheduler Backend',
		description: 'Java backend for SuperFrog Scheduler project with Spring',
		link: 'https://github.com/dehadeaaryan/superfrog-scheduler-backend',
		categories: ['Java', 'Web', 'Database', 'Utilities'],
		groupCategory: 'dataAndBackend',
		sortOrder: 11
	},
	{
		title: 'ASL to English',
		description: 'Python ML project for converting American Sign Language to English text.',
		link: 'https://github.com/dehadeaaryan/asl-to-english',
		categories: ['Python', 'AI/ML'],
		groupCategory: 'dataAndBackend',
		sortOrder: 12
	},
	{
		title: 'Book Manager MySQL',
		description: 'Python application to manage a book database using MySQL',
		link: 'https://github.com/dehadeaaryan/book-manager-mysql',
		categories: ['Python', 'Database'],
		groupCategory: 'dataAndBackend',
		sortOrder: 13
	},
	{
		title: 'Book Manager Mongo',
		description: 'Python application to manage a book database using MongoDB',
		link: 'https://github.com/dehadeaaryan/book-manager-mongo',
		categories: ['Python', 'Database'],
		groupCategory: 'dataAndBackend',
		sortOrder: 14
	},
	{
		title: 'Turtler',
		description: 'Pypi library for beginners to get started with Data Science',
		link: 'https://github.com/dehadeaaryan/turtler',
		categories: ['Python', 'Library'],
		groupCategory: 'dataAndBackend',
		sortOrder: 15
	},

	// systemsAndLogic
	{
		title: 'Marie Simulator',
		description: 'Simulator for MARIE (Machine Architecture that is Really Intuitive and Easy)',
		link: 'https://github.com/dehadeaaryan/marie-simulator',
		categories: ['Python', 'Utilities'],
		groupCategory: 'systemsAndLogic',
		sortOrder: 16
	},
	{
		title: 'Sudoku Solver',
		description: 'A Sudoku Solver implemented in Java',
		link: 'https://github.com/dehadeaaryan/sudoku-solver',
		categories: ['Java', 'Utilities'],
		groupCategory: 'systemsAndLogic',
		sortOrder: 17
	},
	{
		title: 'Maze Solver',
		description: 'Maze solver implemented in Java',
		link: 'https://github.com/dehadeaaryan/maze-solver',
		categories: ['Java', 'Utilities'],
		groupCategory: 'systemsAndLogic',
		sortOrder: 18
	},
	{
		title: 'Line Text Editor',
		description: 'Line text editor created in Java',
		link: 'https://github.com/dehadeaaryan/line-text-editor',
		categories: ['Java', 'Utilities'],
		groupCategory: 'systemsAndLogic',
		sortOrder: 19
	},
	{
		title: 'Tank War Game',
		description: '2D action game written in Java',
		link: 'https://github.com/dehadeaaryan/tank-war-game',
		categories: ['Java'],
		groupCategory: 'systemsAndLogic',
		sortOrder: 20
	},
	{
		title: 'Parallel Computing',
		description: 'Assignment for Parallel Computing Class',
		link: 'https://github.com/dehadeaaryan/parallel-computing-5',
		categories: ['C'],
		groupCategory: 'systemsAndLogic',
		sortOrder: 21
	},
	{
		title: 'Rabbit Fox Island',
		description: 'C-based island simulation using Parallel Computing',
		link: 'https://github.com/dehadeaaryan/rabbit-fox-island',
		categories: ['C', 'Parallel Computing'],
		groupCategory: 'systemsAndLogic',
		sortOrder: 22
	},

	// mobileAndTools
	{
		title: 'JustDropIt',
		description: 'Review classes on iOS application',
		link: 'https://github.com/dehadeaaryan/just-drop-it',
		categories: ['iOS', 'Database', 'Utilities'],
		groupCategory: 'mobileAndTools',
		sortOrder: 23
	},
	{
		title: 'Discord Bot Maker',
		description: 'Pypi library for creating Discord bots',
		link: 'https://github.com/dehadeaaryan/discord-bot-maker',
		categories: ['Python', 'Library'],
		groupCategory: 'mobileAndTools',
		sortOrder: 24
	},
	{
		title: 'Music.www',
		description: 'Play any song on the internet with extra controls',
		link: 'https://github.com/dehadeaaryan/music-www',
		categories: ['Python', 'Database', 'Utilities'],
		groupCategory: 'mobileAndTools',
		sortOrder: 25
	},
	{
		title: 'Quacker Bot',
		description: 'My own Discord bot',
		link: 'https://github.com/dehadeaaryan/quacker-bot-master',
		categories: ['Python', 'Utilities'],
		groupCategory: 'mobileAndTools',
		sortOrder: 26
	},
	{
		title: 'Pygame Builder',
		description: 'Pypi library to create games',
		link: 'https://github.com/dehadeaaryan/pygame-builder',
		categories: ['Python', 'Library'],
		groupCategory: 'mobileAndTools',
		sortOrder: 27
	},
	{
		title: 'Chess',
		description: 'Chess game in Python',
		link: 'https://github.com/dehadeaaryan/chess',
		categories: ['Python', 'Game Development'],
		groupCategory: 'mobileAndTools',
		sortOrder: 28
	},
	{
		title: 'Twitter Client',
		description: 'iOS Twitter client written in Swift',
		link: 'https://github.com/dehadeaaryan/ios-twitter',
		categories: ['iOS'],
		groupCategory: 'mobileAndTools',
		sortOrder: 29
	},
	{
		title: 'Parstagram',
		description: 'Instagram clone iOS app written in Swift',
		link: 'https://github.com/dehadeaaryan/ios-parstagram',
		categories: ['iOS', 'Database'],
		groupCategory: 'mobileAndTools',
		sortOrder: 30
	},
	{
		title: 'Calculator',
		description: 'iOS calculator app written in Swift',
		link: 'https://github.com/dehadeaaryan/ios-calculator',
		categories: ['iOS', 'Database'],
		groupCategory: 'mobileAndTools',
		sortOrder: 31
	},
	{
		title: 'More Projects',
		description: 'Visit my GitHub for more projects',
		link: 'https://github.com/dehadeaaryan',
		categories: ['Miscellaneous'],
		groupCategory: 'mobileAndTools',
		sortOrder: 32
	}
];

const initialAcademics = [
	{
		year: '2021',
		icon: 'graduationCap',
		content: 'Graduated from Navrachana Higher Secondary School.',
		sortOrder: 1
	},
	{
		year: '2021',
		icon: 'school',
		content: 'Started attending classes at Texas Christian University (TCU).',
		sortOrder: 2
	},
	{
		year: '2022',
		icon: 'briefcase',
		content: 'Started working as a TA for Computer Science and a grader for Math Calculus 1.',
		sortOrder: 3
	},
	{
		year: '2022',
		icon: 'award',
		content: 'Received the TCU Scholar award for academic excellence.',
		sortOrder: 4
	},
	{
		year: '2023',
		icon: 'mic',
		content: 'Nominated by TCU Math faculty to represent the university on a Math podcast.',
		sortOrder: 5
	},
	{
		year: '2023',
		icon: 'briefcase',
		content: 'Began role as a Resident Assistant (RA) for over 30 residents in TCU housing.',
		sortOrder: 6
	},
	{
		year: '2023',
		icon: 'badgeCheck',
		content: 'Earned the MongoDB Associate Developer certification.',
		sortOrder: 7
	},
	{
		year: '2023',
		icon: 'award',
		content: "Received Dean's List award for outstanding academic performance in both Fall and Spring semesters.",
		sortOrder: 8
	},
	{
		year: '2024',
		icon: 'users',
		content: 'Promoted to Community Manager by TCU Housing, managing a community of 200+ students.',
		sortOrder: 9
	},
	{
		year: '2024',
		icon: 'star',
		content: "Received Dean's List award for outstanding academic performance.",
		sortOrder: 10
	},
	{
		year: '2025',
		icon: 'graduationCap',
		content: 'Graduated from TCU Magna Cum Laude with a 3.83 GPA and received the TCU Scholar award again.',
		sortOrder: 11
	}
];

const initialContacts = [
	{
		name: 'Email',
		value: 'aaryanadehade@gmail.com',
		link: 'mailto:aaryanadehade@gmail.com',
		icon: 'mail',
		sortOrder: 1
	},
	{
		name: 'GitHub',
		value: '@dehadeaaryan',
		link: 'https://github.com/dehadeaaryan',
		icon: 'github',
		sortOrder: 2
	},
	{
		name: 'LinkedIn',
		value: 'Aaryan Dehade',
		link: 'https://linkedin.com/in/aaryandehade',
		icon: 'linkedin',
		sortOrder: 3
	}
];

async function seed() {
	console.log('Seeding portfolio data...');

	await db.delete(experience);
	await db.insert(experience).values(initialExperiences);
	console.log('Seeded experiences!');

	await db.delete(project);
	await db.insert(project).values(initialProjects);
	console.log('Seeded projects!');

	await db.delete(academic);
	await db.insert(academic).values(initialAcademics);
	console.log('Seeded academics!');

	await db.delete(contact);
	await db.insert(contact).values(initialContacts);
	console.log('Seeded contacts!');

	console.log('Successfully seeded all portfolio database tables!');
	process.exit(0);
}

seed().catch((err) => {
	console.error('Failed to seed database:', err);
	process.exit(1);
});
