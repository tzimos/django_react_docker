/**
 * @file frontend.src.shared.components.Loader.js
 * @author Panagiotis Tzimos.
 *
 * The Loader component.
 */

import React, {Component} from 'react';

import '../styles/loader.scss';


class Loader extends Component {

    render = () => {
        return (
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}


export default Loader;
