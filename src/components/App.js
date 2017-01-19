import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import DebounceInput from 'react-debounce-input';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

import urls from '../constants/urls';
import GifSwatch from './GifSwatch';
import GifDropzone, { updateZone } from './GifDropzone';
import mockResponse from '../constants/mockResponse';

import '../styles/App.scss';

@DragDropContext(HTML5Backend)

export class App extends Component {
  constructor(props) {
    super(props);
    // set a default state
    this.state = {
      data: [],
      activeGIF: {},
      dropZones: [{}, {}, {}, {}]
    };

    // bind to App so we can set data in state
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    let hash = window.location.hash.replace('#', '');
    const hashArr = hash.split(',');

    console.log(hashArr);
  }

  // renders all swatches, Giphy API default returns 25
  renderSwatch(r) {
    const props = {
      key: r.id,
      id: r.id,
      // we only care about the small versions
      thumbStill: r.images.fixed_height_small_still.url,
      thumb: r.images.fixed_height_small.url
    };

    return (<GifSwatch {...props} />);
  }

  // renders 4 zones
  renderZone(item, i) {
    const props = {
      key: i,
      id: i,
      gif: this.state.dropZones[i],
      onUpdate: this.updateZone.bind(this)
    }

    return (<GifDropzone {...props} />);
  }

  // ran when user drops a gif onto a zone
  updateZone(zoneId, gifId) {
    const data = this.state.data;
    let tempZones = this.state.dropZones.slice();

    // get gif downsized version (loads faster)
    for (let i = 0; i < data.length; i++) {
      let downsized = data[i].images.downsized_large;

      if (data[i].id === gifId) {
        tempZones[zoneId].id = data[i].id;
        tempZones[zoneId].downsized = downsized.url;
        tempZones[zoneId].width = downsized.width;
        tempZones[zoneId].height = downsized.height;
        break;
      }
    }

    console.log(tempZones);
    let hashtag = '';

    for (let ii = 0; ii < tempZones.length; ii++) {
      if (tempZones[ii].id) {
        hashtag += tempZones[ii].id + ',';
      }
    }

    window.location.hash = hashtag;

    this.setState({
      dropZones: tempZones
    })
  }

  // will run 300ms after last user keyup, after at least 2 chars typed
  handleSearch(e) {
    // get input value, clean it up, build search URL
    const input = e.target.value,
          val = input.trim().toLowerCase().split(' ').join('+'),
          url = 'http://api.giphy.com/v1/gifs/search?q=' + val + '&api_key=dc6zaTOxFJmzC';

    // set data in state with results
    return $.getJSON(url)
      .then((result) => {
        this.setState({data: result.data})
      });
  }

  render() {
    let logoUrl = require('../../static/images/logo.svg');

    // render swatches only if we have data
    let resultSwatches = 'Results will display here';
    if (this.state.data.length > 0) {
      resultSwatches = this.state.data.map(::this.renderSwatch);
    }
    // render dropZones
    let dropZones = this.state.dropZones.map(::this.renderZone);

    return (
      <div>
        <header className="header container">
          <div className="col-xs-12">
            <h1 className="header--logo">
              <a className="header--logo-link" href="/">
                <span>Giphy API</span>
              </a>
            </h1>
            <div className="header--links">
              {<a className="header--link" href={urls.haroldHomepage} target="_blank">Github</a>}
            </div>
          </div>
        </header>
        <div className="main container">
          <div className="row">
            <aside className="sidebar col-xs-4">
              <div className="sidebar--search col-xs-12">
                <DebounceInput
                  minLength={2}
                  debounceTimeout={300}
                  onChange={this.handleSearch}
                  className="form-control"
                  placeholder="Search GIFs on GIPHY"/>
              </div>
              <div className="sidebar--results col-xs-12">
                { resultSwatches }
              </div>
            </aside>
            <main className="dropzones col-xs-8">
              { dropZones }
            </main>
          </div>
        </div>
      </div>
    );
  }
}
