import React, { Component } from "react";
import Layout from "../../../components/layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campagin from "../../../ethereum/campaign"
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component{
    static async getInitialProps(props){
        const { address } = props.query;
        const campaign = Campagin(address);
        const requestCount = await campaign.methods.getRequestCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
          Array(requestCount).fill().map((element, index) => {
            return campaign.methods.requests(index).call()
          })    
        );
        Array(parseInt(requestCount))
        
        return {
            address,
            requests,
            requestCount: requestCount.toString(),
            approversCount: approversCount.toString()
        };
    }

    renderRow(){
        return this.props.requests.map((request, index) => {
            return <RequestRow 
            key = {index}
            id = {index}
            request = { request } 
            address = { this.props.address }
            approversCount = {this.props.approversCount}
            />;
        });
    }

    render(){

        const{ Header, Row, HeaderCell, Body } = Table;
        return(
            <Layout>
                <h3>Request</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                <a>
                    <Button primary>
                        Add Request
                    </Button>
                </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{ this.renderRow() }</Body>
                </Table>
            </Layout>
        )
    }
}

export default RequestIndex;