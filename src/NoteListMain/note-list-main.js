import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Note from '../Note/note';
import CircleButton from '../Circle-button/circle-button';
import notefulContext from '../noteful-context';
import {getNotesForFolder} from '../helper';
import './note-list-main.css';

export default class NoteListMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = notefulContext;

    render () {
        const {folder_id} = this.props.match.params;
        const {notes=[]} = this.context;
        const notesForFolder = getNotesForFolder(notes, folder_id);
    
        return (
            <section className="NoteListMain">
                <ul>
                    {notesForFolder.map(note => 
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                name={note.name}
                                modified={note.modified}/>
                        </li>
                    )}
                </ul>

                <div className="NoteListMain__button-container">
                    <CircleButton
                        tag={Link}
                        to='/add-note'
                        type='button'
                        className='NoteListMain__add-note-button'>
                    
    
                        <br />
                        Note
                    </CircleButton>
                </div>

            </section>
        );
    }
}