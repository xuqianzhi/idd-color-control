import React, { Component, version } from 'react';

export default class Display extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayingColor: false,
            colorRGB: "ff0000",
            isFlashing: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.timeoutIDs = [];
    }

    setColor(colorRGB) {
        this.setState({ colorRGB: colorRGB })
    }

    toggleDisplayColor() {
        if (!this.isHexColor(this.state.colorRGB)) {
            this.setState({ colorRGB: "Invalid RGB code" })
            return
        }
        const displayingColor = this.state.displayingColor;
        const isFlashing = this.state.isFlashing;
        const colorRGB = this.state.colorRGB;
        this.setState({ displayingColor: !displayingColor })
        if (!displayingColor) {
            // transition to color page
            if (isFlashing) {
                // flash 20 times
                for (let i = 0; i < 41; i++) {
                    const id = setTimeout(() => {
                        if (i % 2 == 0) {
                            this.setState({ colorRGB: colorRGB })
                        } else {
                            this.setState({ colorRGB: "000000" })
                        }
                    }, i * 1000);
                    this.timeoutIDs.push(id);
                }
            }
        } else {
            // transition to control page
            this.timeoutIDs.forEach(id => {
                clearTimeout(id)
            })
        }
    }

    toggleFlash() {
        const isFlashing = this.state.isFlashing;
        this.setState({ isFlashing: !isFlashing })
    }

    handleInputChange(event) {
        this.setState({ colorRGB: event.target.value });
    }

    isHexColor(hex) {
        return typeof hex === 'string'
            && hex.length === 6
            && !isNaN(Number('0x' + hex))
    }

    render() {
        const displayingColor = this.state.displayingColor
        const colorRGB = this.state.colorRGB
        const screenWidth = "100vw";
        const screenHeight = "100vh";
        return (
            <div>
                <div id="control" style={displayingColor ? { display: 'none' } : { display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ margin: '20px', width: '300px', height: '50px' }}>
                            Display Color: {this.state.colorRGB}
                        </div>
                        <div style={{ margin: '20px', width: '300px', height: '50px' }}>
                            Will Flash: {this.state.isFlashing ? "Yes" : "No"}
                        </div>
                        <input onChange={this.handleInputChange} type='text' placeholder='Enter RGB' style={{ width: '300px', height: '50px' }}></input>
                        <button onClick={() => this.setColor("ff0000")} style={{ margin: '20px' }}>Red</button>
                        <button onClick={() => this.setColor("FFA500")} style={{ margin: '20px' }}>Orange</button>
                        <button onClick={() => this.setColor("00FF00")} style={{ margin: '20px' }}>Green</button>
                        <button onClick={() => this.setColor("FFFF00")} style={{ margin: '20px' }}>Yellow</button>
                        <button onClick={() => this.setColor("0000FF")} style={{ margin: '20px' }}>Blue</button>
                        <button onClick={() => this.toggleFlash()} style={{ margin: '20px', width: '300px', height: '50px' }}>Toggle Flash</button>
                        <button onClick={() => this.toggleDisplayColor()} style={{ margin: '20px', width: '300px', height: '50px', color: 'green' }}>Display!</button>
                    </div>
                </div>
                <div id="color" style={displayingColor ? {
                    display: 'inline-block', width: screenWidth,
                    height: screenHeight, position: 'absolute', top: '0px', left: '0px'
                } : { display: 'none' }}>
                    <button style={{ position: 'absolute', width: '100%', height: screenWidth, left: '0px', top: '0px', backgroundColor: `#${colorRGB}` }}
                        onClick={() => this.toggleDisplayColor()}>
                    </button>
                </div>
            </div>
        )
    }
}