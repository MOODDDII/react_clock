import { Component } from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

interface ClockProps {
  name: string;
}

interface ClockState {
  time: string;
}

class Clock extends Component<ClockProps, ClockState> {
  timerId: number | undefined;

  constructor(props: ClockProps) {
    super(props);
    this.state = {
      time: new Date().toUTCString().slice(-12, -4),
    };
  }

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      this.setState({
        time: new Date().toUTCString().slice(-12, -4),
      });
      console.log(this.state.time);
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  render() {
    const { name } = this.props;
    const { time } = this.state;

    return (
      <div className="Clock">
        <strong className="Clock__name">{name}</strong>
        {' time is '}
        <span className="Clock__time">{time}</span>
      </div>
    );
  }
}

interface AppState {
  clockName: string;
  hasClock: boolean;
}

class App extends Component<{}, AppState> {
  nameTimerId: number | undefined;

  constructor(props: {}) {
    super(props);
    this.state = {
      clockName: 'Clock-0',
      hasClock: true,
    };
  }

  componentDidMount() {
    this.nameTimerId = window.setInterval(() => {
      const oldClockName = this.state.clockName;
      const newClockName = getRandomName();

      console.warn(
        `Changing clock name from ${oldClockName} to ${newClockName}`,
      );
      this.setState({ clockName: newClockName });
    }, 3300);

    document.addEventListener('contextmenu', this.handleRightClick);
    document.addEventListener('click', this.handleLeftClick);
  }

  componentWillUnmount() {
    if (this.nameTimerId) {
      clearInterval(this.nameTimerId);
    }

    document.removeEventListener('contextmenu', this.handleRightClick);
    document.removeEventListener('click', this.handleLeftClick);
  }

  handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  handleLeftClick = () => {
    this.setState({ hasClock: true });
  };

  render() {
    const { clockName, hasClock } = this.state;

    return (
      <div className="App">
        <h1>React Clock</h1>
        {hasClock && <Clock name={clockName} />}
      </div>
    );
  }
}

export default App;
