import React from 'react';

export default class Coffee extends React.Component {
    render() {
        const border = this.props.attribute1 === 'Skinny' ? '2px solid #c09a7f' : '7px solid #c09a7f';

        const coffeeBgColor = this.props.name === 'Flat White' ? '#d9c2b2' : '#6f4e37';
        const coffeeTextColor = this.props.name === 'Flat White' ? '#6f4e37' : '#d9c2b2';
        const padding = this.props.name === 'Flat White' ? '2px' : '6px';

        const attribute1Style = {
            borderTop: border,
            borderBottom: border,
            paddingLeft: '10px',
            paddingRight: '10px',
            display: this.props.attribute1 ? 'flex' : 'none',
            color: '#6f4e37'
        }

        const coffeeStyle = {
            backgroundColor: coffeeBgColor,
            color: coffeeTextColor,
            padding: padding,
            paddingLeft: '10px',
            paddingRight: '10px',
            display: 'flex',
            alignItems: 'center'
        }

        const extraHotStyle = {
            marginLeft: '10px',
            fontSize: '0.65em',
            padding: '5px',
            backgroundColor: '#ff392e',
            color: '#ffffff',
            display: this.props.attribute2 ? 'flex' : 'none',
            alignItems: 'center',
            lineHeight: '0.7',
        }

        const mainStyle = {
            display: 'flex'
        }
        return <div style={mainStyle}>
            <div style={attribute1Style}>{this.props.attribute1}</div> <div style={coffeeStyle} className="ml-2">{this.props.name}</div><div style={extraHotStyle}>{this.props.attribute2}</div>
        </div>
    }
}