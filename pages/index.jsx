import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card,Button } from 'semantic-ui-react';
import Layout, { layout } from '../components/layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    rederCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                <Link route = {`/campaigns/${address}`}>
                <a>View Campaign</a>
                </Link>
            ),
                fluid: true
            }
        });

        return <Card.Group items={items}/>
    }
    render() {
        return(
            <div>
            <Layout>
            <h2>Open Campaigns</h2>
            <Link route="/campaigns/new">
            <a>
            <Button
            floated="right"
            content = "Creat Campaign"
            icon= "add circle"
            primary={ true }
            />
            </a>
            </Link>
            {this.rederCampaigns()}
            </Layout>
            </div>
        );    
    }
}

export default CampaignIndex;
