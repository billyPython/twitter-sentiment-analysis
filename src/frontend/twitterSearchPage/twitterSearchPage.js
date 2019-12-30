import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import Storage from '../service/storage';

const twittsKey = 'twitts';
const apiRoot = 'http://localhost:3000';

const ListItem = ({ text, score }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      { text }
    <span className="badge badge-primary badge-pill">{ score } </span>
    </li>
  )
}

const Loader = () => {
  return (
    <div style={{ position: 'absolute', left: '50%', marginTop: '20px'}} className="spinner-border" role="status">
    <span className="sr-only">Loading...</span> 
    </div>
  );
};

const Average = ({ average }) => {
  return (<h3 style={{ marginTop: '20px' }}>Average: <span class="badge badge-primary">{ average }</span></h3>)
}

class TwitterSearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      twitts: [],
      average: null,
      term: '',
      isLoading: false,
    };

    this.getInitialData = this.getInitialData.bind(this);
    this.fetchTwitts = this.fetchTwitts.bind(this);
    this.debounceOnChangeInput = debounce((term) => { this.fetchTwitts(term) }, 1000);
    this.intervalId = null;
  }

  componentDidMount() {
    this.getInitialData();
    this.setIntervalFetch();
  }

  fetchTwitts(term) {
    this.setState({
      isLoading: true,
    }, () => {
      fetch(`${apiRoot}/twitter_sentiment?q=${term}`)
        .then(res => {
          this.setState({ isLoading: false });
          const data = res.json();
          return data;
        })
        .then(data => {
          this.setState({
            twitts: data.results.map(t => ({ text: t.tweet, score: t.sentimentScore })),
            average: data.sentimentAverage,
          });
        })
        .catch(() => {
          this.setState({ 
            isLoading: false
          })
        });
    });
  }

  getInitialData() {
    this.setState({
      twitts: Storage.get(twittsKey) || []
    });
  }

  setIntervalFetch() {
    this.clearInterval();
    this.intervalId = setInterval(() => {
      this.fetchTwitts(this.state.term);
    }, 30000);
  };

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onChangeInput(e) {
    e.persist();
    const term = e.target.value;
    this.setState({
      term,
    });
    this.debounceOnChangeInput(term);
  }
  
  render() {
    const { isLoading } = this.state;

    return (
    <div className="container">
       <div className='col-xs-4' style={{ marginTop: '30px'}}>
       <input 
        type="text"
        className="form-control"
        placeholder="Search twitts"
        onChange={e => { this.onChangeInput(e) }}
        >
        </input>
        </div>
      {
        isLoading && <Loader />
      }
      { !isLoading && <ul className='list-group' style={{ marginTop: '20px' }}>
        {
          this.state.twitts.map(({ text, score }, index) => {
            return (
              <ListItem key={index} text={text} score={score} /> 
            )
          })
        }
      </ul>
      }
    { !!this.state.twitts.length && !isLoading && <Average average={this.state.average} /> }
    </div>
  )
  }
}

export default TwitterSearchPage;
