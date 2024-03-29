import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default class Calendar extends React.Component{
    loadEvents = () => {
        let date
        let color
        let events = []
        let mapTopicIdName = new Map()
        let today = new Date()

        for(let i = 0; i < this.props.topics.length; i++){
            date = new Date((this.props.topics[i].first_session_date).slice(0,10)+'T00:00:00')
            mapTopicIdName[this.props.topics[i].id] = this.props.topics[i].name
            events.push({
                title: this.props.topics[i].name,
                date: (date.getFullYear() + "-" + ((date.getMonth()+1)<10? ("0" + (date.getMonth()+1)):((date.getMonth()+1))) + "-" + ((date.getDate())<10? ("0" + (date.getDate())):((date.getDate())))),
                display: 'list-item',
                color: '#00ADB5',
                overlap: 'true'
            })
        }
            
        for(let i = 0; i < this.props.reviews.length; i++){
            date = new Date((this.props.reviews[i].review_date).slice(0,10)+'T00:00:00')
            color = (this.props.reviews[i].done? "#4AC563":(date.getTime() > today.getTime()? "#EBF144": "#FF3737"))
            events.push({
                title: mapTopicIdName[this.props.reviews[i].topic_id],
                date: (date.getFullYear() + "-" + ((date.getMonth()+1)<10? ("0" + (date.getMonth()+1)):((date.getMonth()+1))) + "-" + ((date.getDate())<10? ("0" + (date.getDate())):((date.getDate())))),
                display: 'list-item',
                color: color
            })
        }

        return events
    }
    render(){
        this.loadEvents()
        return(
            <div className="calendar">
                <div className='colors'>
                    <ul>
                        <li className="green">{this.props.p.completedReview}</li>
                        <li className="blue">{this.props.p.initialStudySession}</li>
                        <li className="yellow">{this.props.p.reviewToBeDone}</li>
                        <li className='red'>{this.props.p.reviewNotDone}</li>
                    </ul>
                </div>
                <FullCalendar
                    height="100vh"
                    locale = {this.props.locale}
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    events={this.loadEvents()}
                />
            </div>
        )
    }   
}

