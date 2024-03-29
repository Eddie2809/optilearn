import React,{Component} from 'react'
import PomodoroClock from '../components/PomodoroClock'
import PomodoroSettings from '../components/PomodoroSettings'

export default class PomodoroContainer extends Component{
    render(){
        return(
            <div className={"PomodoroContainer " + (this.props.mode? "flipY ":" ")}>
                <PomodoroClock p={this.props.p} timerState={this.props.timerState}/>
                <PomodoroSettings p={this.props.p} setTimerState={this.props.setTimerState}/>
            </div>
        )
    }
}