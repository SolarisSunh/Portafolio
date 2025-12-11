import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { SectionWrapper } from '@/components/SectionWrapper'
import { SeafloorSimulation } from '@/components/SeafloorSimulation'
import { TechnicalSheet } from '@/components/TechnicalSheet'
import { DronePerspectiveViewer } from '@/components/DronePerspectiveViewer'

export default function App() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<main>
				<Hero />
				<SectionWrapper id="simulacion">
					<SeafloorSimulation />
				</SectionWrapper>
				<SectionWrapper id="ficha">
					<TechnicalSheet />
				</SectionWrapper>
				<SectionWrapper id="vista3d">
					<DronePerspectiveViewer />
				</SectionWrapper>
			</main>
		</div>
	)
}
