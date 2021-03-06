import React,{Component} from 'react'

let months = [['Jan','Enero'],['Feb','Febrero'],['Mar','Marzo'],['Apr','Abril'],['May','Mayo'],['Jun','Junio'],['Jul','Julio'],['Aug','Agosto'],['Sep','Septiembre'],['Oct','Octubre'],['Nov','Noviembre'],['Dec','Diciembre']]

export default class NewSessionContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            topicName: '',
            references: '',
            reviews: -1,
            day: new Date().getDate(),
            month: (new Date().getMonth())+1,
            year: new Date().getFullYear(),
        }
    }
    generateDays = () => {
        let today = new Date()
        let days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
        let daysElements = days.map((d,i)=>{
            if(d==today.getDate()) return <option selected value={d<10? "0"+d:d}>{d<10? "0"+d:d}</option>
            else return <option value={d<10? "0"+d:d}>{d<10? "0"+d:d}</option>
        })
        return <select onChange={(event)=>this.setState({day: event.target.value})} name="day" id="day">{daysElements}</select>
    }

    generateMonths = () => {
        
        let today = new Date()
    
        let monthsElements = months.map((m,i)=>{
            if(i==today.getMonth()) return <option selected value={m[0]}>{m[1]}</option>
            else return <option value={m[0]}>{m[1]}</option>
        })

        return <select onChange={event => this.setState({month: event.target.value})} name="month" id="month">{monthsElements}</select>
    
    }

    generateYears = () => {
        let today = new Date()
        let firstYear = 2019
        let years = []
        do{
            years.push(firstYear)
            firstYear++
        }while(firstYear<=today.getFullYear())

        let yearsElements = years.map((y,i)=>{
            if(y==today.getFullYear()) return <option selected value={y}>{y}</option>
            else return <option value={y}>{y}</option>
        })

        return <select onChange={event => this.setState({year: event.target.value})} name="year" id="year">{yearsElements}</select>

    }

    submitNewTopic = () => {

        let date = new Date(this.state.month+" "+this.state.day+" "+this.state.year)

        if(this.state.topicName==''){
            alert("Please input the topic name")
            return;
        }

        let reviewsArray = []
        if(this.state.reviews==-1){
            reviewsArray = [1,7,30,60,90]
        }
        else if(this.state.reviews>=0){
            for(let i = 0; i < this.props.userCustomizedReviews.length; i++){
                if(this.state.reviews==this.props.userCustomizedReviews[i].id){
                    reviewsArray=this.props.userCustomizedReviews[i].days
                    break
                }
            }
        }

        this.props.newTopic(this.state.topicName,this.state.references,date.getTime(),reviewsArray)

        document.getElementById("topic-name").value = ""
        document.getElementById("references").value = ""
        document.getElementById("day").value = new Date().getDate()
        document.getElementById("month").value = months[new Date().getMonth()][0]
        document.getElementById("year").value = new Date().getFullYear()
        document.getElementById("reviews").value = -1

        this.setState({
            topicName: '',
            references: '',
            reviews: -1,
            day: new Date().getDate(),
            month: (new Date().getMonth())+1,
            year: new Date().getFullYear(),
        })
    }

    generateReviews = () => {
        let options = [];
        options.push(<option value="-1">Predeterminado</option>)
        options.push(<option value="-2">Sin repaso</option>)

        for(let i = 0; i<this.props.userCustomizedReviews.length; i++){
            options.push(<option value={this.props.userCustomizedReviews[i].id.toString()}>{this.props.userCustomizedReviews[i].name}</option>)
        }
        return options
    }

    render(){
        return(
            <div className={"NewSessionContainer " + (this.props.mode? "": "flipY")}>
                <div className="form">
                    <div className="topic-date-review">
                        <p>Tema</p>
                        <input maxLength="150" defaultValue={this.state.topicName} type="text" id="topic-name" onChange={event=>this.setState({topicName: event.target.value})}/>
                        <p>Fecha</p>
                        <div className="date">
                            {this.generateDays()}
                            {this.generateMonths()}
                            {this.generateYears()}
                        </div>
                        <p>Repaso</p>
                        <select name="" id="reviews" onChange={event=>this.setState({reviews: event.target.value})}>
                            {this.generateReviews()}
                        </select>  
                    </div>
                    <div className="references" onChange={event=>{this.setState({references: event.target.value})}}>
                        <p>Referencias</p>
                        <textarea maxLength="350" name="" id="references" cols="30" rows="10"></textarea>
                    </div>
                    <button onClick={this.submitNewTopic}>A??adir</button>
                </div>
            </div>
        )
    }
}