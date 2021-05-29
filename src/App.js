import 'bootstrap/dist/css/bootstrap.min.css';
import S3 from 'aws-sdk/clients/s3';

import React, {Component} from "react";
import {Card, CardBody, CardColumns, CardText, Col, Container, Input, InputGroup, Row, Table} from 'reactstrap';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {keyval: ''};
        this.downloadFileFromS3();
        this.onInputUpdate = this.onInputUpdate.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    downloadFileFromS3() {
        var s3 = new S3({
            region: 'ap-south-1',
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
        });
        var params = {
            Bucket: "keyval",
            Key: "keyval.json"
        };
        s3.getObject(params)
            .promise()
            .then((result) => {
                    var keyval = JSON.parse(result.Body.toString('utf-8'));
                    this.setState({'keyval': keyval});
                }
            );
    }

    onInputUpdate(e) {
        this.setFilter(e.target.value);
    }

    setFilter(value) {
        this.setState({'search': value});
    }

    render() {
        var cards = [];
        for (let item of this.state.keyval) {
            if (this.state.search === '' || this.state.search === undefined) {
                cards.push(<CardBuilder item={item}/>);
            } else {
                for (let row of Object.keys(item)) {
                    if (row.includes(this.state.search) || item[row].includes(this.state.search)) {
                        cards.push(<CardBuilder item={item}/>);
                        break;
                    }
                }
            }
        }
        return (
            <span>
				<div>
					<Table responsive>
						<tbody>
						<tr>
							<td>
								<InputGroup>
									<Input placeholder="search by anything!" onChange={this.onInputUpdate}>
									</Input>
								</InputGroup>
							</td>
						</tr>
						</tbody>
					</Table>
				</div>
				<div>
					<Container fluid>
						<Row>
							<Col>
								<div align='middle'>
									<CardColumns>
										{cards}
									</CardColumns>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</span>
        )
    }
}

class CardBuilder extends React.Component {
    render() {
        const rows = [];
        var item = this.props.item;
        for (let row of Object.keys(item)) {
            rows.push(<RowBuilder key1={row} value={item[row]}/>)
        }
        return (
            <Card>
                <CardBody>
                    <Container fluid>
                        {rows}
                    </Container>
                </CardBody>
            </Card>
        )
    }
}

class RowBuilder extends React.Component {

    render() {
        return (
            <Row>
                <Col>
                    <CardText><b>{this.props.key1}</b></CardText>
                </Col>
                <Col>
                    <CardText>{this.props.value}️</CardText>
                </Col>
            </Row>
        )
    }
}

export default App;