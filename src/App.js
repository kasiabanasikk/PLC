import React, {Component} from 'react';
import './App.css';
import DriverFilter from "./components/DriverFilter";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            drivers: [],
            matchFilter: [],
            filterArray: []
        };

        this.filterChange = this.filterChange.bind(this);
    }

    static async fetchDrivers() {
        const response = await fetch('/driver');
        return await response.json();
    }

    componentDidMount() {
        let that = this;
        App.fetchDrivers().then(response => {
            that.setState({
                drivers: response,
                matchFilter: response.map(driver => driver._id)
            });
        });
    }

    filterChange(property, array) {
        let filters = [...this.state.filterArray];
        let filtered = filters.filter(filter => filter.prop === property);

        if (typeof filtered !== "undefined"
            && filtered != null
            && filtered.length != null
            && filtered.length === 0) {

            filters.push({
                prop: property,
                values: array
            });
        } else {
            let index = filters.findIndex(filter => filter.prop === property);
            Object.assign(filters[index], {values: array});
        }

        this.setState({
            filterArray: filters
        }, () => {
            this.setState({
                matchFilter: this.matchFilter()
            });
        });
    }

    matchFilter() {
        let filtered = [...this.state.drivers];
        let x = filtered.map(filter => filter._id);
        this.state.filterArray.forEach(filter => {
            filter.values.forEach(value => {
                filtered = filtered.filter(driver => {
                    return driver[filter.prop] === value;
                });

                x = filtered.map(filter => filter._id);
            })
        });

        console.log(JSON.stringify(x));
        return x;
    }

    render() {
        if (this.state.drivers.length === 0) {
            return (
                <div>
                    Loading...
                </div>
            )
        }

        return (
            <div className="App">
                <DriverFilter filterChange={this.filterChange} className="DriverFilter"
                              labelValue="Screen Size"
                              drivers={this.state.drivers}
                              inputId={"screen-size"} driverProperty={"screen"}/>
                <DriverFilter filterChange={this.filterChange} className="DriverFilter"
                              labelValue="Digital Input"
                              drivers={this.state.drivers}
                              inputId={"digital-input"} driverProperty={"DI"}/>
                <DriverFilter filterChange={this.filterChange} className="DriverFilter"
                              labelValue="Digital Output"
                              drivers={this.state.drivers}
                              inputId={"digital-output"} driverProperty={"DO"}/>
                <DriverFilter filterChange={this.filterChange} className="DriverFilter"
                              labelValue="Analog Input"
                              drivers={this.state.drivers}
                              inputId={"analog-input"} driverProperty={"AI"}/>
                <DriverFilter filterChange={this.filterChange} className="DriverFilter"
                              labelValue="Analog Output"
                              drivers={this.state.drivers}
                              inputId={"analog-output"} driverProperty={"AO"}/>
                <DriverFilter filterChange={this.filterChange} className="DriverFilter"
                              labelValue="IP" drivers={this.state.drivers}
                              inputId={"ip"}
                              driverProperty={"IP"}/>
                <DriverFilter filterChange={this.filterChange} className="DriverFilter"
                              labelValue="Price"
                              drivers={this.state.drivers}
                              inputId={"price"} driverProperty={"price"}/>
            </div>
        );
    }
}

export default App;
