import React from 'react';
import * as Ons from 'react-onsenui';

type ToolbarProps = {
    navigator: Ons.Navigator
    title?: string
    onMenuClick?(): void
    menuIcon?: string
}

type ToolbarState = {
    menuEnabled: boolean
}

export class Toolbar extends React.Component<ToolbarProps, ToolbarState> {

  constructor(props: ToolbarProps) {
    super(props);

    this.state = {
        menuEnabled: true
    }

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleMenuClick() {
    this.props.onMenuClick && this.props.onMenuClick();
  }

  handleBackClick() {
    this.props.navigator?.popPage();
  }

  render() {
    return (
        <Ons.Toolbar>
            <div className="left">
                {this.props.navigator.pages.length > 1 &&
                <Ons.BackButton onClick={this.handleBackClick}>
                    Back
                </Ons.BackButton>
                }
            </div>
            <div className="center">
                {this.props.title ? this.props.title : <img src="logo.png" alt="logo" style={{height: "50%", verticalAlign: "middle"}}/>}
            </div>
            <div className="right">
                {this.props.onMenuClick && 
                <Ons.ToolbarButton onClick={this.handleMenuClick}>
                    <Ons.Icon icon={this.props.menuIcon || "md-menu"} />
                </Ons.ToolbarButton>}
            </div>
        </Ons.Toolbar> 
    )
  }
}