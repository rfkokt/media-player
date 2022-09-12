import React, { useState, useEffect } from 'react'
import './sidebar.css'
import SidebarButton from './sidebarButton'
import { MdSpaceDashboard, MdFavorite } from 'react-icons/md'
import { FaGripfire, FaPlay, FaSignOutAlt } from 'react-icons/fa'
import { IoLibrary } from 'react-icons/io5'
import apiClient from '../../spotify'

export default function Sidebar() {
    const [image, setImage] = useState("https://play-lh.googleusercontent.com/btT8gUw3VY0htfFnyh-RCqs14juns-h-6VIm1-Fm9KyKDDCjWIUdnPqg1sMb-32sx4I")

    useEffect(() => {
        apiClient.get("me").then(res => {
            console.log("debug ", res.data.images[0].url)
            setImage(res.data.images[0].url)
        })
    }, [])

    return (
        <div className='sidebar-container'>
            <img
                src={image}
                className='profile-img'
                alt='profile' />
            <div>
                <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
                <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
                <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
                <SidebarButton title="Favorite" to="/favorites" icon={<MdFavorite />} />
                <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
            </div>
            <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />} />
        </div>
    )
}
