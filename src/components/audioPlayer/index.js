// eslint-disable-next-line
import React, { useEffect, useRef, useState } from 'react'
import './audioPlayer.css'
import Controls from './controls';
import ProgressCircle from './progressCircle'
import WaveAnimation from './waveAnimation';

export default function AudioPlayer({ currentTrack, setCurrentIndex, currentIndex, total }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [trackProgress, setTractProgress] = useState(0)

    var audioSrc = total[currentIndex]?.track.preview_url
    console.log('debug audio src', audioSrc);
    const audioRef = useRef(new Audio(total[0]?.track.preview_url))
    const intervalRef = useRef()
    const isReady = useRef(false)
    const { duration } = audioRef.current
    const currentPersentage = duration ? (trackProgress / duration) * 100 : 0

    const startTimer = () => {
        clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                handleNext()
            } else {
                setTractProgress(audioRef.current.currentTime)
            }
        }, [1000])
    }

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current = new Audio(audioSrc)
            audioRef.current.play()
            startTimer()
        } else {
            clearInterval(intervalRef.current)
            audioRef.current.pause()
        }
        // eslint-disable-next-line
    }, [isPlaying])

    useEffect(() => {
        audioRef.current.pause()
        audioRef.current = new Audio(audioSrc)
        setTractProgress(audioRef.current.currentTime)
        if (isReady.current) {
            audioRef.current.play()
            setIsPlaying(true)
            startTimer()
        } else {
            isReady.current = true
        }

        // eslint-disable-next-line
    }, [currentIndex])

    useEffect(() => {
        return () => {
            audioRef.current.pause()
            clearInterval(intervalRef.current)
        }
    }, [])

    const handleNext = () => {
        if (currentIndex < total.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setCurrentIndex(0)
        }
    }

    const handlePrev = () => {
        if (currentIndex - 1 < 0) setCurrentIndex(currentIndex - 1)
        else currentIndex(currentIndex - 1)
    }


    const addZero = (n) => {
        return n > 9 ? "" + n : "0" + n
    }
    const listArtist = []
    currentTrack?.album?.artists.forEach(items => {
        listArtist.push(items.name)
    });
    return (
        <div className='player-body flex'>
            <div className='player-left-body'>
                <ProgressCircle
                    percentage={currentPersentage}
                    isPlaying={true}
                    image={currentTrack?.album?.images[0]?.url}
                    size={300}
                    color="#0E918C"

                />
            </div>
            <div className='player-right-body flex'>
                <p className='song-title'>{currentTrack?.name}</p>
                <p className='song-artist'> {listArtist.join(" | ")}</p>
                <div className='player-right-bottom flex'>
                    <div className='song-duration flex'>

                        <p className='duration'>
                            00:{addZero(Math.round(trackProgress))}
                        </p>
                        <WaveAnimation isPlaying={isPlaying} />
                        <p className='duration'>
                            00:30
                        </p>
                    </div>
                    <Controls
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        total={total}
                    />
                </div>
            </div>

        </div>
    )
}
