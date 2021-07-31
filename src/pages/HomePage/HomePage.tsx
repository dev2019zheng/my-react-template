import React from 'react';
import styles from './index.module.scss';
import cs from 'classnames'
import { ThemeContext } from '../../context';
import UserPage from '../UserPage/UserPage';

class HomePage extends React.PureComponent {
  static contextType = ThemeContext;

  render() {
    const { themeColor } = this.context
    return (
      <div className={cs(styles.homePage, themeColor)}>
        <h3>this is home page.</h3>
        <UserPage />
      </div>
    );
  }
}

export default HomePage;