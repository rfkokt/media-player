import React from 'react'
import './queue.css'

export default function Queue({ tracks, setCurrentIndex }) {
    return (
        <div className='queue-container flex'>
            <div className='queue flex'>
                <p className='upNext'>Up Next</p>
                <div className='queue-list'>
                    {tracks?.map((item, index) => (
                        <div className='queue-item' onClick={() => setCurrentIndex(index)} key={index}>
                            <p className='track-name'>{item?.track?.name}</p>
                            <p>00:30</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
