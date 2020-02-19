import React from 'react'

import './story.scss'
import {
	DepartmentInput,
	LocationInput,
	DescriptionInput,
	OfficerInput,
	DateInput,
	TagInput,
	LinkInput,
	MediaInput,
} from './Inputs'

const Story = ({form}) => {
	return (
		<div className="c_story">
			<DepartmentInput form={form} />
			<div className="c_story__date-location-row">
				<DateInput form={form} />
				<LocationInput form={form} />
			</div>
			<DescriptionInput form={form} />
			<OfficerInput form={form} />
			<TagInput form={form} />
			<LinkInput form={form} />
			<MediaInput form={form} />
		</div>
	)
}

export default Story