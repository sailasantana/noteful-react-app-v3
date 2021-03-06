import React, {Component} from 'react';
import CircleButton from '../Circle-button/circle-button';
import notefulContext from '../noteful-context';
import {findNote, findFolder} from '../helper';
import './note-page-nav.css';
import PropTypes from 'prop-types';

export default class NotePageNav extends Component {
    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }

    static contextType= notefulContext;

    render () {
        const {notes, folders} = this.context;
        const {id} = this.props.match.params;
        const note = findNote(notes, id) || {};
        const folder = findFolder(folders, note.folderId);
        
        return (
            <div className="NotePageNav">
                
                <CircleButton
                    tag="button"
                    role="link"
                    onClick={() => this.props.history.goBack()}
                    className='NotePageNav__back-button'>
                    
                    <br/>
                    Back
                </CircleButton>

                {folder && (
                    <h3 className='NotePageNav__folder-name'>
                        Add
                    </h3>
                )} 
            </div>
        );
    }
}

NotePageNav.propTypes = 
{ match: PropTypes.object,
  history: PropTypes.object  }