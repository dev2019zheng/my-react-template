import * as React from 'react';
import { ThemeColorClass } from '../../constant';
import { ThemeProvider, ThemeColor } from '../../context';
import HomePage from '../HomePage/HomePage';
export interface IContextPageProps {
}

export interface IContextPageState {
  theme: ThemeColor
}

export default class ContextPage extends React.Component<IContextPageProps, IContextPageState> {

  interval: undefined | NodeJS.Timer

  constructor(props: IContextPageProps) {
    super(props);

    this.state = {
      theme: {
        themeColor: ThemeColorClass.green
      }
    }
  }

  componentDidMount() {
    this.randomTheme();
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  randomTheme() {
    const classes = Object.values(ThemeColorClass);
    this.interval = setInterval(() => {
      const index = (~~(Math.random() * 999)) % 3;
      this.updateThemeColor(classes[index]);
    }, 3000)
  }

  updateThemeColor(ThemeColor: ThemeColorClass) {
    this.setState({
      theme: {
        themeColor: ThemeColor
      }
    })
  }

  public render() {
    const { theme } = this.state
    return (
      <div>
        <h3>ContextPage</h3>
        <ThemeProvider value={theme}>
          <HomePage />
        </ThemeProvider>
      </div>
    );
  }
}
