import React from 'react';
import OrganizationItem from './OrganizationItem'
import RepositoryCard from './RepositoryCard'
import axios from '../services/api'
import debounce from 'debounce'
import { Organization } from '../models/Organization.model'
import { Repository } from '../models/Repository.model'

type RepositoriesListState = {
  orgs: Organization[]
  repos: Repository[]
  searchValue: string
  selectedOrg: string
  orgsVisible: boolean
  reposLoading: boolean
}

class RepositoriesList extends React.Component<{}, RepositoriesListState> {

  constructor(props: any) {
    super(props)

    this.state = {
      orgs: [],
      repos: [],
      searchValue: '',
      selectedOrg: '',
      orgsVisible: false,
      reposLoading: false
    }
  }

  inputHandler = async (event: React.ChangeEvent<HTMLInputElement>) =>  {
    this.setState({searchValue: event.target.value})
    await this.getOrganizations()
  }

  selectOrganization = async (login: string) => {
    this.setState({selectedOrg: login, orgsVisible: false})
    await this.getRepos(login)
  }

  getRepos = async (login: string) => {
    if(login.length) {
      this.setState({reposLoading: true})
      const result = await axios.get(`/orgs/${login}/repos`)
      this.setState({repos: result.data, reposLoading: false})
    }
  } 

  getOrganizations = async () => {
    if(this.state.searchValue.length) {
      const result = await axios.get(`/search/users?q=${this.state.searchValue}+type:org`)
      if(result.data.items.length) {
        this.setState({
          orgs: result.data.items,
          orgsVisible: true
        })
      }
    }
  }

  async componentDidMount() {
    this.getOrganizations = debounce(this.getOrganizations, 500)
  }

  render() {
    return (
      <div className="col s12">
        <div className="organisation-filter">
          <label htmlFor="search-orgs">Поиск по организациям</label>
          <input 
            type="text"
            placeholder="Начните вводить название организации"
            onChange={this.inputHandler}
            className="validate"
            id="search-orgs"
          />
        </div>
        {this.state.orgsVisible ?
          <ul className="orgs-list">
            {this.state.orgs.map(org => {
              return (
                <OrganizationItem 
                  organization={org}
                  key={org.id}
                  selectOrganization={this.selectOrganization}
                />
              )
            })}
          </ul> 
        :
          <React.Fragment>
            {!this.state.reposLoading && <h1>{this.state.selectedOrg}</h1>}
            {this.state.reposLoading ? 
              <div className="spinner-wrapper">
                <div className="spinner"></div>
              </div>
            :
              this.state.repos.map(repo => {
                return <RepositoryCard 
                  repository={repo}
                  key={repo.id}
                />
              })}
          </React.Fragment>
        }
      </div>
    )
  }
}

export default RepositoriesList