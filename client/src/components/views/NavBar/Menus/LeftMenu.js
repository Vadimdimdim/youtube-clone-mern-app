import React from 'react';
import {Menu} from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="subscription">
        <a href="/subscription">Subscription</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu;