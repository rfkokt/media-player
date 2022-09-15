import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { AiFillPlayCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import APIKit from '../../spotify'
import './library.css'

export default function Library() {
    const [playlists, setPlaylists] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        APIKit.get("me/playlists").then(
            function (response) {
                setPlaylists(response.data.items)
            }
        )
    }, [])

    const playPlaylist = (id) => {
        navigate('/player', { state: { id: id } })
    }

    return (

        <div className='screen-container'>
            {/* <marquee directions="right" scrollamount="20"> */}
            {/* I LOVE YOU NOVIA TRIE RIZKIYANTI ❤️❤️ */}
            {/* </marquee> */}
            <div className='library-body'>

                {playlists?.map((playlist) =>
                    <div className='playlist-card' key={playlist.id} onClick={() => playPlaylist(playlist.id)}>
                        <img src={playlist.images[0].url} className="playlist-image" alt='playlist-images' />
                        <p className='playlist-title'>
                            {playlist.name}
                        </p>
                        <p className='playlist-subtitle'>
                            {playlist.tracks.total} Songs
                        </p>
                        <div className='playlist-fade'>
                            <IconContext.Provider value={{ size: "50px", color: "#0E918C" }}>
                                <AiFillPlayCircle />
                            </IconContext.Provider>
                        </div>
                    </div>
                )}
            </div>


        </div>

    )
}
