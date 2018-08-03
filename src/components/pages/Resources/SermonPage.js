/* eslint-disable */
import React, { Component } from 'react';
import _ from 'lodash';
import AudioPlayer from 'react-responsive-audio-player';
import {decode} from 'he'

import {getFromDrupalAPI, searchDrupalSermons} from '../../../utils/fetchJSON';

import '../../../assets/css/audioplayer.css'

class Cornerpost extends Component {
  constructor(props){
    super(props);
    this.state = {sermon: null,
                  sermonID: this.props.match.params.nid}
  }

  componentWillMount(){
    var that = this;
    getFromDrupalAPI('all_sermons_api?filters[nid]=' + this.state.sermonID, function(data){
      that.setState({sermon: data})
    });
  }


  render() {
    if(this.state.sermon)
    {
      var sermonDetails = _.map(this.state.sermon, (sermon) => {
        return(
          <section>
          <div className="content">
            <div className="field field-name-field-date-preached field-type-datetime field-label-above">
            <div className="field-label">Date Preached:&nbsp;</div><div className="field-items">
            <div className="field-item even">
              <span className="date-display-single">{sermon.datepreached}</span>
            </div>
            </div>
            </div>
            <div className="field field-name-field-preacher field-type-text field-label-above">
              <div className="field-label">Preacher:&nbsp;</div>
              <div className="field-items">
                <div className="field-item even">Dave Lynch</div>
              </div>
            </div>
            <div className="field field-name-field-sermon field-type-file field-label-above">
              <div className="field-label">Sermon:&nbsp;</div>
              <div className="field-items">
              <div className="field-item even">

              <AudioPlayer playlist={[{url: sermon.url, displayText: decode(sermon.node_title)}]} controls={['playpause', 'spacer', 'progress']} />

              <div className="mediaelement-download-link"><a href={sermon.url}>Download</a></div>
            </div>
            </div>
            </div>
          </div>

            <div className="field field-name-field-sermon-series field-type-node-reference field-label-above">
              <div className="field-label">Sermon Series:&nbsp;</div>
              <div className="field-items">
                <div className="field-item even">{decode(sermon.sermonseries)}</div>
                </div>
              </div>
              <div className="field field-name-field-bible-book-s- field-type-taxonomy-term-reference field-label-above">
            <div className="field-label">Bible Passage(s):&nbsp;</div>
            <div className="field-items">
              <div className="field-item even">{decode(sermon.text)}</div>
            </div></div>
            </section>

        )
      });
    }
    else{
      var sermonDetails = <div className="content">Loading, please wait.</div>
    }

    return (
      <section>
        <div id="top-content-region" className="top-content padding-top-15 padding-bottom-15 block-15 bg-color-grayLight1">
          <div className="container">
            <div className="row">
              <div id="top-content-left-region" className="top-content-left col-xs-12 col-md-6 text-center-sm">
                <div id="page-title-block" className="page-title block">
                  <h1>Cornerpost</h1>
                </div>
              </div>

              <div id="top-content-right-region" className="top-content-right col-xs-12 col-md-6 text-right text-center-sm">
                <div id="page-breadcrumbs-block" className="page-breadcrumbs block">
                  <div className="breadcrumbs">
                    <a href="/">Home</a>
                    <span className="delimiter">›</span>
                    <span title="" className="nolink">Resources</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="content-region">
    <div className="container">
      <div className="row">

        {/* If the Sidebar First has content then it will be rendered */}


        {/* /Sidebar First region */}

        {/* Rendering of the main content */}

        <div id="main-content-region" className="main-content col-xs-12">

          {/* Rendering the tabs to view and edit nodes */}
                      <div id="admin-tabs" className="text-center">
                          </div> {/* /admin-tabs */}

          {/* Output the messages */}

          {/* Rendering the content */}
            <div className="region region-content">

<div id="block-system-main" className="block block-system">


  <div className="content">
    <div className="node node-audio node-promoted clearfix">




    {sermonDetails}





    </div>



  </div>
</div>  </div>

          {/* Printing the feed icons */}

        </div> {/* /main-content-region */}

        {/* /main content */}

        {/* If the Sidebar Second has content then it will be rendered */}


        {/* /Sidebar Second region */}

      </div> {/* /row */}
    </div> {/* /container */}
  </div>
      </section>
    );
  }
}

export default Cornerpost;