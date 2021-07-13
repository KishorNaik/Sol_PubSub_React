import React, { Component } from "react";
import PubSub from "pubsub-js";
import Child from "./Child";

interface IParentProps{

}

interface IParentState{
    Increment:number
}


export default class Parent extends Component<IParentProps,IParentState>{

    constructor(props:IParentProps){
        super(props);

        this.state={
            Increment:0
        };
    }

    public componentWillMount(){
        PubSub.subscribe("IncrementPubSub",(msg:string|symbol, data:number)=>{
            console.log("Message:",msg);
            this.setState({
                Increment:data
            });
        });
    }


    public render():JSX.Element{
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-6">
                            <div className="alert alert-dark">
                                <h3 className="text-success">
                                    {this.state.Increment}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-6">
                            <Child></Child>
                        </div>
                    </div>
                </div>
               
            </React.Fragment>
        )
    }
}