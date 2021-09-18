import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

    const [percentToNextLevel, setPercentToNextLevel] = useState(0);

    useEffect(() => {
        setPercentToNextLevel(Math.round((currentExperience * 100) / experienceToNextLevel))
    }, [currentExperience, experienceToNextLevel])

    return (
        <header className={styles.experienceBar}>
            <span>0xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel ?? 0}%` }}></div>
                <span className={styles.currentExperience}
                    style={{ left: `${percentToNextLevel ?? 0}%` }}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel}</span>
        </header>
    );
}