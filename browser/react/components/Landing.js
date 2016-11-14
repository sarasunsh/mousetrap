import React, { Component } from 'react';

import { Image, Well } from 'react-bootstrap';


export default function Landing() {
    return (
        <div>

            <Well>
                <h3> Welcome to MouseTrap! </h3>
                <h4> Easy-to-use mouse colony management software, made for scientists by scientists</h4>
                <Image src="http://images.mentalfloss.com/sites/default/files/styles/article_640x430/public/pinky_primary.jpg" />
            </Well>
        </div>
    )
}



