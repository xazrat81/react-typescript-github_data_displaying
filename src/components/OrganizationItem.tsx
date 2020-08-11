import React from 'react';
import { Organization } from '../models/Organization.model'

type OrganizationItemProps = {
  organization: Organization,
  selectOrganization: (login: string) => void
}

class OrganizationItem extends React.Component<OrganizationItemProps> {

  handleClick = () => {
    this.props.selectOrganization(this.props.organization.login)
  }

  render() {
    return (
      <li onClick={this.handleClick}>
        {this.props.organization.login}
      </li>
    )
  }
}

export default OrganizationItem