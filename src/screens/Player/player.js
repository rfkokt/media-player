import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './player.css'
import apiClient from '../../spotify'
import { AudioPlayer, SongCard, Queue } from '../../components'

export default function Player() {
    const location = useLocation()
    const [tracks, setTracks] = useState([])
    const [currentTrack, setCurrentTrack] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (location.state) {
            apiClient.get(`playlists/${location.state?.id}/tracks`)
                .then(res => {

                    setTracks(res.data.items)
                    setCurrentTrack(res.data.items[0].track)
                })
        }
    }, [location.state])

    useEffect(() => {
        setCurrentTrack(tracks[currentIndex]?.track)
    }, [currentIndex, tracks])

    return (
        <div className='screen-container flex '>
            <div className='left-player-body'>
                <AudioPlayer currentTrack={currentTrack} setCurrentIndex={setCurrentIndex} total={tracks} currentIndex={currentIndex} />
            </div>
            <div className='right-player-body'>
                <SongCard album={currentTrack?.album} />
                <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
            </div>
        </div>
    )
}
