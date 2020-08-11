import React from 'react';
import { Repository } from '../models/Repository.model'

type RepositoryCardProps = {
  repository: Repository
}

class RepositoryCard extends React.Component<RepositoryCardProps> {
  render() {
    return (
      <div className="card">
        <div className="card-content github-content">
          <span className="card-title">
            {this.props.repository.name}
          </span>
          <div className="github-counters">
            <div className="counter" title="Star">
              <i className="material-icons">star</i>
              <span>{this.props.repository.stargazers_count}</span>
            </div>
            <div className="counter" title="Watch">
              <i className="material-icons">visibility</i>
              <span>{this.props.repository.watchers_count}</span>
            </div>
            <div className="counter" title="Fork">
              <i className="material-icons">device_hub</i>
              <span>{this.props.repository.forks_count}</span>
            </div>
          </div>
        </div>
        <div className="card-action">
          <a href={this.props.repository.html_url}>{this.props.repository.html_url}</a>
        </div>
      </div>
    )
  }
}

export default RepositoryCard