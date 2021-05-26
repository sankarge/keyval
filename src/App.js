import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from "react";
import {Col, Container, Row} from 'reactstrap';
import { Button } from 'reactstrap';

class App extends Component {

	render() {
		return (
			<div>
				<Container fluid>
					<Row>
						<Col md='2'>
							Hello World!
						</Col>
					</Row>
				</Container>
        <Button color="danger">Danger!</Button>
			</div>
		)
	}
}

export default App;