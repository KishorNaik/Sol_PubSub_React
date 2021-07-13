import React, { Component, MouseEvent } from "react";
import PubSub from "pubsub-js";

interface IChildProps{

}

interface IChildState{
    Increment:number;
}
export default class Child extends Component<IChildProps,IChildState>{

    constructor(props:IChildProps){
        super(props);

        this.state={
            Increment:0
        };
    }

    private IncrementStateHasChange=(incrementValue:number,stateUpdateChanged:()=>void):void=>{
        this.setState({
            Increment:incrementValue
        },()=> stateUpdateChanged());
    }

  
    // Button Click Event Handler
    private OnTriggerIncrement=(event:MouseEvent):void=>{

        let incrementValue=this.state.Increment+ 1;
        
        console.log("Increment Value:",incrementValue);
        this.IncrementStateHasChange(incrementValue,()=>{
            console.log("After State Increment Value:",incrementValue);
            PubSub.publish("IncrementPubSub",this.state.Increment);
        });
    }

    public render(){
        return (
            <React.Fragment>
                <button className="btn btn-dark" onClick={this.OnTriggerIncrement}>Trigger</button>
            </React.Fragment>
        )
    }
}