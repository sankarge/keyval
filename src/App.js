import 'bootstrap/dist/css/bootstrap.min.css';
import S3 from 'aws-sdk/clients/s3';

import React, { Component } from "react";
import {Col, Container, Row} from 'reactstrap';
import { Button } from 'reactstrap';

class App extends Component {

	constructor(props) {
		super(props);		
		this.state = {};
		this.downloadFileFromS3();		
	}

	downloadFileFromS3(){
		var s3 = new S3({
			region: 'ap-south-1',
		 	accessKeyId: '',
		  	secretAccessKey : ''
		});
		var params = {
			Bucket: "keyval", 
			Key: "keyval.json"	
		   };
		s3
		.getObject(params)
		.promise()
		.then((result) => {			
				var keyval = JSON.parse(result.Body.toString('utf-8'));
				this.setState({'keyval': keyval });
			}
		);
	}

	render() {
		return (
			<div>
				<Container fluid>
					<Row>
						<Col md='2'>
						{JSON.stringify(this.state.keyval)}
						</Col>
					</Row>
				</Container>
        <Button color="danger">Danger!</Button>
			</div>
		)
	}
}

export default App;