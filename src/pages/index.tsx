import { GetServerSideProps } from 'next';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { ChalllengeBox } from '../components/ChalllengeBox';

import Head from 'next/head';

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengeContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  profilePicUrl: string;
  fullName: string;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}>
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile
                name={props.fullName}
                profileImg={props.profilePicUrl} />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChalllengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  return {
    props: {
      fullName: 'Leonardo Casagrande',
      profilePicUrl: 'https://github.com/leonardocasagrande.png',
      level: !!level ? Number(level) : 0,
      currentExperience: !!currentExperience ? Number(currentExperience) : 0,
      challengesCompleted: !!challengesCompleted ? Number(challengesCompleted) : 0
    }
  }
}