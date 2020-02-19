import React, { useState } from 'react'

import leftArrowIcon from '../res/image/leftArrowIcon.png'
import rightArrowIcon from '../res/image/rightArrowIcon.png'

import './mediaList.scss'

const IMG_TYPES = [
	'.png',
	'.jpg',
	'.jpeg',
	'.jfif',
	'.gif',
	'.webp',
]

const VID_TYPES = [
	'.mp4',
]

const MediaList = ({media}) => {
	const [ position, setPosition ] = useState(0)

	return ( (media.length > 0) ? 
		(
			<div className="c_media-list">
				{ media.length > 1 && (
					<button
						onClick={ () => setPosition(Math.max(0,position-1))}
						className="c_media-list__control">
						<img
							src={ leftArrowIcon}
							alt="Previous arrow"
							className="c_media-list__control__arrow"
						/>
					</button>
				)}
				<div className="c_media-list__media-container">
					{ IMG_TYPES.filter( ext => media[position].file_name.includes(ext)).length > 0 && (
						<img
							className="c_media-list__media-container__media"
							src={media[position].file_name}
							alt="User uploaded media"
						/>
					)}
					{ VID_TYPES.filter( ext => media[position].file_name.includes(ext)).length > 0 && (
						<video
							className="c_media-list__media-container__media"
							src={media[position].file_name}
							controls
						/>
					)}
				</div>
				{ media.length > 1 && (
					<button
						onClick={ () => setPosition(Math.min(media.length-1,position+1))}
						className="c_media-list__control">
						<img
							src={ rightArrowIcon}
							alt="Next arrow"
							className="c_media-list__control__arrow"
						/>
					</button>	
				)}
			</div> 
		) : null 
	)
}

export default MediaList