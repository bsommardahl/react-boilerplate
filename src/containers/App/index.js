// @flow
import type { BuildInformation, SampleData, Actions } from './types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Logger } from '../../services/logger';
import Home from '../../components/Home';
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import * as appActions from './actions';

import styled from 'styled-components';

const AppDiv = styled.div`text-align: center;`;

type Props = {
  buildInformation: BuildInformation,
  sampleData: SampleData,
  actions: Actions
};

export class App extends Component<Props> {
  componentDidMount() {
    const logger = new Logger();
    logger.log('testing', 'Info');
    this.props.actions.getSampleData();
  }

  render() {
    return (
      <AppDiv>
        <AppHeader />
        <Route exact path="/" component={Home} />
        <div>
          <h1>
            <FormattedMessage {...messages.SagaSample} />
          </h1>
          {this.props.sampleData && this.props.sampleData.map((data) => <div key={data.id}>{data.name}</div>)}
        </div>
        <AppFooter
          deploymentEnvironment={this.props.buildInformation.deploymentEnvironment}
          frontEndBuildNumber={this.props.buildInformation.frontEndBuildNumber}
        />
      </AppDiv>
    );
  }
}

export const mapStateToProps = ({ app }: Object): Props => ({
  buildInformation: app.buildInformation,
  sampleData: app.sampleData,
  actions: app.actions
});

export function mapDispatchToProps(dispatch: any): Object {
  const actions = bindActionCreators({ ...appActions }, dispatch);
  return { actions };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
