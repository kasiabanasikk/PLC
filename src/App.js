import React, {Component} from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TabContainer from "./components/TabContainer";
import FilterContainer from "./components/FilterContainer";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                    <TabContainer/>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
