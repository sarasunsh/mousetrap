import React, { Component } from 'react';

import { Image, Well, Col } from 'react-bootstrap';


export default function Landing() {
    return (
        <div>
            <Col xs={10} xsPull={3} xsPush={1}>
                <Well>
                    <h3> Welcome to MouseTrap! </h3>
                    <h4> Easy-to-use mouse colony management software, made for scientists by scientists</h4>
                    <Image src="http://images.mentalfloss.com/sites/default/files/styles/article_640x430/public/pinky_primary.jpg" />
                </Well>
            </Col>
        </div>
    )
}



