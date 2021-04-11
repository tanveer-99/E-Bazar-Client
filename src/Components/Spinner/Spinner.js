import React from 'react';
import './Spinner.css'

const Spinner = () => {
    return (
        <div>
            <div class="spinner">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Spinner;