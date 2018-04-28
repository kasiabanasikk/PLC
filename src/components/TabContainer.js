import React from 'react';
import {Tab, Tabs} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import DriverFilter from "./DriverFilter";

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
};

class TabContainer extends React.Component {

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    render() {
        return (
            <div>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="Screen" value={0}/>
                    <Tab label="Digital input" value={1}/>
                    <Tab label="Digital output" value={2}/>
                    <Tab label="Analog input" value={3}/>
                    <Tab label="Analog output" value={4}/>
                    <Tab label="Price" value={5}/>
                    <Tab label="IP" value={6}/>
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div>
                        <h2 style={styles.headline}>Price filter</h2>
                        <DriverFilter hint="screen"/>
                    </div>
                    <div style={styles.slide}>
                        slide n°2
                    </div>
                    <div style={styles.slide}>
                        slide n°3
                    </div>
                    <div style={styles.slide}>
                        slide n°4
                    </div>
                    <div style={styles.slide}>
                        slide n°5
                    </div>
                    <div style={styles.slide}>
                        slide n°6
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}

export default TabContainer;