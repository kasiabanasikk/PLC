import React, {Component} from 'react';
import './App.css';
import DriverFilter from "./components/DriverFilter";
import ApplicationBar from "./components/ApplicationBar";
import CriteriaRankingTable from "./components/CriteriaRankingTable";
import Button from "material-ui/es/Button/Button";
import ResultsTable from "./components/ResultsTable";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            drivers: [],
            matchFilter: [],
            filterArray: [],
            cache: [],
            rankedScoreMap: []
        };

        this.filterChange = this.filterChange.bind(this);
        App.runAlgorithm = App.runAlgorithm.bind(this);
        this.setCache = this.setCache.bind(this);
        this.startComputation = this.startComputation.bind(this);
    }

    static async fetchDrivers() {
        const response = await fetch('/driver');
        return await response.json();
    }

    static async runAlgorithm(criteriaRankingArray) {
        let bodyData = criteriaRankingArray.length === 0 ? "nothing" : JSON.stringify(criteriaRankingArray);
        let drivers = JSON.stringify(this.state.matchFilter);
        const response = await fetch('/run', {
            method: 'post',
            body: JSON.stringify({
                drivers: drivers,
                criteriaRankingArray: bodyData,
            }),
            headers: {
                'content-type': 'application/json'
            },

        });

        let responseObject = await response.json().then(responseObject => {
            this.setState({
                rankedScoreMap: responseObject.criteriaRankingArray.rankedScoreMap
            });
        });

        return await responseObject;
    }

    startComputation() {
        App.runAlgorithm(this.state.cache).then(() => {
        });
    }

    setCache(array) {
        this.setState({
            cache: array
        });
    }

    componentDidMount() {
        let that = this;
        App.fetchDrivers().then(response => {
            that.setState({
                drivers: response,
                matchFilter: response
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

        for (let i = 0; i < filters.length; i++) {
            if (filters[i].values.length === 0) {
                filters.splice(i, 1);
            }
        }

        this.setState({
            filterArray: filters
        }, () => {
            if (filters.length === 0) {
                this.setState({
                    matchFilter: this.state.drivers
                });

            } else {
                this.setState({
                    matchFilter: this.matchFilter()
                });
            }
        });
    }

    matchFilter() {
        let filteredDrivers = [...this.state.drivers];
        let drivers = [];
        this.state.filterArray.forEach(filter => {
            filter.values.forEach(() => {
                filteredDrivers = filteredDrivers.filter(driver => {
                    // / filter,prop can be "screen"
                    return filter.values.includes(driver[filter.prop]);
                });

                drivers = [...filteredDrivers];
            })
        });

        return drivers;
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
                <ApplicationBar title="PLC"/>
                <div className="FilterPane">
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
                <div>
                    <CriteriaRankingTable setCache={this.setCache}/>
                </div>
                <div>
                    <Button onClick={this.startComputation}>Run</Button>
                </div>
                <div>
                    <ResultsTable rankedScoreMap={this.state.rankedScoreMap}/>
                </div>

            </div>
        );
    }
}

export default App;
