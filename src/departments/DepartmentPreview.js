import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./departments2.scss"
import complaintIcon from '../res/image/complaintIcon.png'
import locationIcon from '../res/image/locationIcon.png'

const DepartmentPreview = ({item}) => (
  <Link
      to={"/department/" + item.url.split('/').pop()}
      className="c_department-preview">
      <h1
        className="c_department-preview__department">
          { item.text }
      </h1>
      <div
          className="c_department-preview__row">
          <img
              className="c_department-preview__row__complaint-icon"
              src={complaintIcon}
              alt="complaint icon" />
          <p
            className="c_department-preview__row__complaints">
              { "00" }
          </p>
          <img
              className="c_department-preview__row__location-icon"
              src={locationIcon}
              alt="location icon" />
          <p
              className="c_department-preview__row__location">
                  { item.state }
          </p>
      </div>
  </Link>
)


export default DepartmentPreview
