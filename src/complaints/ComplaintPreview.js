import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import * as classFormatter from 'classnames'

import "./complaints.scss"

const ComplaintPreview = ({item}) => {
  const created = new Date(item.created)

  return (
    <Link 
        className={classFormatter(
          "c_complaint-preview",
        )}
        to={"/complaint/"+ item.pk.toString()}>
        <div 
            className="c_complaint-preview__row">
            { item.user && (
              <h3 
                  className={classFormatter(
                      "c_complaints__cursor-style",
                      "c_complaint-preview__row__username"
                  )}>
                      { `@${item.user.username}` }
              </h3>
            )}
            <time 
                className="c_complaint-preview__row__date">
                    { created.toDateString() }
            </time>
        </div>
        <p 
            className={classFormatter(
                "c_complaints__cursor-style",
                "c_complaint-preview__description"
            )}>
                { item.description }
        </p>
  {/*      <div 
            className="c_complaint-preview__row">
            <img
                className="c_complaint-preview__row__view-icon" 
                src={viewsIcon}
                alt="views icon" />
            <p 
                className={classFormatter(
                    "c_complaints__cursor-style",  
                    "c_complaint-preview__row__views"
                )}> 
                    { item.pageviews } views
            </p>
            <img 
                className="c_complaint-preview__row__response-icon" 
                src={commentIcon}
                alt="comment icon" />
            <p          
                className={classFormatter(
                    "c_complaints__cursor-style",
                    "c_complaint-preview__row__responses"
                )}> 
                    0 responses
            </p>
        </div>*/}
    </Link>
  )
}

export default ComplaintPreview
