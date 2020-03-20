import React from 'react';
import * as Ons from 'react-onsenui';

type MenuProps = {
    navigator: Ons.Navigator
    title?: string
    onMenuClick: Function
}

type MenuState = {
    
}

export class Menu extends React.Component<MenuProps, MenuState> {

  constructor(props: MenuProps) {
    super(props);

    this.state = {
        menuEnabled: true
    }

  }

  componentDidMount() {
    
  }

  render() {
    return (
        <Ons.Splitter>
        <Ons.SplitterSide side='right' width={220} collapse={true} swipeable={true} isOpen={true} onClose={() => {}} onOpen={() => {}}>
          <Ons.Page>
            <Ons.List>
              <Ons.ListItem key={""} onClick={() => {}} tappable>Home</Ons.ListItem>
              {/* <Ons.ListItem key={Cards.name} onClick={this.loadPage.bind(this, Cards)} tappable>Cards</Ons.ListItem>
              <Ons.ListItem key={Settings.name} onClick={this.loadPage.bind(this, Settings)} tappable>Settings</Ons.ListItem> */}
            </Ons.List>
          </Ons.Page>
        </Ons.SplitterSide>
      </Ons.Splitter>
    )
  }
}